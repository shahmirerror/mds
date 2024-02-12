<?php

namespace App\Http\Controllers\LabModules;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\BarcodeSetup;
use App\Models\Country;
use App\Models\PlaceOfIssue;
use App\Models\Profession;
use App\Models\Agency;
use App\Models\QueueManager;
use App\Models\Candidates;
use App\Models\Registrations;

use Inertia\Inertia;

use Auth;

class RegistrationsController extends Controller
{
    public function index()
    {
        $code = BarcodeSetup::where('centre_id',Auth::user()->centre->centre_id)->orderBy('id','DESC')->first();
        if($code)
        {
            $barcode = $code->barcode+1;
            BarcodeSetup::insert(array('centre_id' => Auth::user()->centre->centre_id, 'barcode' => $barcode));
        }
        else
        {
            $barcode = 100001;
            BarcodeSetup::insert(array('centre_id' => Auth::user()->centre->centre_id, 'barcode' => $barcode));
        }

        return Inertia::render('LabModules/Registration',
                                [
                                    'barcode' => $barcode,
                                    'countries' => Country::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get(),
                                    'agencies' => Agency::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get(),
                                    'places' => PlaceOfIssue::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get(),
                                    'professions' => Profession::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get()
                                ]
                            );
    }

    public function store(request $request)
    {
        $check = Candidates::where('passport_no',$request->passport_no)->first();
        if(!$check)
        {
            $new = new Candidates;
            $new->passport_no = $request->passport_no;
            $new->passport_issue_date = $request->passport_issue_date;
            $new->passport_expiry_date = $request->passport_expiry_date;
            $new->candidate_name = $request->candidate_name;
            $new->gender = $request->gender;
            $new->dob = $request->dob;
            $new->save();
            $candidate_id = $new->id;
            $created = $new->created_at;
        }
        else
        {
            $candidate_id = $check->id;
            $created = $check->created_at;
        }

        $new_reg = Registrations::where('center_id',Auth::user()->centre->centre_id)->orderBy('reg_id','DESC')->first();

        $new2 = new Registrations;
        $new2->reg_id = $new_reg->reg_id+1;
        $new2->candidate_id = $candidate_id;
        $new2->center_id = Auth::user()->centre->centre_id;
        $new2->agency = $request->agency['value'];
        $new2->country = $request->country['value'];
        $new2->profession = $request->profession['value'];
        $new2->cnic = $request->cnic;
        $new2->place_of_issue = $request->place_of_issue['value'];
        $new2->reg_date = $request->reg_date;
        $new2->barcode_no = $request->barcode;
        $new2->serial_no = $request->serial_no;
        $new2->relation_type = $request->relation_type;
        $new2->relative_name = $request->relative_name;
        $new2->ref_slip_issue_date = $request->ref_slip_issue_date;
        $new2->ref_slip_expiry_date = $request->ref_slip_expiry_date;
        $new2->phone_1 = $request->phone_1;
        $new2->phone_2 = $request->phone_2;
        $new2->nationality = $request->nationality;
        $new2->marital_status = $request->marital_status;
        $new2->biometric_fingerprint = $request->biometric_fingerprint;
        $new2->fee_charged = $request->fee;
        $new2->discount = $request->discount;
        $new2->remarks = $request->remarks;
        $new2->pregnancy_test = $request->pregnancy_test;
        $new2->finger_type = $request->finger_type;
        $new2->token_no = $request->token_no;
        $new2->save();
        // if($new2->save())
        // {

            if($request->hasFile('candidate_image'))
            {
                $image = $request->file('candidate_image');
                $imageName = strtotime($created).'.'.$image->getClientOriginalExtension();

                $image->move(storage_path('app/public/candidate_image'), $imageName);
            }

            if($request->hasFile('passport_image'))
            {
                $image = $request->file('passport_image');
                $imageName = strtotime($created).'.'.$image->getClientOriginalExtension();

                $image->move(storage_path('app/public/candidate_passport'), $imageName);
            }

            QueueManager::where('token_no',$request->token_no)
                        ->where('center_id',$request->centre_id)
                        ->where('process_id',1)
                        ->update(array('status' => 'Completed'));

            return redirect()->route('registration-desk.index');
            // return print_r($new2);

        // }
        // else
        // {
        //     return print_r($new2);
        // }

        // return $request->all();
    }

    public function show()
    {
        return Inertia::render('LabModules/RegistrationEdit');
    }
}
