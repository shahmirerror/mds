<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Candidates;
use App\Models\Registrations;

class ImportController extends Controller
{
    public function fetch_regs()
    {
        // Define the URL to be accessed
        $url = "http://localhost:81/old_mls/reliance/candidates.php";

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
                        $new = new Registrations;
                        $new->id = $d['reg_id'];
                        $new->candidate_id = $check->id;
                        $new->place_of_issue = $d['place_of_issue'];
                        $new->reg_date = date('Y-m-d', strtotime($d['reg_date']));
                        $new->serial_no = $d['serial_no'];
                        $new->relation_type = $d['relation_type'];
                        $new->relative_name = $d['son_of'];
                        $new->phone_1 = $d['phone_1'];
                        $new->phone_2 = $d['phone_2'];
                        $new->nationality = $d['nationality'];
                        $new->marital_status = $d['marital_status'];
                        $new->barcode_no = $d['barcode_no'];
                        $new->biometric_fingerprint = $d['biometric_fingerprint'];
                        $new->fee_charged = $d['fee_charged'];
                        $new->discount = $d['discount'];
                        $new->remarks = $d['remarks'];
                        $new->pregnancy_test = $d['pregnancy_test'];
                        // $new->created_by = $d->id;
                        // $new->updated_by = $d->id;
                        $new->status_remarks = $d['status_remarks'];
                        $new->slip_issue_date = date('Y-m-d', strtotime($d['slip_issue_date']));
                        $new->slip_expiry_date = date('Y-m-d', strtotime($d['slip_expiry_date']));
                        $new->token_no = $d['token_no'];
                        $new->center_id = '1';
                        $new->print_report_portion = $d['print_report_portion'];
                        $new->save();
                    }
                    else
                    {
                        $new = new Candidates;
                        $new->passport_no = $d['passport_no'];
                        $new->passport_issue_date = date('Y-m-d', strtotime($d['passport_issue_date']));
                        $new->passport_expiry_date = date('Y-m-d', strtotime($d['passport_expiry_date']));
                        $new->candidate_name = $d['candidate_name'];
                        $new->agency = $d['agency'];
                        $new->country = $d['country'];
                        $new->profession = $d['profession'];
                        $new->cnic = $d['cnic'];
                        $new->gender = $d['gender'];
                        $new->dob = $d['d_o_b'];
                        $new->save();

                        $new_2 = new Registrations;
                        $new_2->id = $d['reg_id'];
                        $new_2->candidate_id = $new->id;
                        $new_2->place_of_issue = $d['place_of_issue'];
                        $new_2->reg_date = date('Y-m-d', strtotime($d['reg_date']));
                        $new_2->serial_no = $d['serial_no'];
                        $new_2->relation_type = $d['relation_type'];
                        $new_2->relative_name = $d['son_of'];
                        $new_2->phone_1 = $d['phone_1'];
                        $new_2->phone_2 = $d['phone_2'];
                        $new_2->nationality = $d['nationality'];
                        $new_2->marital_status = $d['marital_status'];
                        $new_2->barcode_no = $d['barcode_no'];
                        $new_2->biometric_fingerprint = $d['biometric_fingerprint'];
                        $new_2->fee_charged = $d['fee_charged'];
                        $new_2->discount = $d['discount'];
                        $new_2->remarks = $d['remarks'];
                        $new_2->pregnancy_test = $d['pregnancy_test'];
                        // $new_2->created_by = $d->id;
                        // $new_2->updated_by = $d->id;
                        $new_2->status_remarks = $d['status_remarks'];
                        $new_2->slip_issue_date = date('Y-m-d', strtotime($d['slip_issue_date']));
                        $new_2->slip_expiry_date = date('Y-m-d', strtotime($d['slip_expiry_date']));
                        $new_2->token_no = $d['token_no'];
                        $new_2->center_id = '1';
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

    }

    public function fetch_xrays()
    {

    }

    public function fetch_medicals()
    {

    }
}
