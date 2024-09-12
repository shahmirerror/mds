<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Candidates;
use App\Models\Registrations;
use App\Models\Medical;
use App\Models\XrayResult;
use App\Models\XrayVerification;
use App\Models\LabResult;
use App\Models\LabSticker;
use App\Models\Profession;
use App\Models\Country;
use App\Models\Agency;
use App\Models\Nationality;
use App\Models\PlaceOfIssue;
use App\Models\ReportIssue;
use App\Models\XraySlips;
use App\Models\SampleCollection;
use App\Models\PassportVerification;

use App\Models\Centres;

class ImportController extends Controller
{
    public function fetch_regs()
    {
        // Define the URL to be accessed
        $url = "http://localhost:81/old_mls/khaleej/candidates.php";

        // Initialize a cURL session
        $curl = curl_init($url);

        // Set options for the cURL session
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
        ));

        // Execute the cURL request and store the response
        $response = curl_exec($curl);

        // Check for errors
        if (curl_errno($curl)) {
            echo "Error: " . curl_error($curl);
        } else {
            // Decode the JSON response
            $data = json_decode($response, true);

            // Print the retrieved data
            // echo "<pre>";
            // print_r($data);
            // echo "</pre>";

            foreach($data as $d)
            {
                if(strpos($d['passport_no'], "_false") == false)
                {
                    $check = Candidates::where('passport_no',$d['passport_no'])->first();

                    if($check)
                    {
                        $check2 = Registrations::where('reg_id',$d['reg_id'])->where('center_id',1)->first();

                        if(!$check2)
                        {
                            $new = new Registrations;
                            $new->reg_id = $d['reg_id'];
                            $new->candidate_id = $check->id;
                            $new->place_of_issue = $d['place_of_issue'];
                            $new->reg_date = date('Y-m-d', strtotime($d['reg_date']));
                            $new->serial_no = $d['serial_no'];
                            $new->relation_type = $d['relation_type'];
                            $new->relative_name = $d['son_of'];
                            $new->phone_1 = $d['phone_1'];
                            $new->phone_2 = $d['phone_2'];
                            $new->nationality = $d['nationality'];
                            $new->agency = $d['agency'];
                            $new->country = $d['country'];
                            $new->cnic = $d['cnic'];
                            $new->profession = $d['profession'];
                            $new->marital_status = $d['marital_status'];
                            $new->barcode_no = $d['barcode_no'];
                            $new->biometric_fingerprint = $d['biometric_fingerprint'];
                            $new->fee_charged = $d['fee_charged'];
                            $new->discount = $d['discount'];
                            $new->remarks = $d['remarks'];
                            $new->pregnancy_test = $d['pregnancy_test'];
                            $new->status_remarks = $d['status_remarks'];
                            $new->slip_issue_date = (date('Y-m-d', strtotime($d['slip_issue_date'])) != "-0001-11-30") ? date('Y-m-d', strtotime($d['slip_issue_date'])) : date('Y-m-d', strtotime('1970-01-01'));
                            $new->slip_expiry_date = (date('Y-m-d', strtotime($d['slip_expiry_date'])) != "-0001-11-30") ? date('Y-m-d', strtotime($d['slip_expiry_date'])) : date('Y-m-d', strtotime('1970-01-01'));
                            $new->token_no = $d['token_no'];
                            $new->center_id = '3';
                            $new->print_report_portion = $d['print_report_portion'];
                            $new->save();
                        }
                        else
                        {
                            $new = Registrations::find($check2->id);
                            $new->reg_id = $d['reg_id'];
                            $new->candidate_id = $check->id;
                            $new->place_of_issue = $d['place_of_issue'];
                            $new->reg_date = date('Y-m-d', strtotime($d['reg_date']));
                            $new->serial_no = $d['serial_no'];
                            $new->relation_type = $d['relation_type'];
                            $new->relative_name = $d['son_of'];
                            $new->phone_1 = $d['phone_1'];
                            $new->phone_2 = $d['phone_2'];
                            $new->nationality = $d['nationality'];
                            $new->agency = $d['agency'];
                            $new->country = $d['country'];
                            $new->profession = $d['profession'];
                            $new->marital_status = $d['marital_status'];
                            $new->barcode_no = $d['barcode_no'];
                            $new->biometric_fingerprint = $d['biometric_fingerprint'];
                            $new->fee_charged = $d['fee_charged'];
                            $new->discount = $d['discount'];
                            $new->remarks = $d['remarks'];
                            $new->pregnancy_test = $d['pregnancy_test'];
                            $new->cnic = $d['cnic'];
                            $new->status_remarks = $d['status_remarks'];
                            $new->slip_issue_date = (date('Y-m-d', strtotime($d['slip_issue_date'])) != "-0001-11-30") ? date('Y-m-d', strtotime($d['slip_issue_date'])) : date('Y-m-d', strtotime('1970-01-01'));
                            $new->slip_expiry_date = (date('Y-m-d', strtotime($d['slip_expiry_date'])) != "-0001-11-30") ? date('Y-m-d', strtotime($d['slip_expiry_date'])) : date('Y-m-d', strtotime('1970-01-01'));
                            $new->token_no = $d['token_no'];
                            $new->center_id = '3';
                            $new->print_report_portion = $d['print_report_portion'];
                            $new->update();
                        }
                    }
                    else
                    {
                        $new = new Candidates;
                        $new->passport_no = $d['passport_no'];
                        $new->passport_issue_date = date('Y-m-d', strtotime($d['passport_issue_date']));
                        $new->passport_expiry_date = date('Y-m-d', strtotime($d['passport_expiry_date']));
                        $new->candidate_name = $d['candidate_name'];
                        $new->gender = $d['gender'];
                        $new->dob = $d['d_o_b'];
                        $new->save();

                        $new_2 = new Registrations;
                        $new_2->reg_id = $d['reg_id'];
                        $new_2->candidate_id = $new->id;
                        $new_2->place_of_issue = $d['place_of_issue'];
                        $new_2->reg_date = date('Y-m-d', strtotime($d['reg_date']));
                        $new_2->serial_no = $d['serial_no'];
                        $new_2->relation_type = $d['relation_type'];
                        $new_2->relative_name = $d['son_of'];
                        $new_2->phone_1 = $d['phone_1'];
                        $new_2->phone_2 = $d['phone_2'];
                        $new_2->nationality = $d['nationality'];
                        $new->agency = $d['agency'];
                        $new->country = $d['country'];
                        $new->profession = $d['profession'];
                        $new_2->marital_status = $d['marital_status'];
                        $new_2->barcode_no = $d['barcode_no'];
                        $new_2->cnic = $d['cnic'];
                        $new_2->biometric_fingerprint = $d['biometric_fingerprint'];
                        $new_2->fee_charged = $d['fee_charged'];
                        $new_2->discount = $d['discount'];
                        $new_2->remarks = $d['remarks'];
                        $new_2->pregnancy_test = $d['pregnancy_test'];
                        $new_2->status_remarks = $d['status_remarks'];
                        $new->slip_issue_date = (date('Y-m-d', strtotime($d['slip_issue_date'])) != "-0001-11-30") ? date('Y-m-d', strtotime($d['slip_issue_date'])) : date('Y-m-d', strtotime('1970-01-01'));
                        $new->slip_expiry_date = (date('Y-m-d', strtotime($d['slip_expiry_date'])) != "-0001-11-30") ? date('Y-m-d', strtotime($d['slip_expiry_date'])) : date('Y-m-d', strtotime('1970-01-01'));
                        $new_2->token_no = $d['token_no'];
                        $new_2->center_id = '3';
                        $new_2->print_report_portion = $d['print_report_portion'];
                        $new_2->save();
                    }
                }
            }
        }

        // Close the cURL session
        curl_close($curl);

    }

    public function fetch_labs()
    {
        // Define the URL to be accessed
        $url = "http://localhost:81/old_mls/khaleej/lab.php";

        // Initialize a cURL session
        $curl = curl_init($url);

        // Set options for the cURL session
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
        ));

        // Execute the cURL request and store the response
        $response = curl_exec($curl);

        // Check for errors
        if (curl_errno($curl)) {
            echo "Error: " . curl_error($curl);
        } else {
            // Decode the JSON response
            $data = json_decode($response, true);

            // Print the retrieved data
            // echo "<pre>";
            // print_r($data);
            // echo "</pre>";

            foreach($data as $d)
            {
                $new = new LabResult;
                $new->centre_id = '3';
                $new->reg_id = $d['reg_id'];
                $new->barcode = $d['barcode'];

                $new->hcv = $d['HCV'];
                $new->hbsag = $d['HBsAg'];
                $new->HIV = $d['HIV'];

                $new->vdrl = $d['VDRL'];
                $new->tpha = $d['TPHA'];
                $new->rbs = $d['RBS'];

                $new->bil = $d['BIL'];
                $new->alt = $d['ALT'];
                $new->ast = $d['AST'];

                $new->alk = $d['ALK'];
                $new->creatinine = $d['Creatinine'];
                $new->blood_group = $d['blood_group'];

                $new->haemoglobin = $d['Haemoglobin'];
                $new->malaria = $d['Malaria'];
                $new->micro_filariae = $d['Micro_filariae'];

                $new->sugar = $d['sugar'];
                $new->albumin = $d['albumin'];
                $new->helminthes = $d['helminthes'];

                $new->ova = $d['OVA'];
                $new->cyst = $d['CYST'];
                $new->tb = $d['TB'];

                $new->pregnancy = $d['pregnancy'];
                $new->polio = $d['polio'];
                $new->polio_date = ($d['polio_date'] == "0000-00-00") ? NULL : $d['polio_date'];

                $new->mmr1 = $d['MMR1'];
                $new->mmr2 = $d['MMR2'];
                $new->mmr1_date = ($d['mmr1_date'] == "0000-00-00") ? NULL : $d['mmr1_date'];
                $new->mmr2_date = ($d['mmr2_date'] == "0000-00-00") ? NULL : $d['mmr2_date'];

                $new->meningococcal = $d['meningococcal'];
                $new->meningococcal_date = ($d['meningococcal_date'] == "0000-00-00") ? NULL : $d['meningococcal_date'];

                $new->status = $d['lab_status'];
                $new->created_by = $d['created_by'];
                $new->created_at = $d['created_on'];

                $new->save();
            }
        }

        // Close the cURL session
        curl_close($curl);
    }

    public function fetch_labsticker()
    {
        // Define the URL to be accessed
        $url = "http://localhost:81/old_mls/khaleej/lab.php";

        // Initialize a cURL session
        $curl = curl_init($url);

        // Set options for the cURL session
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
        ));

        // Execute the cURL request and store the response
        $response = curl_exec($curl);

        // Check for errors
        if (curl_errno($curl)) {
            echo "Error: " . curl_error($curl);
        } else {
            // Decode the JSON response
            $data = json_decode($response, true);

            // Print the retrieved data
            // echo "<pre>";
            // print_r($data);
            // echo "</pre>";

            foreach($data as $d)
            {
                $new = new LabSticker;
                $new->centre_id = '3';
                $new->reg_id = $d['reg_id'];
                $new->sticker_print_by = $d['sticker_print_by'];

                // $new->sticker_1_printed = $d['sticker_1_printed'];
                $new->sticker_value_1 = $d['sticker_value_1'];
                $new->sticker_value_2 = $d['sticker_value_2'];

                $new->sticker_read_by = $d['sticker_read_by'];
                $new->printed = $d['printed'];
                $new->created_at = $d['created_on'];

                $new->save();
            }
        }

        // Close the cURL session
        curl_close($curl);
    }

    public function fetch_xrays()
    {
        // Define the URL to be accessed
        // $url = "http://localhost:81/old_mls/khaleej/xray_verification.php";
        $url = "http://localhost:81/old_mls/khaleej/xray.php";

        // Initialize a cURL session
        $curl = curl_init($url);

        // Set options for the cURL session
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
        ));

        // Execute the cURL request and store the response
        $response = curl_exec($curl);

        // Check for errors
        if (curl_errno($curl)) {
            echo "Error: " . curl_error($curl);
        } else {
            // Decode the JSON response
            $data = json_decode($response, true);

            // Print the retrieved data
            // echo "<pre>";
            // print_r($data);
            // echo "</pre>";

            foreach($data as $d)
            {
                $new = new XraySlips;
                $new->centre_id = '3';
                $new->reg_id = $d['reg_id'];
                $new->slips = $d['xray_slips'];
                $new->created_at = $d['created_at'];

                // $new = new XrayVerification;
                // $new->centre_id = '3';
                // $new->reg_id = $d['reg_id'];
                // $new->created_by = $d['created_by'];
                // $new->created_at = $d['created_at'];

                // $new = new XrayResult;
                // $new->centre_id = '3';
                // $new->reg_id = $d['reg_id'];
                // $new->chest = $d['xray_chest'];
                // $new->notes = $d['xray_notes'];
                // $new->status = $d['xray_status'];
                // $new->created_at = $d['created_on'];

                $new->save();
            }
        }

        // Close the cURL session
        curl_close($curl);
    }

    public function fetch_medicals()
    {
        // Define the URL to be accessed
        $url = "http://localhost:81/old_mls/khaleej/medical.php";

        // Initialize a cURL session
        $curl = curl_init($url);

        // Set options for the cURL session
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
        ));

        // Execute the cURL request and store the response
        $response = curl_exec($curl);

        // Check for errors
        if (curl_errno($curl)) {
            echo "Error: " . curl_error($curl);
        } else {
            // Decode the JSON response
            $data = json_decode($response, true);

            // Print the retrieved data
            // echo "<pre>";
            // print_r($data);
            // echo "</pre>";

            foreach($data as $d)
            {
                // $new = new Medical;
                // $new->centre_id = '3';
                // $new->reg_id = $d['reg_id'];
                // $new->height = $d['height'];
                // $new->weight = $d['weight'];
                // $new->bmi = $d['bmi'];
                // $new->pulse = $d['pulse'];
                // $new->rr = $d['rr'];

                // $new->visual_unaided_right_eye = $d['visual_unaided_rt_eye'];
                // $new->visual_unaided_left_eye = $d['visual_unaided_left_eye'];
                // $new->visual_aided_right_eye = $d['visual_aided_rt_eye'];
                // $new->visual_aided_left_eye = $d['visual_aided_left_eye'];

                // $new->distant_unaided_right_eye = $d['distant_unaided_rt_eye'];
                // $new->distant_unaided_left_eye = $d['distant_unaided_left_eye'];
                // $new->distant_aided_right_eye = $d['distant_aided_rt_eye'];
                // $new->distant_aided_left_eye = $d['distant_aided_left_eye'];

                // $new->near_unaided_right_eye = $d['near_unaided_rt_eye'];
                // $new->near_unaided_left_eye = $d['near_unaided_left_eye'];
                // $new->near_aided_right_eye = $d['near_aided_rt_eye'];
                // $new->near_aided_left_eye = $d['near_aided_left_eye'];

                // $new->color_vision = $d['color_vision'];
                // $new->hearing_left_ear = $d['hearing_left_ear'];
                // $new->hearing_right_ear = $d['hearing_rt_ear'];
                // $new->appearance = $d['appearance'];

                // $new->speech = $d['speech'];
                // $new->behavior = $d['behavior'];
                // $new->cognition = $d['cognition'];
                // $new->orientation = $d['orientation'];

                // $new->memory = $d['memory'];
                // $new->concentration = $d['concentration'];
                // $new->mood = $d['mood'];
                // $new->thoughts = $d['thoughts'];

                // $new->other = $d['other'];
                // $new->general_appearance = $d['general_appearance'];
                // $new->cardiovascular = $d['cardiovascular'];
                // $new->respiratory = $d['respiratory'];

                // $new->abdomen = $d['abdomen'];
                // $new->hernia = $d['hernia'];
                // $new->hydrocele = $d['hydrocele'];
                // $new->extremities = $d['extremities'];

                // $new->back = $d['back'];
                // $new->skin = $d['skin'];
                // $new->cns = $d['cns'];
                // $new->deformities = $d['deformities'];

                // $new->remarks = $d['remarks'];
                // $new->bp = $d['bp'];
                // $new->ent = $d['ent'];
                // $new->mo_file = $d['mo_file'];

                // $new->status = $d['medical_status'];
                // $new->created_at = $d['created_at'];
                // $new->created_by = $d['created_by'];

                $new = new SampleCollection;
                $new->centre_id = '3';
                $new->reg_id = $d['reg_id'];
                $new->notes = $d['collection_notes'];
                $new->created_at = $d['created_on'];

                $new->save();
            }
        }

        // Close the cURL session
        curl_close($curl);
    }

    public function fetch_country()
    {
        // Define the URL to be accessed
        $url = "http://localhost:8080/old_mls/reliance/country.php";

        $centres = Centres::where('status','Active')->get();

        // Initialize a cURL session
        $curl = curl_init($url);

        // Set options for the cURL session
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
        ));

        // Execute the cURL request and store the response
        $response = curl_exec($curl);

        // Check for errors
        if (curl_errno($curl)) {
            echo "Error: " . curl_error($curl);
        } else {
            // Decode the JSON response
            $data = json_decode($response, true);

            // Print the retrieved data
            // echo "<pre>";
            // print_r($data);
            // echo "</pre>";

            foreach($data as $d)
            {
                foreach($centres as $centre)
                {
                    $new = new Country;
                    $new->centre_id = $centre->id;
                    $new->name = $d['Name'];
                    $new->status = ($d['status'] == 1) ? 'Active' : 'Inactive';

                    $new->save();
                }
            }
        }

        // Close the cURL session
        curl_close($curl);
    }

    public function fetch_agency()
    {
        // Define the URL to be accessed
        $url = "http://localhost:81/old_mls/reliance/agency.php";

        $centres = Centres::where('status','Active')->get();

        // Initialize a cURL session
        $curl = curl_init($url);

        // Set options for the cURL session
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
        ));

        // Execute the cURL request and store the response
        $response = curl_exec($curl);

        // Check for errors
        if (curl_errno($curl)) {
            echo "Error: " . curl_error($curl);
        } else {
            // Decode the JSON response
            $data = json_decode($response, true);

            // Print the retrieved data
            // echo "<pre>";
            // print_r($data);
            // echo "</pre>";

            foreach($data as $d)
            {
                foreach($centres as $centre)
                {
                    $new = new Agency;
                    $new->centre_id = $centre->id;
                    $new->name = $d['Name'];
                    $new->status = ($d['status'] == 1) ? 'Active' : 'Inactive';

                    $new->save();
                }
            }
        }

        // Close the cURL session
        curl_close($curl);
    }

    public function fetch_profession()
    {
        // Define the URL to be accessed
        $url = "http://localhost:81/old_mls/reliance/profession.php";

        $centres = Centres::where('status','Active')->get();

        // Initialize a cURL session
        $curl = curl_init($url);

        // Set options for the cURL session
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
        ));

        // Execute the cURL request and store the response
        $response = curl_exec($curl);

        // Check for errors
        if (curl_errno($curl)) {
            echo "Error: " . curl_error($curl);
        } else {
            // Decode the JSON response
            $data = json_decode($response, true);

            // Print the retrieved data
            // echo "<pre>";
            // print_r($data);
            // echo "</pre>";

            foreach($data as $d)
            {
                foreach($centres as $centre)
                {
                    $new = new Profession;
                    $new->centre_id = $centre->id;
                    $new->name = $d['profession'];
                    $new->status = ($d['status'] == 1) ? 'Active' : 'Inactive';

                    $new->save();
                }
            }
        }

        // Close the cURL session
        curl_close($curl);
    }

    public function fetch_nationality()
    {
        // Define the URL to be accessed
        $url = "http://localhost:81/old_mls/reliance/nationality.php";

        $centres = Centres::where('status','Active')->get();

        // Initialize a cURL session
        $curl = curl_init($url);

        // Set options for the cURL session
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
        ));

        // Execute the cURL request and store the response
        $response = curl_exec($curl);

        // Check for errors
        if (curl_errno($curl)) {
            echo "Error: " . curl_error($curl);
        } else {
            // Decode the JSON response
            $data = json_decode($response, true);

            // Print the retrieved data
            // echo "<pre>";
            // print_r($data);
            // echo "</pre>";

            foreach($data as $d)
            {
                foreach($centres as $centre)
                {
                    $new = new Nationaltiy;
                    $new->centre_id = $centre->id;
                    $new->name = $d['nationaltiy'];
                    $new->status = ($d['status'] == 1) ? 'Active' : 'Inactive';

                    $new->save();
                }
            }
        }

        // Close the cURL session
        curl_close($curl);
    }

    public function fix_regs()
    {
        $get_regs = Registrations::join('candidates','candidates.id','registrations.candidate_id')->where('reg_date','<=','2024-04-04')->where('center_id','1')->get();

        foreach($get_regs as $reg)
        {
            $update = Registrations::where('reg_id',$reg->reg_id)->update(array('old_img' => $reg->passport_no));
        }
    }

    public function fix_xray_verif()
    {
        $get_regs = XrayResult::whereDate('created_at','<=','2024-04-04')->where('centre_id','1')->get();

        foreach($get_regs as $reg)
        {
            $check = XrayVerification::where('reg_id',$reg->reg_id)->where('centre_id',$reg->centre_id)->first();
            if(!$check)
            {
                $update = XrayVerification::insert(array('centre_id' => $reg->centre_id, 'reg_id' => $reg->reg_id, 'created_at' => $reg->created_at));
            }
        }
    }

    public function fix_reg_ids()
    {
        $get_regs = Registrations::where('center_id','3')->where('old_img','!=',NULL)->get();

        // foreach($get_regs as $reg)
        // {
        //     $update = Registrations::find($reg->id);
        //     $update->reg_id = 47218+$update->reg_id;
        //     $update->update();
        // }

        // foreach($get_regs as $reg)
        // {
        //     $now_id = $reg->reg_id - 47218;

        //     $update = SampleCollection::where('reg_id',$now_id)->where('centre_id',3)->update(array('reg_id' => $now_id+47218));

        //     $update2 = LabSticker::where('reg_id',$now_id)->where('centre_id',3)->update(array('reg_id' => $now_id+47218));

        //     $update3 = LabResult::where('reg_id',$now_id)->where('centre_id',3)->update(array('reg_id' => $now_id+47218));

        //     $update4 = Medical::where('reg_id',$now_id)->where('centre_id',3)->update(array('reg_id' => $now_id+47218));

        //     $update5 = PassportVerification::where('reg_id',$now_id)->where('centre_id',3)->update(array('reg_id' => $now_id+47218));

        //     $update6 = XrayResult::where('reg_id',$now_id)->where('centre_id',3)->update(array('reg_id' => $now_id+47218));

        //     $update7 = XrayVerification::where('reg_id',$now_id)->where('centre_id',3)->update(array('reg_id' => $now_id+47218));

        //     $update8 = XraySlips::where('reg_id',$now_id)->where('centre_id',3)->update(array('reg_id' => $now_id+47218));

        //     $update9 = ReportIssue::where('reg_id',$now_id)->where('centre_id',3)->update(array('reg_id' => $now_id+47218));
        // }

        foreach($get_regs as $reg)
        {
            $get_candidate = Candidates::where('passport_no',$reg->old_img)->first();

            if($get_candidate)
            {
                $update = Registrations::where('id',$reg->id)->update(array('candidate_id' => $get_candidate->id));
            }
        }

    }

    public function fix_finger()
    {
        $get_regs = Registrations::where('biometric_fingerprint','=','')->where('center_id','1')->get();

        foreach($get_regs as $reg)
        {
            $check = Registrations::where('candidate_id',$reg->candidate_id)
                                  ->where('biometric_fingerprint','!=','')
                                  ->where('center_id',$reg->center_id)->first();
            if(isset($check->biometric_fingerprint))
            {
                $update = Registrations::where('reg_id',$reg->reg_id)->update(array('biometric_fingerprint' => $check->biometric_fingerprint));
            }
        }
    }
}
