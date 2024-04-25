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
use App\Models\LabModulePermissions;
use App\Models\User;

use Inertia\Inertia;

use Auth;

class RegistrationsController extends Controller
{
    public function index()
    {
        if(User::check_permission(1, 'index') == true)
        {
            $username = $_SERVER['REMOTE_ADDR'];
            // $token = QueueManager::where('center_id',Auth::user()->centre->centre_id)
            //                 ->where('process_id',1)
            //                 ->where('process_date',date('Y-m-d'))
            //                 ->where('status','In Process')
            //                 ->where('cancelled',NULL)
            //                 ->first();

            if(Auth::user()->role_id == 2)
            {
                $counters = LabModulePermissions::select('permission_value as counter_no')
                                                ->join('staff_lab_rights','staff_lab_rights.permission_id','lab_module_permissions.id')
                                                ->join('centre_users','centre_users.user_id','staff_lab_rights.user_id')
                                                ->where('lab_module_permissions.name','counter_no')
                                                ->where('centre_users.centre_id',Auth::user()->centre->centre_id)
                                                ->get();
            }
            elseif(Auth::user()->role_id == 3)
            {
                $counters = LabModulePermissions::select('permission_value as counter_no')
                                                ->join('staff_lab_rights','staff_lab_rights.permission_id','lab_module_permissions.id')
                                                ->where('lab_module_permissions.name','counter_no')
                                                ->where('staff_lab_rights.user_id',Auth::user()->id)
                                                ->first();
            }

            $queue = QueueManager::select("token_no","id")
                                            ->where("process_id",1)
                                            ->where("center_id",Auth::user()->centre->centre_id)
                                            ->where('status','Pending')
                                            ->where('cancelled',NULL)
                                            ->where('process_date',date('Y-m-d'))
                                            ->where('counter_id',NULL)
                                            ->orderBy('id', 'ASC')
                                            ->count();

            $token_no = 'None';

            $code = BarcodeSetup::where('centre_id',Auth::user()->centre->centre_id)->orderBy('id','DESC')->first();

            $prev = Registrations::where('reg_date',date('Y-m-d'))->where("center_id",Auth::user()->centre->centre_id)->orderBy('id','DESC')->first();

            $barcode = ($code) ? $code->barcode+1 : 100001;
            BarcodeSetup::insert(array('centre_id' => Auth::user()->centre->centre_id, 'barcode' => $barcode));

            return Inertia::render('LabModules/Registration',
                                    [
                                        'token_no' => $token_no,
                                        'in_queue' => $queue,
                                        'barcode' => $barcode,
                                        'username' => $username,
                                        'prevBarcode' => ($prev) ? $prev->barcode_no : NULL,
                                        'counters' => (Auth::user()->role_id == 2 && count($counters) > 0) ? $counters : NULL,
                                        'counter' => ($counters && Auth::user()->role_id == 3) ? $counters->counter_no : NULL,
                                        'countries' => Country::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get(),
                                        'agencies' => Agency::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get(),
                                        'places' => PlaceOfIssue::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get(),
                                        'professions' => Profession::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get()
                                    ]
                                );
        }
        else
        {
            return Inertia::render('Errors/403');
        }
    }

