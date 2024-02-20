<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

use App\Models\Registrations;
use App\Models\XrayResult;
use App\Models\BarcodeSetup;
use App\Models\PassportVerification;
use App\Models\QueueManager;
use App\Models\Country;
use App\Models\PlaceOfIssue;
use App\Models\Profession;
use App\Models\Agency;
use App\Models\Candidates;
use App\Models\SampleCollection;
use App\Models\XraySlips;
use App\Models\XrayVerification;
use App\Models\LabResult;
use App\Models\LabSticker;
use App\Models\Medical;
use App\Models\Centres;
use App\Models\ReportIssue;

use Codedge\Fpdf\Fpdf\Fpdf;

use Milon\Barcode\DNS1D;

class LabModulesController extends Controller
{
    public function fetch_xray_result(request $request)
    {
        $all = json_decode($request->getContent());

        $check = XrayResult::select('reg_date',
                                    'serial_no',
                                    'chest',
                                    'notes',
                                    'xray_result.status')
                          ->join('registrations','registrations.reg_id','xray_result.reg_id')
                          ->where('serial_no',$all->serial_no)
                          ->where('reg_date',$all->reg_date)
                          ->where('center_id',$all->centre_id)
                          ->first();

        if($check)
        {
            return response()->json(['xray' => $check], 200);
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
            $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                              ->where('center_id',$all->centre_id)
                              ->where('barcode_no',$all->barcode)
                              ->orderBy('reg_date','DESC')
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
            if($all->process_id == 3)
            {
                $check2 = PassportVerification::where('centre_id',$all->centre_id)->where('reg_id',$check->reg_id)->first();
            }
            elseif($all->process_id == 6)
            {
                $check2 = ReportIssue::where('centre_id',$all->centre_id)->where('reg_id',$check->reg_id)->first();
            }
            elseif($all->process_id == 5)
            {
                $check2 = XrayVerification::where('centre_id',$all->centre_id)->where('reg_id',$check->reg_id)->first();
            }

            $check->candidate_image = asset('storage/app/public/candidate_image/'.strtotime($check->created_at).'.png');

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

    public function fetch_registration_edit(request $request)
    {
        $all = json_decode($request->getContent());

        if($all->passport_no != NULL && $all->passport_no != '')
        {
            $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')->where('center_id',$all->centre_id)
                              ->where('passport_no',$all->passport_no)
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

            $check->place_of_issue = PlaceOfIssue::select('name as value','name as label')->where('name','LIKE','%'.$check->place_of_issue.'%')->first();
            $check->country = Country::select('name as value','name as label')->where('name','LIKE','%'.$check->place_of_issue.'%')->first();
            $check->agency = Agency::select('name as value','name as label')->where('name','LIKE','%'.$check->country.'%')->first();
            $check->profession = Profession::select('name as value','name as label')->where('name','LIKE','%'.$check->profession.'%')->first();

            $check->candidate_image = asset('storage/app/public/candidate_image/'.strtotime($check->created_at).'.PNG');

            return response()->json(['registration' => $check], 200);
        }
        else
        {
            return response()->json(['registration' => []], 200);
        }
    }

    public function fetch_registration_repeat(request $request)
    {
        $all = json_decode($request->getContent());

        $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                            ->where('center_id',$all->centre_id)
                            ->where('passport_no',$all->passport_no)
                            ->latest('registrations.created_at')
                            ->first();

        if($check)
        {

            $check->place_of_issue = PlaceOfIssue::select('name as value','name as label')->where('name','LIKE','%'.$check->place_of_issue.'%')->first();
            $check->country = Country::select('name as value','name as label')->where('name','LIKE','%'.$check->place_of_issue.'%')->first();
            $check->agency = Agency::select('name as value','name as label')->where('name','LIKE','%'.$check->country.'%')->first();
            $check->profession = Profession::select('name as value','name as label')->where('name','LIKE','%'.$check->profession.'%')->first();

            $check->candidate_image = asset('storage/app/public/candidate_image/'.strtotime($check->created_at).'.PNG');

            return response()->json(['registration' => $check], 200);
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

        $binary = base64_decode($all->biometric_fingerprint);

        $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                             ->where('center_id',$all->centre_id)
                             ->where("biometric_fingerprint", $binary)
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

    public function verify_xray(request $request)
    {
        $all = json_decode($request->getContent());

        $check = XrayVerification::where('centre_id',$all->centre_id)->where('reg_id',$all->reg_id)->first();

        if(!$check)
        {

            $insert = new XrayVerification;
            $insert->centre_id = $all->centre_id;
            $insert->reg_id = $all->reg_id;
            $insert->save();

            QueueManager::where('token_no',$all->token_no)
                            ->where('center_id',$all->centre_id)
                            ->where('process_id',5)
                            ->update(array('status' => 'Completed'));
        }

        return response()->json(['message' => 'Verified'], 200);
    }

    public function report_issue(request $request)
    {
        $all = json_decode($request->getContent());

        $check = ReportIssue::where('centre_id',$all->centre_id)->where('reg_id',$all->reg_id)->first();

        if(!$check)
        {

            $insert = new ReportIssue;
            $insert->centre_id = $all->centre_id;
            $insert->reg_id = $all->reg_id;
            $insert->save();

            QueueManager::where('token_no',$all->token_no)
                            ->where('center_id',$all->centre_id)
                            ->where('process_id',6)
                            ->update(array('status' => 'Completed'));
        }

        return response()->json(['message' => 'Issued'], 200);
    }

    public function store_registration(request $request)
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

        $new_reg = Registrations::where('center_id',$all->centre_id)->orderBy('reg_id','DESC')->first();

        $new2 = new Registrations;
        $new2->reg_id = $new_reg->reg_id+1;
        $new2->candidate_id = $candidate_id;
        $new2->center_id = $all->centre_id;
        $new2->agency = (isset($all->data->agency->value)) ? $all->data->agency->value : NULL;
        $new2->country = (isset($all->data->country->value)) ? $all->data->country->value : NULL;
        $new2->profession = (isset($all->data->profession->value)) ? $all->data->profession->value : NULL;
        $new2->cnic = $all->data->cnic;
        $new2->place_of_issue = (isset($all->data->place_of_issue->value)) ? $all->data->place_of_issue->value : NULL;
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

        if($all->candidate_image != NULL)
        {
            // Get base64 image from request
            $base64_image = $all->candidate_image;

            // Extract image data
            $image_parts = explode(";base64,", $base64_image);

            // Get the file extension
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];

            // Decode base64 string
            $image_base64 = base64_decode($image_parts[1]);

            // Generate a unique filename
            $image_name = strtotime($created) . '.' . $image_type;

            Storage::disk('public')->put('candidate_image/'.$image_name, $image_base64);
        }

            if($request->hasFile('passport_image'))
            {
                $image = $request->file('passport_image');
                $imageName = strtotime($created).'.'.$image->getClientOriginalExtension();

                $image->move(storage_path('app/public/candidate_passport'), $imageName);
            }
            elseif($all->passport_image != NULL)
            {
                Storage::putFileAs('public/candidate_passport', $all->passport_image, strtotime($created).'.jpg');
                File::delete($all->passport_image);
            }

            QueueManager::where('token_no',$all->data->token_no)
                        ->where('center_id',$all->centre_id)
                        ->where('process_id',1)
                        ->update(array('status' => 'Completed'));

            return response()->json(['message' => 'Registered'], 200);
    }

    public function update_registration(request $request)
    {
        $all = json_decode($request->getContent());

        $new = Candidates::find($all->candidate->candidate_id);
        $new->passport_no = $all->candidate->passport_no;
        $new->passport_issue_date = $all->candidate->passport_issue_date;
        $new->passport_expiry_date = $all->candidate->passport_expiry_date;
        $new->candidate_name = $all->candidate->candidate_name;
        $new->gender = $all->candidate->gender;
        $new->dob = $all->candidate->dob;
        $new->update();
        $created = $new->created_at;

        $new2 = Registrations::where('reg_id',$all->candidate->reg_id)
                             ->where('candidate_id',$all->candidate->candidate_id)
                             ->update(
                                        array(
                                            'agency' => (isset($all->candidate->agency->value)) ? $all->candidate->agency->value : NULL,
                                            'country' => (isset($all->candidate->country->value)) ? $all->candidate->country->value : NULL,
                                            'profession' => (isset($all->candidate->profession->value)) ? $all->candidate->profession->value : NULL,
                                            'cnic' => $all->candidate->cnic,
                                            'place_of_issue' => (isset($all->candidate->place_of_issue->value)) ? $all->candidate->place_of_issue->value : NULL,
                                            'reg_date' => $all->candidate->reg_date,
                                            'serial_no' => $all->candidate->serial_no,
                                            'relation_type' => $all->candidate->relation_type,
                                            'relative_name' => $all->candidate->relative_name,
                                            'slip_issue_date' => $all->candidate->slip_issue_date,
                                            'slip_expiry_date' => $all->candidate->slip_expiry_date,
                                            'phone_1' => $all->candidate->phone_1,
                                            'phone_2' => $all->candidate->phone_2,
                                            'nationality' => $all->candidate->nationality,
                                            'marital_status' => $all->candidate->marital_status,
                                            'fee_charged' => $all->candidate->fee_charged,
                                            'discount' => $all->candidate->discount,
                                            'remarks' => $all->candidate->remarks,
                                            'pregnancy_test' => $all->candidate->pregnancy_test
                                            // 'finger_type' => $all->candidate->finger_type
                                        ));

        if($all->candidate_image != NULL)
        {
            // Get base64 image from request
            $base64_image = $all->candidate_image;

            // Extract image data
            $image_parts = explode(";base64,", $base64_image);

            // Get the file extension
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];

            // Decode base64 string
            $image_base64 = base64_decode($image_parts[1]);

            // Generate a unique filename
            $image_name = strtotime($created) . '.' . $image_type;

            Storage::disk('public')->put('candidate_image/'.$image_name, $image_base64);
        }

        if($request->hasFile('passport_image'))
        {
            $image = $all->file('passport_image');
            $imageName = strtotime($created).'.'.$image->getClientOriginalExtension();

            $image->move(storage_path('app/public/candidate_passport'), $imageName);
        }

        return response()->json(['message' => 'Registration Updated!'], 200);
    }

    public function store_xray_result(Request $request)
    {
        $all = json_decode($request->getContent());

        $check = Registrations::where('center_id',$all->centre_id)
                              ->where('serial_no',$all->serial_no)
                              ->where('reg_date',$all->date)
                              ->first();
        if($check)
        {
            $check2 = XrayVerification::where('centre_id',$all->centre_id)
                              ->where('reg_id',$check->reg_id)
                              ->first();

            if($check2)
            {
                $check3 = XrayResult::where('reg_id',$check->reg_id)->where('centre_id',$all->centre_id)->first();

                if(!$check3)
                {

                    $new = new XrayResult;
                    $new->centre_id = $all->centre_id;
                    $new->reg_id = $check->reg_id;
                    $new->chest = $all->chest;
                    $new->notes = (isset($all->notes)) ? $all->notes : NULL;
                    if($request->chest == "lung fields clear")
                    {
                        $new->status = 'FIT';
                    }
                    else
                    {
                        $new->status = 'UNFIT';
                    }


                    if($request->hasFile('images'))
                    {
                        $files = $request->file('images');

                        foreach($files as $file)
                        {
                            $fileName = time().'.'.$file->getClientOriginalName();
                            $file->move(storage_path('app/public/xray_slips/'.$check->center_id.'/'.$check->reg_id), $fileName);

                            $new1 = new XraySlips;
                            $new1->centre_id = $check->center_id;
                            $new1->reg_id = $check->reg_id;
                            $new1->slips = $fileName;
                            $new1->save();
                        }
                    }

                    if($new->save())
                    {
                        return response()->json(['message' => 'XRAY Result has been saved'], 200);
                    }
                    else
                    {
                        return response()->json(['message' => 'XRAY Result has not been saved'], 500);
                    }
                }
                else
                {
                    return response()->json(['message' => 'XRAY Result already exists!'], 500);
                }
            }
            else
            {
                return response()->json(['message' => 'XRAY Verification not found!'], 404);
            }

        }
        else
        {
            return response()->json(['message' => 'Registration Not Found'], 404);
        }
    }

    public function update_xray_result(Request $request)
    {
        $all = json_decode($request->getContent());

        $check = Registrations::where('center_id',$all->centre_id)
                              ->where('serial_no',$all->serial_no)
                              ->where('reg_date',$all->date)
                              ->first();
        if($check)
        {
            $check2 = XrayVerification::where('centre_id',$all->centre_id)
                              ->where('reg_id',$check->reg_id)
                              ->first();

            if($check2)
            {

                $update = XRAYResult::where('centre_id', $all->centre_id)
                                 ->where('reg_id',$check->reg_id)
                                 ->update(
                                            array(
                                                    'chest' => $all->chest,
                                                    'notes' => $all->notes,
                                                    'status' => ($all->chest == "lung fields clear") ? 'FIT' : 'UNFIT'
                                                )
                                        );

                if($request->hasFile('images'))
                {
                    $files = $request->file('images');

                    foreach($files as $file)
                    {
                        $fileName = time().'.'.$file->getClientOriginalName();
                        $file->move(storage_path('app/public/xray_slips/'.$check->center_id.'/'.$check->reg_id), $fileName);

                        $new1 = new XraySlips;
                        $new1->centre_id = $check->center_id;
                        $new1->reg_id = $check->reg_id;
                        $new1->slips = $fileName;
                        $new1->save();
                    }
                }

                if($update)
                {
                    return response()->json(['message' => 'XRAY Result has been updated!'], 200);
                }
                else
                {
                    return response()->json(['message' => 'XRAY Result has not been updated!'], 500);
                }
            }
            else
            {
                return response()->json(['message' => 'XRAY Verification not found!'], 404);
            }

        }
        else
        {
            return response()->json(['message' => 'Registration Not Found'], 404);
        }
    }

    public function fetch_registration_print_normal(request $request)
    {
        $all = json_decode($request->getContent());

        $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                              ->where('center_id',$all->centre_id)
                              ->where('serial_no',$all->serial_no)
                              ->where('reg_date',$all->reg_date)
                              ->first();

        if($check)
        {

            $check->lab_stickers = LabSticker::where('reg_id',$check->reg_id)->where('centre_id',$all->centre_id)->first();
            $check->lab_result = LabResult::where('reg_id',$check->reg_id)->where('centre_id',$all->centre_id)->first();
            $check->xray_slips = XraySlips::where('reg_id',$check->reg_id)->where('centre_id',$all->centre_id)->first();
            $check->xray_result = XrayResult::where('reg_id',$check->reg_id)->where('centre_id',$all->centre_id)->first();
            $check->medical = Medical::where('reg_id',$check->reg_id)->where('centre_id',$all->centre_id)->first();
            $check->sample_collection = SampleCollection::where('reg_id',$check->reg_id)->where('centre_id',$all->centre_id)->first();

            $check->candidate_image = asset('storage/app/public/candidate_image/'.strtotime($check->created_at).'.png');

            return response()->json(['registration' => $check], 200);
        }
        else
        {
            return response()->json(['registration' => []], 200);
        }
    }

    public function fetch_registration_print_passport(request $request)
    {
        $all = json_decode($request->getContent());

        $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                            ->where('center_id',$all->centre_id)
                            ->where('passport_no',$all->passport_no)
                            ->first();

        if($check)
        {

            $check->lab_stickers = LabStickers::where('reg_id',$check->reg_id)->where('centre_id',$all->centre_id)->first();
            $check->lab_result = LabResult::where('reg_id',$check->reg_id)->where('centre_id',$all->centre_id)->first();
            $check->xray_verification = XrayVerification::where('reg_id',$check->reg_id)->where('centre_id',$all->centre_id)->first();
            $check->xray_result = XrayResult::where('reg_id',$check->reg_id)->where('centre_id',$all->centre_id)->first();
            $check->medical = Medical::where('reg_id',$check->reg_id)->where('centre_id',$all->centre_id)->first();
            $check->sample_collection = SampleCollection::where('reg_id',$check->reg_id)->where('centre_id',$all->centre_id)->first();

            $check->candidate_image = asset('storage/app/public/candidate_image/'.strtotime($check->created_at).'.png');

            return response()->json(['registration' => $check], 200);
        }
        else
        {
            return response()->json(['registration' => []], 200);
        }
    }

    public function export_reg_report(request $request)
    {
        $all = json_decode($request->getContent());

        $centre = Centres::find($all->centre_id);

        $reg = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                           ->where('barcode_no',$all->barcode_no)
                           ->where('center_id',$all->centre_id)
                           ->latest('registrations.created_at')
                           ->first();


            $pdf = new Fpdf();
            $pdf->AddPage('P', 'A4', '0');

            $pdf->SetFont('Arial','', 11);
            $pdf->Ln(18);

            //Header Start
            $pdf->SetX(70); //The next cell will be set 100 units to the right
            $pdf->Cell(40,0,$pdf->Image(asset('storage/app/public/centres/logos/'.$centre->image),$pdf->GetX(),$pdf->GetY(),70,20),0,0,'C',false);
            $pdf->Ln(20);
            $pdf->Ln(20);
            $pdf->SetFont('Arial','U',14);
            $pdf->Cell(0,6,$centre->address,0,1,'C');
            $pdf->Cell(0,6,'Phone: '.$centre->phone.', Fax: ',0,1,'C');
            $pdf->Cell(0,6,'Email: ',0,1,'C');
            $pdf->Ln(6);
            $pdf->SetFont('Arial','B',14);
            $pdf->SetX(20);
            $pdf->Cell(60,1,'Date:'.$reg->reg_date,0,0,'C');
            $pdf->Ln(2);
            $pdf->Line(30, 95, 180, 95);
            $pdf->Ln(6);

            $pdf->SetFont('Arial','',11);
            $pdf->SetX(15);
            $pdf->Cell(60,7,'Candidate Name',1,0,'L');
            $pdf->Cell(120,7,strtoupper($reg->candidate_name),1,1,'L');
            $pdf->SetX(15);
            $pdf->Cell(60,7,'Passport Number',1,0,'L');
            $pdf->Cell(120,7,$reg->passport_no,1,1,'L');
            $pdf->SetX(15);
            $pdf->Cell(60,7,'Country',1,0,'L');
            $pdf->Cell(120,7,$reg->country,1,1,'L');
            $pdf->SetX(15);
            $pdf->Cell(60,7,'Mobile Number',1,0,'L');
            $pdf->Cell(120,7,$reg->phone_1,1,1,'L');
            $pdf->SetX(15);
            $pdf->Cell(60,7,'Reporting Date',1,0,'L');
            $pdf->Cell(120,7,'After 2 Working Days',1,1,'L');
            $pdf->SetX(15);
            $pdf->Cell(60,7,'Reporting Time',1,0,'L');
            $pdf->Cell(120,7,'3:00 PM',1,1,'L');

            $pdf->Ln(2);

            $pdf->SetX(110);
            $d = new DNS1D();
            $barcodeBase = $d->getBarcodePNG($reg->barcode_no, 'C39+', 2,60,array(2,2,2), true);
            $base64_data = $barcodeBase;
            $decoded_data = base64_decode($base64_data);

            file_put_contents("temp_image.png", $decoded_data);
            $pdf->Cell(110,7,$pdf->Image("temp_image.png"),70,22);
            $pdf->SetX(15);
            $pdf->Ln(15);
            $pdf->Cell(4,10,".............................................................................................................................................................................", 0, 1);
            $pdf->Ln(8);
            $pdf->SetFont('Arial','',10);
            $pdf->Cell(12,7,$reg->token_no,0,1,'R');

            $pdf->SetFont('Arial','',14);

            $pdf->SetX(15);
            $pdf->Cell(60,7,'Candidate Name',1,0,'L');
            $pdf->Cell(120,7,$reg->candidate_name,1,1,'L');
            $pdf->SetX(15);
            $pdf->Cell(60,7,'Passport Number',1,0,'L');
            $pdf->Cell(120,7,$reg->passport_no,1,1,'L');
            $pdf->SetX(15);
            $pdf->Cell(60,7,'Country',1,0,'L');
            $pdf->Cell(120,7,$reg->country,1,1,'L');
            $pdf->SetX(15);
            $pdf->Cell(60,7,'Serial Number',1,0,'L');
            $pdf->Cell(120,7,$reg->serial_no,1,1,'L');
            $pdf->SetX(15);
            $pdf->Cell(60,7,'Examination Date',1,0,'L');
            $pdf->Cell(120,7,$reg->reg_date,1,1,'L');
            $pdf->SetX(15);
            $pdf->Cell(60,7,'Profession',1,0,'L');
            $pdf->Cell(120,7,$reg->profession,1,1,'L');



            $pdf->Ln(16);
            $pdf->SetX(30);
            $pdf->Cell(15,10, 'Lab  ', 0, 0);
            $pdf->Cell(15,12, '', 1, 0);
            $pdf->SetX(80);
            $pdf->Cell(18,10, 'X-Ray    ', 0, 0);
            $pdf->Cell(15,12, '', 1, 0);
            $pdf->SetX(140);
            $pdf->Cell(15,10, 'MO   ', 0, 0);
            $pdf->Cell(15,12, '', 1, 1);
            $pdf->Ln(6);

            $filename = 'print_report_export_' . time() . '.pdf';

            // Save the PDF to the storage folder
            $pdf->Output(storage_path("app/public/pdf_exports/$filename"), 'F');

            unlink("temp_image.png");

            return response()->json(['success' => true, 'filename' => asset('storage/app/public/pdf_exports/'.$filename)], 200);
    }

    public function repeat_case_registration(request $request)
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

        $new_reg = Registrations::where('center_id',$all->centre_id)->orderBy('reg_id','DESC')->first();

        $new2 = new Registrations;
        $new2->reg_id = $new_reg->reg_id+1;
        $new2->candidate_id = $candidate_id;
        $new2->center_id = $all->centre_id;
        $new2->agency = $all->data->agency->value;
        $new2->country = $all->data->country->value;
        $new2->profession = $all->data->profession->value;
        $new2->cnic = $all->data->cnic;
        $new2->place_of_issue = $all->data->place_of_issue->value;
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
        $new2->biometric_fingerprint = $all->fingerprint;
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
                        ->where('center_id',$all->centre_id)
                        ->where('process_id',1)
                        ->update(array('status' => 'Completed'));

            return response()->json(['message' => 'Registered'], 200);
    }
}
