<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Registrations;
use App\Models\XrayResult;
use App\Models\BarcodeSetup;
use App\Models\PassportVerification;
use App\Models\QueueManager;

class LabModulesController extends Controller
{
    public function fetch_xray_result(request $request)
    {
        $all = json_decode($request->getContent());

        $check = Registrations::where('serial_no',$all->serial_no)->where('reg_date',$all->reg_date)->where('center_id',$all->centre_id)->first();

        if($check)
        {
            $check2 = XrayResult::where('centre_id',$check->center_id)->where('reg_id',$check->reg_id)->first();

            if($check2)
            {
                return response()->json(['xray' => $check2], 200);
            }
            else
            {
                return response()->json(['xray' => []], 404);
            }
        }
        else
        {
            return response()->json(['xray' => []], 404);
        }
    }

    public function fetch_registration(request $request)
    {
        $all = json_decode($request->getContent());

        if($all->barcode != NULL && $all->barcode != '')
        {
            $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')->where('center_id',$all->centre_id)
                              ->where('barcode_no',$all->barcode)
                              ->first();
        }
        else
        {
            $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')->where('center_id',$all->centre_id)
                              ->where('serial_no',$all->serial_no)
                              ->where('reg_date',$all->reg_date)
                              ->first();
        }

        if($check)
        {
            $check2 = PassportVerification::where('centre_id',$all->centre_id)->where('reg_id',$check->reg_id)->first();

            if($check2)
            {
                return response()->json(['registration' => $check, 'verified' => true], 200);
            }
            else
            {
                return response()->json(['registration' => $check, 'verified' => false], 200);
            }
        }
        else
        {
            return response()->json(['registration' => []], 200);
        }
    }

    public function fetch_barcode(request $request)
    {
        $all = json_decode($request->getContent());

        $code = BarcodeSetup::where('centre_id',$all->centre_id)->orderBy('id','DESC')->first();
        if($code)
        {
            $barcode = $code->barcode+1;
            BarcodeSetup::insert(array('centre_id' => $all->centre_id, 'barcode' => $barcode));
        }
        else
        {
            $barcode = 100001;
            BarcodeSetup::insert(array('centre_id' => $all->centre_id, 'barcode' => $barcode));
        }

        return response()->json(['new_barcode' => $barcode], 200);
    }

    public function fetch_by_fingerprint(request $request)
    {
        $all = json_decode($request->getContent());

        $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                             ->where('center_id',$all->centre_id)
                             ->whereRaw("CAST(biometric_fingerprint AS CHAR) = ?", [$all->biometric_fingerprint])
                             ->first();
        if($check)
        {
            $check2 = PassportVerification::where('centre_id',$all->centre_id)->where('reg_id',$check->reg_id)->first();

            if($check2)
            {
                return response()->json(['registration' => $check, 'verified' => true], 200);
            }
            else
            {
                return response()->json(['registration' => $check, 'verified' => false], 200);
            }
        }
        else
        {
            return response()->json(['registration' => []], 200);
        }
    }

    public function verify_passport(request $request)
    {
        $all = json_decode($request->getContent());

        $check = PassportVerification::where('centre_id',$all->centre_id)->where('reg_id',$all->reg_id)->first();

        if(!$check)
        {

            $insert = new PassportVerification;
            $insert->centre_id = $all->centre_id;
            $insert->reg_id = $all->reg_id;
            $insert->notes = $all->notes;
            $insert->save();

            QueueManager::where('token_no',$all->token_no)
                            ->where('center_id',$all->centre_id)
                            ->where('process_id',3)
                            ->update(array('status' => 'Completed'));
        }

        return response()->json(['message' => 'Verified'], 200);
    }
}