    public function store(request $request)
    {
        $all = json_decode($request->getContent());

        $check = Candidates::where('passport_no',$all->data->passport_no)->first();
        if(!$check)
        {
            $new = new Candidates;
            $new->passport_no = $all->data->passport_no;
            $new->passport_issue_date = $all->data->passport_issue_date;
            $new->passport_expiry_date = $all->data->passport_expiry_date;
            $new->candidate_name = $all->data->candidate_name;
            $new->gender = $all->data->gender;
            $new->dob = $all->data->dob;
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
        $new2->agency = $all->data->agency['value'];
        $new2->country = $all->data->country['value'];
        $new2->profession = $all->data->profession['value'];
        $new2->cnic = $all->data->cnic;
        $new2->place_of_issue = $all->data->place_of_issue['value'];
        $new2->reg_date = $all->data->reg_date;
        $new2->barcode_no = $all->data->barcode;
        $new2->serial_no = $all->data->serial_no;
        $new2->relation_type = $all->data->relation_type;
        $new2->relative_name = $all->data->relative_name;
        $new2->slip_issue_date = $all->data->ref_slip_issue_date;
        $new2->slip_expiry_date = $all->data->ref_slip_expiry_date;
        $new2->phone_1 = $all->data->phone_1;
        $new2->phone_2 = $all->data->phone_2;
        $new2->nationality = $all->data->nationality;
        $new2->marital_status = $all->data->marital_status;
        $new2->biometric_fingerprint = $all->data->biometric_fingerprint;
        $new2->fee_charged = $all->data->fees;
        $new2->discount = $all->data->discount;
        $new2->remarks = $all->data->remarks;
        $new2->pregnancy_test = $all->data->pregnancy_test;
        $new2->finger_type = $all->data->finger_type;
        $new2->token_no = $all->data->token_no;
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

            QueueManager::where('token_no',$all->data->token_no)
                        ->where('center_id',$all->data->centre_id)
                        ->where('process_id',1)
                        ->update(array('status' => 'Completed'));

            return response()->json(['message' => 'Registered'], 200);
    }

    public function show(request $request, $id)
    {
        if($id == 'edit')
        {
            if(User::check_permission(1, 'edit') == true)
            {
                return Inertia::render('LabModules/RegistrationEdit',
                                    ['countries' => Country::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get(),
                                    'agencies' => Agency::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get(),
                                    'places' => PlaceOfIssue::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get(),
                                    'professions' => Profession::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get()]);
            }
            else
            {
                return Inertia::render('Errors/403');
            }
        }
        elseif($id == 'repeat-case')
        {
            $queue = QueueManager::select("token_no","id")
                                        ->where("process_id",1)
                                        ->where("center_id",Auth::user()->centre->centre_id)
                                        ->where('status','Pending')
                                        ->where('cancelled',NULL)
                                        ->where('process_date',date('Y-m-d'))
                                        ->where('counter_id',NULL)
                                        ->orderBy('id', 'ASC')
                                        ->count();

            $code = BarcodeSetup::where('centre_id',Auth::user()->centre->centre_id)->orderBy('id','DESC')->first();

            $barcode = ($code) ? $code->barcode+1 : 100001;
            BarcodeSetup::insert(array('centre_id' => Auth::user()->centre->centre_id, 'barcode' => $barcode));

            return Inertia::render('LabModules/RegistrationRepeat',
                                ['token_no' => $request->token_no, 'in_queue' => $queue, 'barcode' => $barcode, 'countries' => Country::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get(),
                                'agencies' => Agency::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get(),
                                'places' => PlaceOfIssue::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get(),
                                'professions' => Profession::select('name as value','name as label')->where('centre_id',Auth::user()->centre->centre_id)->get()]);
        }

    }

    public function update(request $request)
    {
        $new = Candidates::find($request->candidate_id);
        $new->passport_no = $request->passport_no;
        $new->passport_issue_date = $request->passport_issue_date;
        $new->passport_expiry_date = $request->passport_expiry_date;
        $new->candidate_name = $request->candidate_name;
        $new->gender = $request->gender;
        $new->dob = $request->dob;
        $new->update();
        $created = $new->updated_at;

        $new2 = Registrations::where('reg_id',$request->regid)
                             ->where('candidate_id',$request->candidate_id)
                             ->update(
                                        array(
                                            'agency' => $request->agency['value'],
                                            'country' => $request->country['value'],
                                            'profession' => $request->profession['value'],
                                            'cnic' => $request->cnic,
                                            'place_of_issue' => $request->place_of_issue['value'],
                                            'reg_date' => $request->reg_date,
                                            'barcode_no' => $request->barcode,
                                            'serial_no' => $request->serial_no,
                                            'relation_type' => $request->relation_type,
                                            'relative_name' => $request->relative_name,
                                            'slip_issue_date' => $request->ref_slip_issue_date,
                                            'slip_expiry_date' => $request->ref_slip_expiry_date,
                                            'phone_1' => $request->phone_1,
                                            'phone_2' => $request->phone_2,
                                            'nationality' => $request->nationality,
                                            'marital_status' => $request->marital_status,
                                            'fee_charged' => $request->fee,
                                            'discount' => $request->discount,
                                            'remarks' => $request->remarks,
                                            'pregnancy_test' => $request->pregnancy_test,
                                            'finger_type' => $request->finger_type
                                        ));

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

        return redirect()->route('registration-desk.show');
    }
}
