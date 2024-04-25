<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

use App\Models\PrintLogs;
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
use App\Models\ENO;

use Codedge\Fpdf\Fpdf\Fpdf;

use Milon\Barcode\DNS1D;

use Mike42\Escpos\Printer;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;

use DB;

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

    public function fetch_prev_registration(request $request)
    {
        $all = json_decode($request->getContent());

        if($all->cnic != NULL && $all->cnic != '')
        {
            $check = Registrations::select('reg_date','serial_no','country','status')
                                   ->where('cnic',$all->cnic)
                                   ->where('center_id',$all->centre_id)
                                   ->orderBy('id','DESC')
                                   ->first();
            if($check)
            {
                return response()->json(['prev' => $check], 200);
            }
            else
            {
                return response()->json(['prev' => null], 200);
            }
        }
        else
        {
            return response()->json(['prev' => null], 200);
        }
    }

    public function fetch_registration(request $request)
    {
        $all = json_decode($request->getContent());

        if(isset($all->barcode2) && $all->barcode2 != '')
        {
            if($all->process_id != 'lab_sticker' && $all->process_id != 'lab' && $all->process_id != 'eno')
            {
                $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                                ->where('center_id',$all->centre_id)
                                ->where('token_no',$all->barcode2)
                                ->where('reg_date',date('Y-m-d'))
                                ->orderBy('reg_date','DESC')
                                ->first();
            }
        }
        elseif($all->barcode != NULL && $all->barcode != '')
        {
            if($all->process_id != 'lab_sticker' && $all->process_id != 'lab' && $all->process_id != 'eno')
            {
                $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                                ->where('center_id',$all->centre_id)
                                ->where('barcode_no',$all->barcode)
                                ->orderBy('reg_date','DESC')
                                ->first();
            }
            elseif($all->process_id == 'lab_sticker')
            {
                $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                                ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                ->where('center_id',$all->centre_id)
                                ->where('lab_sticker.sticker_value_1',$all->barcode)
                                ->orderBy('reg_date','DESC')
                                ->first();
            }
            elseif($all->process_id == 'lab')
            {
                $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                                ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                ->where('center_id',$all->centre_id)
                                ->where('lab_sticker.sticker_value_2',$all->barcode)
                                ->orderBy('reg_date','DESC')
                                ->first();
            }
            elseif($all->process_id == 'eno')
            {
                $check = Registrations::select('candidate_id','candidates.passport_no','candidates.candidate_name',DB::raw('DATE_FORMAT(eno.created_at,"%d-%m-%Y") as eno_date'),'eno.screenshot','eno.eno', 'registrations.reg_id','registrations.serial_no','registrations.country','registrations.status','registrations.old_img')
                                ->join('candidates','candidates.id','registrations.candidate_id')
                                ->join('eno','eno.reg_id','registrations.reg_id')
                                ->where('center_id',$all->centre_id)
                                ->where('candidates.passport_no',$all->barcode)
                                ->orderBy('registrations.id','DESC')
                                ->first();

                if($check)
                {
                    if($check->screenshot)
                    {
                        $check->screenshot = asset('storage/app/public/eno_screenshots/'.$check->screenshot);
                    }
                }
                else
                {
                    $reg = Registrations::select('reg_id')
                                          ->join('candidates','candidates.id','registrations.candidate_id')
                                          ->where('center_id',$all->centre_id)
                                          ->where('candidates.passport_no',$all->barcode)
                                          ->orderBy('reg_date','DESC')
                                          ->first();

                    if($reg)
                    {

                        ENO::insert(array('centre_id' => $all->centre_id, 'reg_id' => $reg->reg_id));

                        $check = Registrations::select('candidate_id','candidates.passport_no','candidates.candidate_name',DB::raw('DATE_FORMAT(eno.created_at,"%d-%m-%Y") as eno_date'),'eno.screenshot','eno.eno', 'registrations.reg_id','registrations.serial_no','registrations.country','registrations.status')
                                        ->join('candidates','candidates.id','registrations.candidate_id')            
                                        ->join('eno','eno.reg_id','registrations.reg_id')
                                    ->where('center_id',$all->centre_id)
                                    ->where('candidates.passport_no',$all->barcode)
                                    ->orderBy('registrations.id','DESC')
                                    ->first();

                    }
                    else
                    {
                        return redirect()->json(['registration' => []], 200);
                    }
                }
            }
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
            elseif($all->process_id == 2)
            {
                $check2 = Medical::where('centre_id',$all->centre_id)->where('reg_id',$check->reg_id)->first();
            }
            elseif($all->process_id == 4)
            {
                $check2 = SampleCollection::where('centre_id',$all->centre_id)->where('reg_id',$check->reg_id)->first();
            }
            elseif($all->process_id == 'lab')
            {
                $check2 = LabResult::where('centre_id',$all->centre_id)->where('reg_id',$check->reg_id)->first();
            }
            elseif($all->process_id == 'lab_sticker')
            {
                $check2 = LabSticker::where('centre_id',$all->centre_id)->where('reg_id',$check->reg_id)->first();

                if($check2)
                {
                    if($check2->sticker_value_2 == NULL)
                    {
                        $input = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
                        $rand_keys = array_rand($input);
                        $random_code = rand(10,99);

                        $reg_id = $check2->reg_id;

                        if(strlen($reg_id) > 4)
                        {
                            $REGID = substr($reg_id, strlen($reg_id) - 4);
                        }
                        else
                        {
                            $REGID = $reg_id[1];
                        }

                        $random_string = $input[$rand_keys].$REGID.'-'.str_replace('-','',date('d-m-y',strtotime($check->reg_date)));
                        $check2->sticker_value_2 = $random_string;

                        LabSticker::where('centre_id',$all->centre_id)
                                  ->where('reg_id',$check->reg_id)
                                  ->update(
                                            array(
                                                    'sticker_value_2' => $random_string,
                                                    'sticker_read_by' => (isset($all->created_by)) ? $all->created_by : NULL
                                                )
                                        );
                    }
                }
            }

            $cand = Candidates::find($check->candidate_id);

            $check->passport_image = Registrations::get_passport_image($cand, $check);
            $check->candidate_image = Registrations::get_candidate_image($cand, $check);

            if($all->process_id == 'eno')
            {
                return response()->json(['registration' => $check], 200);
            }
            elseif($check2 && $all->process_id == 'lab')
            {
                return response()->json(['registration' => $check, 'verified' => $check2], 200);
            }
            elseif($check2 && $all->process_id == 'lab_sticker')
            {
                return response()->json(['registration' => $check, 'sticker_2' => $check2->sticker_value_2, 'attempts' => PrintLogs::where('centre_id',$all->centre_id)->where('print_value',$check2->sticker_value_2)->where('user_id',$all->created_by)->count()], 200);
            }
            elseif($check2 && $all->process_id != 2)
            {
                if($all->process_id == 4)
                {
                    if(strlen($check->reg_id) > 5)
                    {
                        $sticker_value_1 = $check->reg_date.substr($check->reg_id, strlen($check->reg_id) - 5);
                    }
                    else
                    {
                        $sticker_value_1 = $check->reg_date.$check->reg_id;
                    }
                    return response()->json(['registration' => $check, 'verified' => true, 'attempts' => PrintLogs::where('centre_id',$all->centre_id)->where('print_value',$sticker_value_1)->where('user_id',$all->searched_by)->count()], 200);
                }
                else
                {
                    return response()->json(['registration' => $check, 'verified' => true], 200);
                }
            }
            elseif($check2 && $all->process_id == 2)
            {
                return response()->json(['registration' => $check, 'medical' => $check2, 'verified' => true], 200);
            }
            elseif(!$check2 && $all->process_id == 'lab_sticker')
            {
                return response()->json(['registration' => $check, 'sticker_2' => false], 200);
            }
            else
            {
                return response()->json(['registration' => $check, 'verified' => false, 'attempts' => 0], 200);
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
                              ->orderBy('registrations.reg_date','DESC')
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
            $cand = Candidates::find($check->candidate_id);
            $check->place_of_issue = PlaceOfIssue::select('name as value','name as label')->where('name','LIKE','%'.$check->place_of_issue.'%')->first();
            $check->country = Country::select('name as value','name as label')->where('name','LIKE','%'.$check->country.'%')->first();
            $check->agency = Agency::select('name as value','name as label')->where('name','LIKE','%'.$check->agency.'%')->first();
            $check->profession = Profession::select('name as value','name as label')->where('name','LIKE','%'.$check->profession.'%')->first();

            $check->passport_image = Registrations::get_passport_image($cand, $check);
            $check->candidate_image = Registrations::get_candidate_image($cand, $check);

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

        $check = Registrations::select('registrations.*','candidates.*','registrations.status as reg_status')->join('candidates','candidates.id','registrations.candidate_id')
                            ->where('center_id',$all->centre_id)
                            ->where('passport_no',$all->passport_no)
                            ->latest('registrations.reg_date')
                            ->first();

        if($check)
        {

            $check->place_of_issue = PlaceOfIssue::select('name as value','name as label')->where('name','LIKE','%'.$check->place_of_issue.'%')->first();
            $check->country = Country::select('name as value','name as label')->where('name','LIKE','%'.$check->country.'%')->first();
            $check->agency = Agency::select('name as value','name as label')->where('name','LIKE','%'.$check->agency.'%')->first();
            $check->profession = Profession::select('name as value','name as label')->where('name','LIKE','%'.$check->profession.'%')->first();

            $check->passport_image = Registrations::get_passport_image(Candidates::find($check->candidate_id), $check);
            $check->candidate_image = Registrations::get_candidate_image(Candidates::find($check->candidate_id), $check);

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
            $insert->notes = (isset($all->notes)) ? $all->notes : NULL;
            $insert->created_by = (isset($all->created_by)) ? $all->created_by : NULL;
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
            $insert->created_by = (isset($all->created_by)) ? $all->created_by : NULL;
            $insert->save();

            QueueManager::where('token_no',$all->token_no)
                            ->where('center_id',$all->centre_id)
                            ->where('process_id',5)
                            ->update(array('status' => 'Completed'));
        }

        return response()->json(['message' => 'Verified'], 200);
    }

    public function collect_sample(request $request)
    {
        $all = json_decode($request->getContent());

        $check = SampleCollection::where('centre_id',$all->centre_id)->where('reg_id',$all->reg_id)->first();

        if(!$check)
        {
            $insert = new SampleCollection;
            $insert->centre_id = $all->centre_id;
            $insert->reg_id = $all->reg_id;
            $insert->notes = $all->notes;
            $insert->created_by = (isset($all->created_by)) ? $all->created_by : NULL;
            $insert->save();

            $insert2 = new LabSticker;
            $insert2->reg_id = $all->reg_id;
            $insert2->centre_id = $all->centre_id;
            if(strlen($all->reg_id) > 5)
            {
                $insert2->sticker_value_1 = $all->reg_date.substr($all->reg_id, strlen($all->reg_id) - 5);
            }
            else
            {
                $insert2->sticker_value_1 = $all->reg_date.$all->reg_id;
            }
            $insert2->save();

            QueueManager::where('token_no',$all->token_no)
                            ->where('center_id',$all->centre_id)
                            ->where('process_id',4)
                            ->update(array('status' => 'Completed'));
        }

        return response()->json(['message' => 'Verified'], 200);
    }

    public function store_lab_result(request $request)
    {
        $all = json_decode($request->getContent());

        $check = LabResult::where('centre_id',$all->centre_id)->where('reg_id',$all->reg_id)->first();

        if(!$check)
        {
            $insert = new LabResult;
            $insert->centre_id = $all->centre_id;
            $insert->reg_id = $all->reg_id;
            $insert->sugar = $all->data->sugar;
            $insert->albumin = $all->data->albumin;
            $insert->helminthes = $all->data->helminthes;
            $insert->ova = $all->data->ova;
            $insert->cyst = $all->data->cyst;
            $insert->tb = $all->data->tb;
            $insert->pregnancy = $all->data->pregnancy;
            $insert->polio = $all->data->polio;
            $insert->polio_date = ($all->data->polio == 'vaccinated') ? $all->data->polio_date : NULL;
            $insert->mmr1 = $all->data->mmr1;
            $insert->mmr1_date = ($all->data->mmr1 == 'vaccinated') ? $all->data->mmr1_date : NULL;
            $insert->mmr2 = $all->data->mmr2;
            $insert->mmr2_date = ($all->data->mmr2 == 'vaccinated') ? $all->data->mmr2_date : NULL;
            $insert->meningococcal = $all->data->meningococcal;
            $insert->meningococcal_date = ($all->data->meningococcal == 'vaccinated') ? $all->data->meningococcal_date : NULL;
            $insert->hcv = $all->data->hcv;
            $insert->hbsag = $all->data->hbsag;
            $insert->hiv = $all->data->hiv;
            $insert->vdrl = $all->data->vdrl;
            $insert->tpha = $all->data->tpha;
            $insert->rbs = $all->data->rbs;
            $insert->bil = $all->data->bil;
            $insert->alt = $all->data->alt;
            $insert->ast = $all->data->ast;
            $insert->alk = $all->data->alk;
            $insert->creatinine = $all->data->creatinine;
            $insert->blood_group = $all->data->blood_group;
            $insert->haemoglobin = $all->data->haemoglobin;
            $insert->malaria = $all->data->malaria;
            $insert->micro_filariae = $all->data->micro_filariae;
            $insert->status = ($all->data->hcv == 'positive' || $all->data->hiv == 'positive' || $all->data->hbsag == 'positive' || $all->data->vdrl == 'positive' || $all->data->tpha == 'positive') ? 'UNFIT' : 'FIT';
            $insert->created_by = (isset($all->data->created_by)) ? $all->data->created_by : NULL;
            if($insert->save())
            {
                $status_changing = $this->status_change($all->reg_id, $all->centre_id);
                return response()->json(['message' => 'Lab Result Stored'], 200);

            }
            else
            {
                return response()->json(['message' => 'Lab Result Not Stored'], 200);
            }
        }
        else
        {
            return response()->json(['message' => 'Lab Result Already Exists!'], 200);
        }
    }

    public function update_lab_result(request $request)
    {
        $all = json_decode($request->getContent());

        $check = LabResult::where('centre_id',$all->centre_id)->where('reg_id',$all->reg_id)->first();

        if(!$check)
        {
            return response()->json(['message' => 'Lab Result Not Found!'], 200);
        }
        else
        {
            $insert = LabResult::find($check->id);
            $insert->centre_id = $all->centre_id;
            $insert->reg_id = $all->reg_id;
            $insert->sugar = $all->data->sugar;
            $insert->albumin = $all->data->albumin;
            $insert->helminthes = $all->data->helminthes;
            $insert->ova = $all->data->ova;
            $insert->cyst = $all->data->cyst;
            $insert->tb = $all->data->tb;
            $insert->pregnancy = $all->data->pregnancy;
            $insert->polio = $all->data->polio;
            $insert->polio_date = ($all->data->polio == 'vaccinated') ? $all->data->polio_date : NULL;
            $insert->mmr1 = $all->data->mmr1;
            $insert->mmr1_date = ($all->data->mmr1 == 'vaccinated') ? $all->data->mmr1_date : NULL;
            $insert->mmr2 = $all->data->mmr2;
            $insert->mmr2_date = ($all->data->mmr2 == 'vaccinated') ? $all->data->mmr2_date : NULL;
            $insert->meningococcal = $all->data->meningococcal;
            $insert->meningococcal_date = ($all->data->meningococcal == 'vaccinated') ? $all->data->meningococcal_date : NULL;
            $insert->hcv = $all->data->hcv;
            $insert->hbsag = $all->data->hbsag;
            $insert->hiv = $all->data->hiv;
            $insert->vdrl = $all->data->vdrl;
            $insert->tpha = $all->data->tpha;
            $insert->rbs = $all->data->rbs;
            $insert->bil = $all->data->bil;
            $insert->alt = $all->data->alt;
            $insert->ast = $all->data->ast;
            $insert->alk = $all->data->alk;
            $insert->creatinine = $all->data->creatinine;
            $insert->blood_group = $all->data->blood_group;
            $insert->haemoglobin = $all->data->haemoglobin;
            $insert->malaria = $all->data->malaria;
            $insert->micro_filariae = $all->data->micro_filariae;
            $insert->status = ($all->data->hcv == 'positive' || $all->data->hiv == 'positive' || $all->data->hbsag == 'positive' || $all->data->vdrl == 'positive' || $all->data->tpha == 'positive') ? 'UNFIT' : 'FIT';
            
            $status_changing = $this->status_change($check->reg_id, $all->centre_id);

            if($insert->update())
            {
                return response()->json(['message' => 'Lab Result Updated'], 200);
            }
            else
            {
                return response()->json(['message' => 'Lab Result Not Updated'], 200);
            }
        }

        
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
            $insert->created_by = (isset($all->created_by)) ? $all->created_by : NULL;
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
        $new2->reg_id = ($new_reg) ? $new_reg->reg_id+1 : 1;
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
        $new2->print_report_portion = 'A-B';
        $new2->created_by = (isset($all->data->created_by)) ? $all->data->created_by : NULL;

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
            elseif(is_string($all->passport_image) && $all->passport_image != NULL)
            {
                Storage::putFileAs('public/candidate_passport', $all->passport_image, strtotime($created).'.jpg');
                File::delete($all->passport_image);
            }

            $new2->save();

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
                                            'pregnancy_test' => $all->candidate->pregnancy_test,
                                            'print_report_portion' => 'A-B'
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
                    $new->created_by = (isset($all->created_by)) ? $all->created_by : NULL;
                    if($all->chest == "lung fields clear")
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
                        $status_changing = $this->status_change($check->reg_id, $check->center_id);
                        QueueManager::where('token_no',$check->token_no)
                                ->where('center_id',$all->centre_id)
                                ->where('process_id',3)
                                ->update(array('status' => 'Completed'));
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

                $status_changing = $this->status_change($check->reg_id, $check->centre_id);

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

    public function store_medical_result(Request $request)
    {
        $all = json_decode($request->getContent());

        $check = Registrations::where('center_id',$all->centre_id)
                              ->where('serial_no',$all->serial_no)
                              ->where('reg_date',$all->date)
                              ->first();
        if($check)
        {
            $check2 = Medical::where('centre_id',$all->centre_id)
                              ->where('reg_id',$check->reg_id)
                              ->first();

            if($check2)
            {
                return response()->json(['message' => 'Medical Result already exists!'], 200);
            }
            else
            {
                $new = new Medical;
                $new->centre_id = $all->centre_id;
                $new->reg_id = $check->reg_id;
                $new->height = $all->data->height;
                $new->weight = $all->data->weight;
                $new->bmi = $all->data->bmi;
                $new->bp = $all->data->bp;
                $new->pulse = $all->data->pulse;
                $new->rr = $all->data->rr;
                $new->distant_aided_right_eye = $all->data->distant_aided_right_eye;
                $new->distant_aided_left_eye = $all->data->distant_aided_left_eye;
                $new->distant_unaided_right_eye = $all->data->distant_unaided_right_eye;
                $new->distant_unaided_left_eye = $all->data->distant_unaided_left_eye;
                $new->near_aided_right_eye = $all->data->near_aided_right_eye;
                $new->near_aided_left_eye = $all->data->near_aided_left_eye;
                $new->near_unaided_right_eye = $all->data->near_unaided_right_eye;
                $new->near_unaided_left_eye = $all->data->near_unaided_left_eye;
                $new->color_vision = $all->data->color_vision;
                $new->hearing_right_ear = $all->data->hearing_right_ear;
                $new->hearing_left_ear = $all->data->hearing_left_ear;
                $new->appearance = $all->data->appearance;
                $new->speech = $all->data->speech;
                $new->behavior = $all->data->behavior;
                $new->cognition = $all->data->cognition;
                $new->orientation = $all->data->orientation;
                $new->memory = $all->data->memory;
                $new->concentration = $all->data->concentration;
                $new->mood = $all->data->mood;
                $new->thoughts = $all->data->thoughts;
                $new->other = $all->data->other;
                $new->general_appearance = $all->data->general_appearance;
                $new->cardiovascular = $all->data->cardiovascular;
                $new->respiratory = $all->data->respiratory;
                $new->abdomen = $all->data->abdomen;
                $new->hernia = $all->data->hernia;
                $new->hydrocele = $all->data->hydrocele;
                $new->extremities = $all->data->extremities;
                $new->back = $all->data->back;
                $new->skin = $all->data->skin;
                $new->cns = $all->data->cns;
                $new->deformities = $all->data->deformities;
                $new->remarks = $all->data->remarks;
                $new->ent = $all->data->ent;
                $new->status = $all->data->status;
                $new->created_by = (isset($all->data->created_by)) ? $all->data->created_by : NULL;

                if($new->save())
                {
                    $status_changing = $this->status_change($check->reg_id, $all->centre_id);
                    QueueManager::where('token_no',$check->token_no)
                                ->where('center_id',$all->centre_id)
                                ->where('process_id',2)
                                ->update(array('status' => 'Completed'));
                    return response()->json(['message' => 'Medical Result has been saved!'], 200);
                }
                else
                {
                    return response()->json(['message' => 'Medical Result has not been saved'], 500);
                }
            }

        }
        else
        {
            return response()->json(['message' => 'Registration Not Found'], 404);
        }
    }

    public function update_medical_result(Request $request)
    {
        $all = json_decode($request->getContent());

        $check = Registrations::where('center_id',$all->centre_id)
                              ->where('serial_no',$all->serial_no)
                              ->where('reg_date',$all->date)
                              ->first();
        if($check)
        {
            $check2 = Medical::where('centre_id',$all->centre_id)
                              ->where('reg_id',$check->reg_id)
                              ->first();

            if(!$check2)
            {
                return response()->json(['message' => 'Medical Result does not exist!'], 200);
            }
            else
            {
                $new = Medical::find($check2->id);
                $new->centre_id = $all->centre_id;
                $new->reg_id = $check->reg_id;
                $new->height = $all->data->height;
                $new->weight = $all->data->weight;
                $new->bmi = $all->data->bmi;
                $new->bp = $all->data->bp;
                $new->pulse = $all->data->pulse;
                $new->rr = $all->data->rr;
                $new->distant_aided_right_eye = $all->data->distant_aided_right_eye;
                $new->distant_aided_left_eye = $all->data->distant_aided_left_eye;
                $new->distant_unaided_right_eye = $all->data->distant_unaided_right_eye;
                $new->distant_unaided_left_eye = $all->data->distant_unaided_left_eye;
                $new->near_aided_right_eye = $all->data->near_aided_right_eye;
                $new->near_aided_left_eye = $all->data->near_aided_left_eye;
                $new->near_unaided_right_eye = $all->data->near_unaided_right_eye;
                $new->near_unaided_left_eye = $all->data->near_unaided_left_eye;
                $new->color_vision = $all->data->color_vision;
                $new->hearing_right_ear = $all->data->hearing_right_ear;
                $new->hearing_left_ear = $all->data->hearing_left_ear;
                $new->appearance = $all->data->appearance;
                $new->speech = $all->data->speech;
                $new->behavior = $all->data->behavior;
                $new->cognition = $all->data->cognition;
                $new->orientation = $all->data->orientation;
                $new->memory = $all->data->memory;
                $new->concentration = $all->data->concentration;
                $new->mood = $all->data->mood;
                $new->thoughts = $all->data->thoughts;
                $new->other = $all->data->other;
                $new->general_appearance = $all->data->general_appearance;
                $new->cardiovascular = $all->data->cardiovascular;
                $new->respiratory = $all->data->respiratory;
                $new->abdomen = $all->data->abdomen;
                $new->hernia = $all->data->hernia;
                $new->hydrocele = $all->data->hydrocele;
                $new->extremities = $all->data->extremities;
                $new->back = $all->data->back;
                $new->skin = $all->data->skin;
                $new->cns = $all->data->cns;
                $new->deformities = $all->data->deformities;
                $new->remarks = $all->data->remarks;
                $new->ent = $all->data->ent;
                $new->status = $all->data->status;

                if($new->update())
                {
                    $status_changing = $this->status_change($check->reg_id, $all->centre_id);
                    return response()->json(['message' => 'Medical Result has been updated!!'], 200);
                }
                else
                {
                    return response()->json(['message' => 'Medical Result has not been updated!'], 500);
                }
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

        $check = Registrations::select('registrations.created_at as reg_created_at', 'candidates.created_at',
                                        'candidates.candidate_name',
                                        'registrations.relative_name',
                                        'candidates.passport_no',
                                        'registrations.cnic',
                                        'registrations.old_img',
                                        'registrations.candidate_id',
                                        'registrations.reg_id',
                                        'registrations.country',
                                        'registrations.reg_date',
                                        'registrations.serial_no',
                                        'registrations.barcode_no',
                                        'registrations.status as reg_status','users.name as reg_by','print_report_portion')
                                ->join('candidates','candidates.id','registrations.candidate_id')
                                ->leftjoin('users','users.id','registrations.created_by')
                              ->where('center_id',$all->centre_id)
                              ->where('serial_no',$all->serial_no)
                              ->where('reg_date',$all->reg_date)
                              ->first();

        if($check)
        {

            $check->lab_stickers = LabSticker::select('lab_sticker.*','ls.name as lab_sticker_by')
                                           ->leftjoin('users as ls','ls.id','lab_sticker.sticker_read_by')
                                           ->where('reg_id',$check->reg_id)
                                           ->where('centre_id',$all->centre_id)
                                           ->first();
            $check->lab_result = LabResult::select('lab_result.*','users.name as lab_result_by')
                                        ->leftjoin('users','users.id','lab_result.created_by')
                                        ->where('reg_id',$check->reg_id)
                                        ->where('centre_id',$all->centre_id)
                                        ->first();
            $check->xray_verification = XrayVerification::select('xray_verification.*','users.name as xray_verification_by')
                                                      ->leftjoin('users','users.id','xray_verification.created_by')
                                                         ->where('reg_id',$check->reg_id)
                                                         ->where('centre_id',$all->centre_id)
                                                         ->first();
            $check->xray_result = XrayResult::select('xray_result.*','users.name as xray_result_by')
                                          ->leftjoin('users','users.id','xray_result.created_by')
                                          ->where('reg_id',$check->reg_id)
                                          ->where('centre_id',$all->centre_id)
                                          ->first();
            $check->medical = Medical::select('medical.*','users.name as medical_by')
                                   ->leftjoin('users','users.id','medical.created_by')
                                      ->where('reg_id',$check->reg_id)
                                      ->where('centre_id',$all->centre_id)
                                      ->first();
            $check->sample_collection = SampleCollection::select('sample_collection.*','users.name as sample_collected_by')
                                                      ->leftjoin('users','users.id','sample_collection.created_by')
                                                      ->where('reg_id',$check->reg_id)
                                                      ->where('centre_id',$all->centre_id)
                                                      ->first();
            $check->pp_check = PassportVerification::select('passport_verification.*','users.name as pp_check_by')
                                                  ->leftjoin('users','users.id','passport_verification.created_by')
                                                  ->where('reg_id',$check->reg_id)
                                                  ->where('centre_id',$all->centre_id)
                                                  ->first();
            $check->report_issue = ReportIssue::select('report_issue.*','users.name as report_issue_by')
                                                  ->leftjoin('users','users.id','report_issue.created_by')
                                                  ->where('reg_id',$check->reg_id)
                                                  ->where('centre_id',$all->centre_id)
                                                  ->first();
            if($check->lab_result != NULL && $check->medical != NULL && $check->xray_result != NULL && $check->reg_status != 'Pending')
            {
                $check->print_report_portion = ($check->print_report_portion != 'B') ? 'A' : $check->print_report_portion;
                if($check->lab_result->status == 'UNFIT' || $check->medical == 'UNFIT' || $check->xray_result == 'UNFIT')
                {
                    $check->reg_status = 'UNFIT';

                    Registrations::where('center_id',$all->centre_id)
                              ->where('serial_no',$all->serial_no)
                              ->where('reg_date',$all->reg_date)
                              ->update(array('status' => 'UNFIT','print_report_portion' => $check->print_report_portion));
                }
                elseif($check->lab_result->status == 'In Process' || $check->medical->status == 'In Process' || $check->xray_result->status == 'In Process')
                {
                    $check->reg_status = 'In Process';

                    Registrations::where('center_id',$all->centre_id)
                              ->where('serial_no',$all->serial_no)
                              ->where('reg_date',$all->reg_date)
                              ->update(array('status' => 'In Process','print_report_portion' => $check->print_report_portion));
                }
                elseif($check->lab_result->status == 'FIT' && $check->medical->status == 'FIT' && $check->xray_result->status == 'FIT')
                {
                    $check->reg_status == 'FIT';
                    Registrations::where('center_id',$all->centre_id)
                              ->where('serial_no',$all->serial_no)
                              ->where('reg_date',$all->reg_date)
                              ->update(array('status' => 'FIT','print_report_portion' => $check->print_report_portion));
                }
            }
            $check->history = Registrations::select('registrations.*')
                                           ->where('candidate_id',$check->candidate_id)
                                           ->where('registrations.reg_id','!=',$check->reg_id)
                                           ->where('center_id',$all->centre_id)
                                           ->orderBy('reg_date')
                                           ->get();

            foreach($check->history as $hist)
            {
                $hist->xray = Registrations::get_xray_result($all->centre_id, $hist->reg_id);

                if($hist->xray)
                {
                    $hist->xray_remarks = $hist->xray->notes;
                }

                $hist->medical = Registrations::get_medical($all->centre_id, $hist->reg_id);

                if($hist->medical)
                {
                    $hist->medical_remarks = $hist->medical->remarks;
                }
            }

            $check->passport_image = Registrations::get_passport_image(Candidates::find($check->candidate_id), $check);
            $check->candidate_image = Registrations::get_candidate_image(Candidates::find($check->candidate_id), $check);

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

        $check = Registrations::select('registrations.created_at as reg_created_at', 'candidates.created_at',
                                       'candidates.candidate_name',
                                       'registrations.relative_name',
                                       'candidates.passport_no',
                                       'registrations.cnic',
                                       'registrations.old_img',
                                       'registrations.candidate_id',
                                       'registrations.reg_id',
                                       'registrations.country',
                                       'registrations.reg_date',
                                       'registrations.serial_no',
                                       'registrations.barcode_no',
                                       'registrations.status as reg_status','users.name as reg_by','print_report_portion')
                            ->join('candidates','candidates.id','registrations.candidate_id')
                            ->leftjoin('users','users.id','registrations.created_by')
                            ->where('center_id',$all->centre_id)
                            ->where('passport_no',$all->passport_no)
                            ->orderBy('reg_id','DESC')
                            ->first();

        if($check)
        {

            $check->lab_stickers = LabSticker::select('lab_sticker.*','ls.name as lab_sticker_by')
                                           ->leftjoin('users as ls','ls.id','lab_sticker.sticker_read_by')
                                           ->where('reg_id',$check->reg_id)
                                           ->where('centre_id',$all->centre_id)
                                           ->first();
            $check->lab_result = LabResult::select('lab_result.*','users.name as lab_result_by')
                                        ->leftjoin('users','users.id','lab_result.created_by')
                                        ->where('reg_id',$check->reg_id)
                                        ->where('centre_id',$all->centre_id)
                                        ->first();
            $check->xray_verification = XrayVerification::select('xray_verification.*','users.name as xray_verification_by')
                                                      ->leftjoin('users','users.id','xray_verification.created_by')
                                                         ->where('reg_id',$check->reg_id)
                                                         ->where('centre_id',$all->centre_id)
                                                         ->first();
            $check->xray_result = XrayResult::select('xray_result.*','users.name as xray_result_by')
                                          ->leftjoin('users','users.id','xray_result.created_by')
                                          ->where('reg_id',$check->reg_id)
                                          ->where('centre_id',$all->centre_id)
                                          ->first();
            $check->medical = Medical::select('medical.*','users.name as medical_by')
                                   ->leftjoin('users','users.id','medical.created_by')
                                      ->where('reg_id',$check->reg_id)
                                      ->where('centre_id',$all->centre_id)
                                      ->first();
            $check->sample_collection = SampleCollection::select('sample_collection.*','users.name as sample_collected_by')
                                                      ->leftjoin('users','users.id','sample_collection.created_by')
                                                      ->where('reg_id',$check->reg_id)
                                                      ->where('centre_id',$all->centre_id)
                                                      ->first();
            $check->pp_check = PassportVerification::select('passport_verification.*','users.name as pp_check_by')
                                                  ->leftjoin('users','users.id','passport_verification.created_by')
                                                  ->where('reg_id',$check->reg_id)
                                                  ->where('centre_id',$all->centre_id)
                                                  ->first();
            $check->report_issue = ReportIssue::select('report_issue.*','users.name as report_issue_by')
                                                  ->leftjoin('users','users.id','report_issue.created_by')
                                                  ->where('reg_id',$check->reg_id)
                                                  ->where('centre_id',$all->centre_id)
                                                  ->first();
            if($check->lab_result != NULL && $check->medical != NULL && $check->xray_result != NULL && $check->reg_status != 'Pending')
            {
                $check->print_report_portion = ($check->print_report_portion != 'B') ? 'A' : $check->print_report_portion;
                if($check->lab_result->status == 'UNFIT' || $check->medical->status == 'UNFIT' || $check->xray_result->status == 'UNFIT')
                {
                    $check->reg_status = 'UNFIT';

                    Registrations::where('center_id',$all->centre_id)
                              ->where('serial_no',$check->serial_no)
                              ->where('reg_date',$check->reg_date)
                              ->update(array('status' => 'UNFIT','print_report_portion' => $check->print_report_portion));
                }
                elseif($check->lab_result->status == 'In Process' || $check->medical->status == 'In Process' || $check->xray_result->status == 'In Process')
                {
                    $check->reg_status = 'In Process';

                    Registrations::where('center_id',$all->centre_id)
                              ->where('serial_no',$check->serial_no)
                              ->where('reg_date',$check->reg_date)
                              ->update(array('status' => 'In Process','print_report_portion' => $check->print_report_portion));
                }
                else
                {
                    $check->reg_status == 'FIT';
                    Registrations::where('center_id',$all->centre_id)
                              ->where('serial_no',$check->serial_no)
                              ->where('reg_date',$check->reg_date)
                              ->update(array('status' => 'FIT','print_report_portion' => $check->print_report_portion));
                }
            }
            $check->history = Registrations::select('registrations.*')
                                           ->where('candidate_id',$check->candidate_id)
                                           ->where('registrations.reg_id','!=',$check->reg_id)
                                           ->where('center_id',$all->centre_id)
                                           ->orderBy('reg_date')
                                           ->get();

            foreach($check->history as $hist)
            {
                $hist->xray = Registrations::get_xray_result($all->centre_id, $hist->reg_id);

                if($hist->xray)
                {
                    $hist->xray_remarks = $hist->xray->notes;
                }

                $hist->medical = Registrations::get_medical($all->centre_id, $hist->reg_id);

                if($hist->medical)
                {
                    $hist->medical_remarks = $hist->medical->remarks;
                }
            }

            $check->passport_image = Registrations::get_passport_image(Candidates::find($check->candidate_id), $check);
            $check->candidate_image = Registrations::get_candidate_image(Candidates::find($check->candidate_id), $check);

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
                           ->latest('registrations.reg_date')
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
            $pdf->Cell(0,6,'Phone: '.$centre->phone.', Fax: '.$centre->fax,0,1,'C');
            $pdf->Cell(0,6,'Email: '.$centre->email,0,1,'C');
            $pdf->Ln(6);
            $pdf->SetFont('Arial','B',14);
            $pdf->SetX(20);
            $pdf->Cell(60,1,'Date:'.date('d-m-Y',strtotime($reg->reg_date)),0,0,'C');
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
            $barcodeBase = $d->getBarcodePNG($reg->barcode_no, 'C39+', 2,60,array(2,2,2));
            $base64_data = $barcodeBase;
            $decoded_data = base64_decode($base64_data);

            file_put_contents("temp_image.png", $decoded_data);
            $pdf->Cell(110,7,$pdf->Image("temp_image.png"),70,22);
            $pdf->SetX(140);
            $pdf->Cell(1,7,$reg->barcode_no,70,22);
            $pdf->SetX(15);
            $pdf->Ln(10);
            $pdf->Cell(4,10,".............................................................................................................................................................................", 0, 1);
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
            $pdf->Cell(120,7,date('d-m-Y',strtotime($reg->reg_date)),1,1,'L');
            $pdf->SetX(15);
            $pdf->Cell(60,7,'Profession',1,0,'L');
            $pdf->Cell(120,7,$reg->profession,1,1,'L');
            $pdf->SetX(15);
            $pdf->Cell(60,7,'Finger Type',1,0,'L');
            $pdf->Cell(120,7,$reg->finger_type,1,1,'L');



            $pdf->Ln(14);
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
        $new2->agency = (isset($all->data->agency->value)) ? $all->data->agency->value : NULL;
        $new2->country = (isset($all->data->country->value)) ? $all->data->country->value : NULL;
        $new2->profession = (isset($all->data->profession->value)) ? $all->data->profession->value : NULL;
        $new2->cnic = $all->data->cnic;
        $new2->place_of_issue = (isset($all->data->place_of_issue->value)) ? $all->data->place_of_issue->value : NULL;
        $new2->reg_date = $all->data->reg_date;
        $new2->barcode_no = $all->barcode;
        $new2->serial_no = $all->data->serial_no;
        $new2->relation_type = $all->data->relation_type;
        $new2->relative_name = $all->data->relative_name;
        $new2->slip_issue_date = $all->data->slip_issue_date;
        $new2->slip_expiry_date = $all->data->slip_expiry_date;
        $new2->phone_1 = $all->data->phone_1;
        $new2->phone_2 = $all->data->phone_2;
        $new2->nationality = $all->data->nationality;
        $new2->marital_status = $all->data->marital_status;
        if($all->fingerprint != '' && $all->fingerprint != NULL)
        {
            $new2->biometric_fingerprint = $all->fingerprint;
        }
        $new2->fee_charged = $all->data->fee_charged;
        $new2->discount = $all->data->discount;
        $new2->remarks = $all->data->remarks;
        $new2->pregnancy_test = $all->data->pregnancy_test;
        $new2->finger_type = $all->data->finger_type;
        $new2->token_no = $all->data->token_no;
        $new2->created_by = (isset($all->created_by)) ? $all->created_by : NULL;
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

            QueueManager::where('token_no',$all->token_no)
                        ->where('center_id',$all->centre_id)
                        ->where('process_id',1)
                        ->update(array('status' => 'Completed'));

            return response()->json(['message' => 'Registered'], 200);
    }

    public function update_registration_portion(request $request)
    {
        $all = json_decode($request->getContent());

        $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                            ->where('center_id',$all->centre_id)
                            ->where('reg_id',$all->reg_id)
                            ->update(array('print_report_portion' => $all->portion));

        if($check)
        {
            return response()->json(['message' => 'Updated Portion'], 200);
        }
        else
        {
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function update_registration_status(request $request)
    {
        $all = json_decode($request->getContent());

        $check = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                            ->where('center_id',$all->centre_id)
                            ->where('reg_id',$all->reg_id)
                            ->update(array('registrations.status' => $all->status));

        if($check)
        {
            return response()->json(['message' => 'Updated Status'], 200);
        }
        else
        {
            return response()->json(['message' => 'Error'], 500);
        }
    }

    public function print_sticker(request $request)
    {
        // Retrieve label data from the request
        $labelData = "a981720240223";

        // Format label data as ZPL commands
        $zplCommands = $this->formatLabelAsZPL($labelData);

        // Send ZPL commands to the printer
        $out = $this->sendToPrinter($zplCommands);

        // Return a response indicating success
        return response()->json(['message' => $out]);
    }

    private function formatLabelAsZPL($labelData)
    {
        // Format label data as ZPL commands (replace this with your actual logic)
        // Example: Concatenate label data with ZPL command syntax
        $zplCommands = "^XA^FO100,100^FD{$labelData}^FS^XZ";

        return $zplCommands;
    }

    private function sendToPrinter($zplCommands)
    {
        // Replace 'printer_name' with the name of your printer
        $printerName = 'TSC TTP-244 Pro';

        // Use lp command to send ZPL commands to the printer
        // -d specifies the printer name
        // -o raw sends raw data to the printer
        // -l specifies the length of the print job
        $command = "lp -d $printerName -o raw -l <<< '$zplCommands'";

        // Execute the command
        $output = shell_exec($command);

        // Log any output or errors for debugging (optional)
        if ($output !== null) {
            // Log successful print job
            \Log::info("Label printed successfully: $output");
        } else {
            // Log error if the print job failed
            \Log::error("Failed to print label: $output");
        }

        return $output;
    }

    public function export_final_report(request $request)
    {
        $all = json_decode($request->getContent());

        $centre = Centres::find($all->centre_id);

        $reg = Registrations::select('registrations.*','registrations.status as final_status','candidates.*')->join('candidates','candidates.id','registrations.candidate_id')
                           ->where('barcode_no',$all->barcode_no)
                           ->where('center_id',$all->centre_id)
                           ->latest('registrations.reg_date')
                           ->first();

        $medical = Medical::where('centre_id',$all->centre_id)->where('reg_id',$reg->reg_id)->first();
        $lab = LabResult::where('centre_id',$all->centre_id)->where('reg_id',$reg->reg_id)->first();
        $xray = XrayResult::where('centre_id',$all->centre_id)->where('reg_id',$reg->reg_id)->first();


            $pdf = new Fpdf();
            $pdf->AddPage('P', 'A4', '0');

            $pdf->SetFont('Arial','', 11);
            // $pdf->Ln(16);

            // Title
            $pdf->SetFont('Arial','',12);
            $pdf->Cell(40,40,$pdf->Image(asset('storage/app/public/centres/logos/'.$centre->image),$pdf->GetX(),$pdf->GetY(),26,16),0,0,'L',false);

            if($reg->status=="FIT" || ($medical->status == 'FIT' && $lab->status == 'FIT' && $xray->status == 'FIT')){
                $pdf->Cell(40, 40, $pdf->Image(asset('storage/app/public/status_pic/FIT.PNG'),$pdf->GetX(), $pdf->GetY() +40, 180, 100), 0, 0, 'L', false);
            }elseif($reg->status=="UNFIT"  || ($medical->status == 'UNFIT' || $lab->status == 'UNFIT' || $xray->status == 'UNFIT')){
                $pdf->Cell(40, 40, $pdf->Image(asset('storage/app/public/status_pic/UNFIT.PNG'),$pdf->GetX(), $pdf->GetY() +40, 180, 100), 0, 0, 'L', false);
            }
            $pdf->Cell(105,5,'G.H.C. Code '.$centre->code,0,1,'R');
            $pdf->SetFont('Arial','',16);
            $pdf->SetX(75);
            $pdf->Cell(0,5,strtoupper($reg->country),0,1,'L');
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(0,5,'Date examined: '.date('d-m-Y',strtotime($reg->reg_date)).'',0,1,'R');
            $pdf->Ln(1);

            $pdf->SetFont('Arial','B',12);
            $pdf->Cell(160,7,'CANDIDATE INFORMATION',1,0,'C');
            
            $assetUrl = Registrations::get_candidate_image(Candidates::find($reg->candidate_id), $reg);
            
            $pdf->Cell(40,7,$pdf->Image($assetUrl,$pdf->GetX(),$pdf->GetY(),30.78,31),0,1,'L',false);
            $pdf->SetFont('Arial','',9);
            $pdf->Cell(16,6,'Name',1,0,'L');
            $pdf->Cell(50,6,$reg->candidate_name,1,0,'L');
            $pdf->Cell(8,6,$reg->relation_type,1,0,'L');
            $pdf->Cell(56,6,$reg->relative_name,1,0,'L');
            $pdf->Cell(15,6,'Serial no',1,0,'L');
            $pdf->Cell(15,6,$reg->serial_no,1,1,'L');
            $pdf->Cell(20,6,'Passport no',1,0,'L');
            $pdf->Cell(36,6,$reg->passport_no,1,0,'L');
            $pdf->Cell(10,6,'DOB',1,0,'L');
            $pdf->Cell(23,6,date('d-m-Y',strtotime($reg->dob)),1,0,'L');
            $pdf->Cell(23,6,'Place of issue',1,0,'L');
            $pdf->Cell(48,6,$reg->place_of_issue,1,1,'L');
            $pdf->Cell(24,6,'Passport expiry',1,0,'L');
            $pdf->Cell(22,6,$reg->passport_expiry_date,1,0,'L');
            $pdf->Cell(23,6,'Marital status',1,0,'L');
            $pdf->Cell(22,6,$reg->marital_status,1,0,'L');
            $pdf->Cell(19,6,'Nationality',1,0,'L');
            $pdf->Cell(50,6,$reg->nationality,1,1,'L');
            $pdf->Cell(18,6,'Profession',1,0,'L');
            $pdf->Cell(48,6,$reg->profession,1,0,'L');
            $pdf->Cell(23,6,'Gender',1,0,'L');
            $pdf->Cell(20,6,$reg->gender,1,0,'L');
            $pdf->Cell(19,6,'ID CARD #',1,0,'L');
            $pdf->Cell(32,6,$reg->cnic,1,1,'L');

            // MEDICAL EXAMINATION: GENERAL
            $pdf->SetFont('Arial','B',10);
            $pdf->Cell(116,5,'MEDICAL EXAMINATION: GENERAL',1,0,'C');

            // INVESTIGATION
            $pdf->Cell(75,5,'INVESTIGATION',1,1,'C');

            // MEDICAL EXAMINATION: GENERAL
            $pdf->SetFont('Arial','',10);
            $pdf->Cell(19,5,'Height',1,0,'L');
            $pdf->Cell(20,5,$medical->height,1,0,'L');
            $pdf->Cell(19,5,'Weight',1,0,'L');
            $pdf->Cell(20,5,$medical->weight,1,0,'L');
            $pdf->Cell(18,5,'BMI',1,0,'L');
            $pdf->Cell(20,5,$medical->bmi,1,0,'L');

            // INVESTIGATION
            $pdf->Cell(25,5,'Chest X-Ray',1,0,'L');
            $pdf->SetFont('Arial','',8);
            $pdf->Cell(50,5,$xray->chest,1,1,'L');
            $pdf->SetFont('Arial','',10);
            // MEDICAL EXAMINATION: GENERAL
            $pdf->Cell(19,5,'B.P.',1,0,'L');
            $pdf->Cell(20,5,$medical->bp,1,0,'L');
            $pdf->Cell(19,5,'Pulse',1,0,'L');
            $pdf->Cell(20,5,$medical->pulse,1,0,'L');
            $pdf->Cell(18,5,'RR',1,0,'L');
            $pdf->Cell(20,5,$medical->rr,1,0,'L');

            // LABORATORY Investigation Cell
            $pdf->SetFont('Arial','B',10);
            $pdf->Cell(75,5,'LABORATORY INVESTIGATION',1,1,'C');

            // MEDICAL EXAMINATION: GENERAL
            $pdf->SetFont('Arial','B',11);
            $pdf->Cell(34,10,'Visual activity',1,0,'C');
            $pdf->SetFont('Arial','B',9);
            $pdf->Cell(38,5,'Unaided',1,0,'C');
            $pdf->Cell(38,5,'Aided',1,0,'C');

            // TYPE OF LAB Investigation Cell
            $pdf->SetFont('Arial','B',9);
            $pdf->Cell(50,5,'TYPE OF LAB INVESTIGATION',1,0,'C');
            $pdf->Cell(31,5,'RESULTS',1,0,'L');
            $pdf->Ln(5);

            $pdf->SetFont('Arial','',11);
            $pdf->Cell(34,5,'',0,0,'L');
            //  Unaided
            $pdf->Cell(20,5,'Rt.Eye',1,0,'C');
            $pdf->Cell(18,5,'Lt.Eye',1,0,'C');
            //  Aided
            $pdf->Cell(20,5,'Rt.Eye',1,0,'C');
            $pdf->Cell(18,5,'Lt.Eye',1,0,'C');
            // TYPE OF LAB Investigation Cell
            $pdf->SetFont('Arial','',9);
            $pdf->Cell(50,5,'BLOOD GROUP',1,0,'L');
            $pdf->Cell(31,5,$lab->blood_group,1,1,'L');

            // MEDICAL EXAMINATION: GENERAL Distant
            $pdf->Cell(34,5,'Distant',1,0,'L');
            //  Unaided
            $pdf->Cell(20,5,$lab->distant_unaided_right_eye.'/6',1,0,'C');
            $pdf->Cell(18,5,$lab->distant_unaided_left_eye.'/6',1,0,'C');
            // Aided
            $pdf->Cell(20,5,$lab->distant_aided_right_eye.'',1,0,'C');
            $pdf->Cell(18,5,$lab->distant_aided_left_eye.'',1,0,'C');

            // TYPE OF LAB Investigation Cell
            $pdf->Cell(50,5,'HAEMOGLOBIN',1,0,'L');
            $pdf->Cell(31,5,$lab->haemoglobin,1,1,'L');

            // MEDICAL EXAMINATION: GENERAL Near
            $pdf->Cell(34,5,'Near',1,0,'L');
            //  Unaided
            $pdf->Cell(20,5,$lab->near_unaided_right_eye.'/20',1,0,'C');
            $pdf->Cell(18,5,$lab->near_unaided_left_eye.'/20',1,0,'C');
            //  Aided
            $pdf->Cell(20,5,$lab->near_aided_right_eye,1,0,'C');
            $pdf->Cell(18,5,$lab->near_aided_left_eye,1,0,'C');

            // TYPE OF LAB Investigation Cell
            $pdf->Cell(81,5,'THICK FILM FOR',1,1,'L');

            // MEDICAL EXAMINATION: GENERAL Color Vision
            $pdf->Cell(34,5,'Color Vision',1,0,'L');
            $pdf->Cell(76,5,$lab->color_vision,1,0,'L');
            // $pdf->Cell(25,6,'Doubtful',1,0,'C');
            // $pdf->Cell(27,6,'Defective',1,0,'C');

            // TYPE OF LAB Investigation Cell
            $pdf->SetFont('Arial','',9);
            $pdf->Cell(50,5,'1. MALARIA',1,0,'L');
            $pdf->Cell(31,5,$lab->malaria,1,1,'L');

            // MEDICAL EXAMINATION: GENERAL
            $pdf->SetFont('Arial','B',11);
            $pdf->Cell(34,10,'Hearing',1,0,'C');
            $pdf->SetFont('Arial','B',9);
            $pdf->Cell(38,5,'Rt.Ear',1,0,'C');
            $pdf->Cell(38,5,'Lt.Ear',1,0,'C');

            // TYPE OF LAB Investigation Cell
            $pdf->SetFont('Arial','',9);
            $pdf->Cell(50,5,'2. MICRO FILARIA',1,0,'L');
            $pdf->Cell(31,5,$lab->micro_filariae,1,1,'L');

            // MEDICAL EXAMINATION: GENERAL
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(34,5,'',0,0,'L');
            $pdf->Cell(38,5,$lab->hearing_right_ear,1,0,'C');
            $pdf->Cell(38,5,$lab->hearing_left_ear,1,0,'C');

            // BIOCHEMISTRY
            $pdf->SetFont('Arial','B',9);
            $pdf->Cell(81,5,'BIOCHEMISTRY',1,0,'L');
            $pdf->Ln(5);

            // MEDICAL EXAMINATION: SYSTEMIC
            $pdf->SetFont('Arial','B',10);
            $pdf->Cell(72,5,'MEDICAL EXAMINATION: Systemic',1,0,'L');
            $pdf->Cell(38,5,'FINDINGS',1,0,'C');

            // TYPE OF LAB Investigation Cell
            $pdf->SetFont('Arial','',9);
            $pdf->Cell(50,5,'R.B.S',1,0,'L');
            $pdf->Cell(31,5,$lab->rbs,1,1,'L');

            // MEDICAL EXAMINATION: SYSTEMIC
            $pdf->SetFont('Arial','',8);
            $pdf->Cell(72,5,'GENERAL APPEARANCE',1,0,'L');
            $pdf->Cell(38,5,$lab->general_appearance,1,0,'C');

            // BIOCHEMISTRY
            $pdf->SetFont('Arial','',9);
            $pdf->Cell(12,5,'L.F.T',1,0,'L');
            $pdf->SetFont('Arial','',9);
            $pdf->Cell(69,5,'BIL:'.$lab->bil.'mg/dl, ALT:'.$lab->alt.'U/L, AST:'.$lab->ast.'U/L, ALK:'.$lab->alk.'',1,1,'L');

            // MEDICAL EXAMINATION: SYSTEMIC
            $pdf->SetFont('Arial','',8);
            $pdf->Cell(72,5,'CARDIOVASCULAR',1,0,'L');
            $pdf->Cell(38,5,$medical->cardiovascular,1,0,'C');

            // TYPE OF LAB Investigation Cell
            $pdf->Cell(50,5,'CREATININE',1,0,'L');
            $pdf->Cell(31,5,$lab->creatinine,1,1,'L');

            // MEDICAL EXAMINATION: SYSTEMIC
            // $pdf->SetFont('Arial','',10);
            $pdf->Cell(72,5,'RESPIRATORY',1,0,'L');
            $pdf->Cell(38,5,$medical->respiratory,1,0,'C');
            // SEROLOGY
            $pdf->SetFont('Arial','B',10);
            $pdf->Cell(81,5,'SEROLOGY',1,1,'L');
            // $pdf->Ln(6);
            // MEDICAL EXAMINATION: SYSTEMIC
            $pdf->SetFont('Arial','',8);
            $pdf->Cell(72,5,'ENT',1,0,'L');
            $pdf->Cell(38,5,$lab->ent,1,0,'C');
            // SEROLOGY
            $pdf->Cell(50,5,'HIV I & II',1,0,'L');
            $pdf->Cell(31,5,$lab->hiv,1,1,'L');

            // MEDICAL EXAMINATION: SYSTEMIC
            $pdf->Cell(110,5,'GASTRO INTESTINAL',1,0,'L');
            // SEROLOGY
            $pdf->Cell(50,5,'HBs Ag',1,0,'L');
            $pdf->Cell(31,5,$lab->hbsag,1,1,'L');

            // MEDICAL EXAMINATION: SYSTEMIC
            $pdf->Cell(72,5,'ABDOMEN (Mass, tenderness)',1,0,'L');
            $pdf->Cell(38,5,$medical->abdomen,1,0,'C');
            // SEROLOGY
            $pdf->Cell(50,5,'Anti HCV',1,0,'L');
            $pdf->Cell(31,5,$lab->hcv,1,1,'L');

            // MEDICAL EXAMINATION: SYSTEMIC
            $pdf->Cell(72,5,'HERNIA',1,0,'L');
            $pdf->Cell(38,5,$medical->hernia,1,0,'C');
            // SEROLOGY
            $pdf->Cell(50,5,'VDRL',1,0,'L');
            $pdf->Cell(31,5,$lab->vdrl,1,1,'L');

            // MEDICAL EXAMINATION: SYSTEMIC
            $pdf->Cell(110,5,'GENITOURINARY',1,0,'L');
            // SEROLOGY
            $pdf->Cell(50,5,'TPHA (if VDRL is positive)',1,0,'L');
            $pdf->Cell(31,5,$lab->tpha,1,1,'L');

            // MEDICAL EXAMINATION: SYSTEMIC
            // $pdf->SetFont('Arial','',10);
            $pdf->Cell(72,5,'HYDROCELE',1,0,'L');
            $pdf->Cell(38,5,$medical->hydrocele,1,0,'C');
            // URINE
            $pdf->SetFont('Arial','B',10);
            $pdf->Cell(81,5,'URINE',1,0,'L');
            $pdf->Ln(5);

            // MEDICAL EXAMINATION: SYSTEMIC
            $pdf->SetFont('Arial','',8);
            $pdf->Cell(110,5,'MUSCULOSKELETAL',1,0,'L');
            // URINE
            $pdf->Cell(50,5,'Sugar',1,0,'L');
            $pdf->Cell(31,5,$lab->sugar,1,1,'L');

            // MEDICAL EXAMINATION: SYSTEMIC
            $pdf->Cell(72,5,'EXTREMITIES',1,0,'L');
            $pdf->Cell(38,5,$medical->extremities,1,0,'C');
            // URINE
            $pdf->Cell(50,5,'Albumin',1,0,'L');
            $pdf->Cell(31,5,$lab->albumin,1,1,'L');

            // $pdf->Ln(6);
            // MEDICAL EXAMINATION: SYSTEMIC
            // $pdf->SetFont('Arial','',8);
            $pdf->Cell(72,5,'BACK',1,0,'L');
            $pdf->Cell(38,5,$medical->back,1,0,'C');
            // STOOL
            $pdf->SetFont('Arial','B',10);
            $pdf->Cell(81,5,'STOOL',1,1,'L');

            // MEDICAL EXAMINATION: SYSTEMIC
            $pdf->SetFont('Arial','',8);
            $pdf->Cell(72,5,'SKIN',1,0,'L');
            $pdf->Cell(38,5,$medical->skin,1,0,'C');
            // STOOL
            $pdf->Cell(81,5,'ROUTINE',1,1,'L');

            // MEDICAL EXAMINATION: SYSTEMIC
            $pdf->Cell(72,5,'C.N.S',1,0,'L');
            $pdf->Cell(38,5,$medical->cns,1,0,'C');
            // STOOL
            $pdf->Cell(50,5,'  Helminthes',1,0,'L');
            $pdf->Cell(31,5,$lab->helminthes,1,1,'L');

            // MEDICAL EXAMINATION: SYSTEMIC
            $pdf->Cell(72,5,'DEFORMITIES',1,0,'L');
            $pdf->Cell(38,5,$medical->deformities,1,0,'C');
            // STOOL
            $pdf->Cell(50,5,'  OVA',1,0,'L');
            $pdf->Cell(31,5,$lab->ova,1,1,'L');

            // MENTAL STATUS EXAMINATION
            $pdf->SetFont('Arial','B',10);
            $pdf->Cell(72,5,'MENTAL STATUS EXAMINATION',1,0,'L');
            $pdf->Cell(38,5,'',1,0,'C');
            // STOOL
            $pdf->SetFont('Arial','',8);
            $pdf->Cell(50,5,'  CYST',1,0,'L');
            $pdf->Cell(31,5,$lab->cyst,1,1,'L');

            // MENTAL STATUS EXAMINATION
            $pdf->Cell(72,5,'A. Appearance',1,0,'L');
            $pdf->Cell(38,5,$medical->appearance,1,0,'C');
            // STOOL
            // $pdf->SetFont('Arial','',10);
            $pdf->Cell(81,5,'Others',1,1,'L');

            // MENTAL STATUS EXAMINATION
            $pdf->Cell(72,5,'Speech',1,0,'L');
            $pdf->Cell(38,5,$medical->speech,1,0,'C');

            // Pregnancy Test after Others blank cell after
            $pdf->Cell(50,5,'Pregnancy Test',1,0,'L');

            if ($lab->pregnancy=="negative") {
            $pdf->Cell(31,5,"-VE",1,1,'L');
            } elseif ($lab->pregnancy=="positive") {
            $pdf->Cell(31,5,"+VE",1,1,'L');
            } else {
            $pdf->Cell(31,5,$lab->pregnancy,1,1,'L');
            }



            // MENTAL STATUS EXAMINATION
            // $pdf->SetFont('Arial','',10);
            $pdf->Cell(72,5,'Behaviour',1,0,'L');
            $pdf->Cell(38,5,$medical->behavior,1,0,'C');
            // VACCINATION STATUS
            $pdf->SetFont('Arial','B',10);
            $pdf->Cell(81,5,'VACCINATION STATUS',1,1,'C');

            // MENTAL STATUS EXAMINATION
            $pdf->SetFont('Arial','',8);
            $pdf->Cell(72,5,'B. Cognition',1,0,'L');
            $pdf->Cell(38,5,$medical->cognition,1,0,'C');
            // VACCINATION STATUS
            $pdf->Cell(30,5,'TYPE',1,0,'C');
            $pdf->Cell(24,5,'STATUS',1,0,'C');
            $pdf->Cell(27,5,'DATE',1,1,'C');

            // MENTAL STATUS EXAMINATION
            $pdf->Cell(72,5,'Orientation',1,0,'L');
            $pdf->Cell(38,5,$medical->orientation,1,0,'C');
            // VACCINATION STATUS
            $pdf->SetFont('Arial','',8);
            $pdf->Cell(30,5,'POLIO',1,0,'L');
            $pdf->Cell(24,5,$lab->polio,1,0,'C');
            if($lab->polio_date=="0000-00-00" || $lab->polio_date==NULL)
            $pdf->Cell(27,5,"00-00-0000",1,1,'C');
            else{
            $p_date=date("d-m-Y",strtotime($lab->polio_date));
            $pdf->Cell(27,5,$p_date,1,1,'C');
            }

            // MENTAL STATUS EXAMINATION
            $pdf->Cell(72,5,'Memory',1,0,'L');
            $pdf->Cell(38,5,$medical->memory,1,0,'C');
            // VACCINATION STATUS
            $pdf->Cell(30,5,'MMR1',1,0,'L');
            $pdf->Cell(24,5,$lab->mmr1,1,0,'C');
            if($lab->mmr1_date=="0000-00-00" || $lab->mmr1_date==NULL)
            $pdf->Cell(27,5,"00-00-0000",1,1,'C');
            else{
            $mr1_date=date("d-m-Y",strtotime($lab->mmr1_date));
            $pdf->Cell(27,5,$mr1_date,1,1,'C');
            }

            // MENTAL STATUS EXAMINATION
            $pdf->Cell(72,5,'Concentration',1,0,'L');
            $pdf->Cell(38,5,$medical->concentration,1,0,'C');
            // VACCINATION STATUS
            $pdf->Cell(30,5,'MMR2',1,0,'L');
            $pdf->Cell(24,5,$lab->mmr2,1,0,'C');
            if($lab->mmr2_date=="0000-00-00" || $lab->mmr2_date==NULL)
            $pdf->Cell(27,5,"00-00-0000",1,1,'C');
            else{
            $mr2_date=date("d-m-Y",strtotime($lab->mmr2_date));
            $pdf->Cell(27,5,$mr2_date,1,1,'C');
            }

            // MENTAL STATUS EXAMINATION
            $pdf->Cell(72,5,'C. Mood',1,0,'L');
            $pdf->Cell(38,5,$medical->mood,1,0,'C');
            // VACCINATION STATUS
            $pdf->Cell(30,5,'Meningococcal',1,0,'L');
            $pdf->Cell(24,5,$lab->meningococcal,1,0,'C');
            if($lab->meningococcal_date=="0000-00-00" || $lab->meningococcal_date==NULL)
            $pdf->Cell(27,5,"00-00-0000",1,1,'C');
            else{
            $men_date=date("d-m-Y",strtotime($lab->meningococcal_date));
            $pdf->Cell(27,5,$men_date,1,1,'C');
            }

            // MENTAL STATUS EXAMINATION
            // $pdf->SetFont('Arial','',10);
            $pdf->Cell(72,5,'D. Thoughts',1,0,'L');
            $pdf->Cell(38,5,$medical->thoughts,1,0,'C');
            // VACCINATION STATUS
            $pdf->Cell(81,5,'Others',1,1,'L');

            // MENTAL STATUS EXAMINATION
            $pdf->Cell(72,5,'Others',1,0,'L');
            $pdf->Cell(38,5,$medical->other,1,0,'C');
            // VACCINATION STATUS
            $pdf->Cell(81,5,'',1,1,'L');

            // REMARKS
            $pdf->Cell(0,4,'REMARKS',0,0,'L');
            $pdf->Ln(0.05);
            $pdf->SetFont('Arial','',9);
            // $pdf->Cell(191,10,'      '.$remarks.'',1,0,'L');
            if($xray->chest=="unfit due to x-ray findings")
            {
            $pdf->Cell(191,10,'The Applicants test for Xray Chest is: ',1,0,'L');
            $pdf->SetFont('Arial','B',9);
            $pdf->Ln(2.5);
            $pdf->SetX(63);
            $pdf->Cell(0,5,'Unfit due to xray findings',0,1,'L');
            }
            elseif($lab->vdrl=="positive")
            {
            $pdf->Cell(191,10,'The Applicants test for VDRL is: ',1,0,'L');
            $pdf->SetFont('Arial','B',9);
            $pdf->Ln(2.5);
            $pdf->SetX(56);
            $pdf->Cell(0,5,'positive',0,1,'L');
            }
            elseif($lab->hcv=="positive")
            {
            $pdf->Cell(191,10,'The Applicants test for Anti HCV is: ',1,0,'L');
            $pdf->SetFont('Arial','B',9);
            $pdf->Ln(2.5);
            $pdf->SetX(61);
            $pdf->Cell(0,5,'positive',0,1,'L');
            }
            elseif($lab->hiv=="positive")
            {
            $pdf->Cell(191,10,'The Applicants test for HIV I & II is: ',1,0,'L');
            $pdf->SetFont('Arial','B',9);
            $pdf->Ln(2.5);
            $pdf->SetX(60);
            $pdf->Cell(0,5,'positive',0,1,'L');
            }
            elseif($lab->hbsag=="positive")
            {
            $pdf->Cell(191,10,'The Applicants test for HBsAg is: ',1,0,'L');
            $pdf->SetFont('Arial','B',9);
            $pdf->Ln(2.5);
            $pdf->SetX(57);
            $pdf->Cell(0,5,'positive',0,1,'L');
            }
            else
            {
            $pdf->Cell(191,10,' '.$reg->remarks,1,0,'L');
            $pdf->Ln(7.5);
            }
            // $pdf->Ln(3);

                $pdf->Ln(2.5);
                $pdf->SetFont('Arial','',9);
                $pdf->Cell(0,6,'Dear Sir/Madam, ',0,0,'L');
                $pdf->Ln(0.05);
                $pdf->Cell(191,24,'',1,0,'L');
                $pdf->SetFont('Arial','',8);
                $pdf->Ln(4);

                $pdf->Cell(0,4,'Mentioned above is the medical report for Mr./Ms. '.$reg->candidate_name.'  who is '.$reg->final_status.' for the above mentioned job according to the ',0,1,'L');
                $pdf->Cell(0,4,$centre->name.' criteria.',0,1,'L');
                // The Applicants test for VDRL is positive
                $d = new DNS1D();
                $barcodeBase = $d->getBarcodePNG($reg->barcode_no, 'C39', 2,25,array(3,3,3));
                // $d->getBarcodePNG($reg->barcode_no, 'C39+', 2,60,array(2,2,2));
                $base64_data = $barcodeBase;
                $decoded_data = base64_decode($base64_data);

                file_put_contents("temp_image.png", $decoded_data);
                $pdf->Cell(0,4,$pdf->Image("temp_image.png"),0,1, 'L');
                $pdf->SetX(35);
                $pdf->Cell(0,0,$reg->barcode_no,70,22);

                $filename = 'print_final_report_export_' . time() . '.pdf';

                $pdf->Output(storage_path("app/public/pdf_exports/$filename"), 'F');

            unlink("temp_image.png");

            return response()->json(['success' => true, 'filename' => asset('storage/app/public/pdf_exports/'.$filename)], 200);
    }

    public function export_embassy_report(request $request)
    {
        $all = json_decode($request->getContent());

        $centre = Centres::find($all->centre_id);

        $reg = Registrations::join('candidates','candidates.id','registrations.candidate_id')
                           ->where('barcode_no',$all->barcode_no)
                           ->where('center_id',$all->centre_id)
                           ->latest('registrations.reg_date')
                           ->first();


            $pdf = new Fpdf();
            $pdf->AddPage('P', 'A4', '0');

            $pdf->SetFont('Arial','', 11);
            $pdf->Ln(18);

            // Title
            $pdf->SetFont('Arial','B',18);
            $pdf->setFillColor(210,230,230);
            $pdf->Ln(10);

            $pdf->SetX(50); //The next cell will be set 100 units to the right
            $pdf->Cell(110,9,$centre->name,0,1,'C',1);
            // $pdf->Ln();

            $pdf->SetFont('Arial','',12);
            $pdf->Cell(0,6,$centre->address,0,0,'C');
            $pdf->Ln(5);
            $pdf->SetX(10);
            $pdf->Cell(0,6,'Phone: '.$centre->phone.', Fax: '.$centre->fax.'',0,1,'C');
            $pdf->Ln(6);
            $pdf->setFillColor(230,230,230);
            $pdf->SetFont('Arial','B',18);
            $pdf->Cell(0,10,''.$reg->country.'',1,1,'C',1);
            $pdf->Ln(2);
            $pdf->Ln(3);

            $DOB=date("d-m-Y",strtotime($reg->dob));
            $regDate=date("d-m-Y",strtotime($reg->reg_date));
            $pdf->setFillColor(230,230,230);
            $pdf->SetFont('Arial','B',12);

            $pdf->SetX(10);
            $pdf->Cell(30,9,'Date',1,0,'L',1);
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(65,9,$regDate,1,0,'L');
            $pdf->SetFont('Arial','B',12);
            $pdf->Cell(30,9,'Serial No.',1,0,'L',1);
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(65,9,$reg->serial_no,1,1,'L');
            $pdf->SetFont('Arial','B',12);
            $pdf->SetX(10);
            $pdf->Cell(30,9,'Name',1,0,'L',1);
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(65,9,$reg->candidate_name,1,0,'L');
            $pdf->SetFont('Arial','B',12);
            $pdf->Cell(30,9,'CNIC',1,0,'L',1);
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(65,9,$reg->cnic,1,1,'L');
            $pdf->SetFont('Arial','B',12);
            $pdf->SetX(10);
            $pdf->Cell(30,9,($reg->relation_type == 'S/O' || $reg->relation_type == 'D/O') ? "Father's Name" : "Husband's Name",1,0,'L',1);
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(65,9,$reg->relative_name,1,0,'L');
            $pdf->SetFont('Arial','B',12);
            $pdf->Cell(30,9,'Passport No.',1,0,'L',1);
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(65,9,$reg->passport_no,1,1,'L');
            $pdf->SetFont('Arial','B',12);
            $pdf->SetX(10);
            $pdf->Cell(30,9,'Profession',1,0,'L',1);
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(65,9,$reg->profession,1,0,'L');
            $pdf->SetFont('Arial','B',12);
            $pdf->Cell(30,9,'Place of Issue',1,0,'L',1);
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(65,9,$reg->place_of_issue,1,1,'L');
            $pdf->SetFont('Arial','B',12);
            $pdf->SetX(10);
            $pdf->Cell(30,9,'Agency',1,0,'L',1);
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(65,9,$reg->agency,1,0,'L');
            $pdf->SetFont('Arial','B',12);
            $pdf->Cell(30,9,'DOB',1,0,'L',1);
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(65,9,$DOB,1,1,'L');
            $pdf->Ln(6);
            $pdf->Ln(2);
            $pdf->SetFont('Arial','',10);
            $pdf->Ln(20);
            $pdf->Cell(140,10, "____________________________________", 0, 0);

            $pdf->Ln(5);
            $pdf->Cell(100,10, '           Authorised Signature & Stamp ', 0, 0);

            $pdf->Ln(40);
            $pdf->Cell(100,10, '***Note***Please report to embassay after 6 working days. ', 0, 0);

            $filename = 'embassy_slip_export_' . time() . '.pdf';

            // Save the PDF to the storage folder
            $pdf->Output(storage_path("app/public/pdf_exports/$filename"), 'F');

            return response()->json(['success' => true, 'filename' => asset('storage/app/public/pdf_exports/'.$filename)], 200);
    }

    public function make_eno(request $request)
    {
        $all = json_decode($request->getContent());

        if($request->hasFile('screenshot'))
        {
            $image = $request->file('screenshot');
            $imageName = time().'.'.$image->getClientOriginalExtension();

            $image->move(storage_path('app/public/eno_screenshots'), $imageName);
        }
        else
        {
            $imageName = NULL;
        }

        ENO::where('centre_id',$all->centre_id)->where('reg_id',$all->reg_id)
            ->update(array('eno' => $all->eno, 'reg_id' => $all->reg_id, 'screenshot' => $imageName));

        return response()->json(['message' => 'ENO Updated'], 200);
    }

    public function log_print_attempts(request $request)
    {
        $all = json_decode($request->getContent());

        PrintLogs::insert(array('centre_id' => $all->centre_id, 'print_value' => str_replace(" ","",$all->sticker_value), 'user_id' => $all->user_id));

        return response()->json(['message' => 'Sticker Log updated'], 200);
    }

    public function status_restore()
    {
        $data = Registrations::select('lab_result.status as lab_status','xray_result.status as xray_status','medical.status as medical_status','registrations.reg_id','candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('medical','medical.reg_id','registrations.reg_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->where('reg_date','2024-04-15')
                                            ->where('center_id', 1)
                                            ->orderBy('print_report_portion',"DESC")
                                            ->get();

                
                                            foreach($data as $d)
                                            {
                                                if($d->lab_status == 'UNFIT' || $d->xray_status == 'UNFIT' || $d->medical_status == 'UNFIT' && ($d->lab_status != 'In Process' && $d->xray_status != 'In Process' && $d->medical_status != 'In Process'))
                                                {
                                                    $status = 'UNFIT';
                                                    $portion = ($d->print_report_portion != 'B') ? 'A' : $d->print_report_portion;
                                                }
                                                elseif($d->lab_status == 'FIT' && $d->xray_status == 'FIT' && $d->medical_status == 'FIT')
                                                {
                                                    $status = 'FIT';
                                                    $portion = ($d->print_report_portion != 'B') ? 'A' : $d->print_report_portion;
                                                }
                                                else
                                                {
                                                    $status = 'In Process';
                                                    $portion = ($d->print_report_portion != 'B') ? 'A-B' : $d->print_report_portion;
                                                }
                                                
                                                $update = Registrations::where('reg_id',$d->reg_id)->update(array('status' => $status,'print_report_portion' => $portion));
                                            }


    }

    function status_change($reg_id,$centre_id)
    {
        $data = Registrations::select('lab_result.status as lab_status','xray_result.status as xray_status','medical.status as medical_status','registrations.reg_id','candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('medical','medical.reg_id','registrations.reg_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->where('registrations.reg_id',$reg_id)
                                            ->where('center_id', $centre_id)
                                            ->first();

        if($data)
        {
            if($data->lab_status == 'UNFIT' || $data->xray_status == 'UNFIT' || $data->medical_status == 'UNFIT' && ($data->lab_status != 'In Process' && $data->xray_status != 'In Process' && $data->medical_status != 'In Process'))
            {
                $status = 'UNFIT';
                $portion = ($data->print_report_portion != 'B') ? 'A' : $data->print_report_portion;
            }
            elseif($data->lab_status == 'FIT' && $data->xray_status == 'FIT' && $data->medical_status == 'FIT')
            {
                $status = 'FIT';
                $portion = ($data->print_report_portion != 'B') ? 'A' : $data->print_report_portion;
            }
            else
            {
                $status = 'In Process';
                $portion = ($data->print_report_portion != 'B') ? 'A-B' : $data->print_report_portion;
            }
            
            $update = Registrations::where('reg_id',$data->reg_id)->update(array('status' => $status,'print_report_portion' => $portion));

            return 'Updated Status';
        }
        else
        {
            return 'Status Not Updated';
        }
    }
}
