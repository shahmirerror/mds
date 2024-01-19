<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Registrations;
use App\Models\XrayResult;

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
}
