<?php

namespace App\Http\Controllers\API\CentreAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Centres;
use App\Models\ReportModules;
use App\Models\Country;

use App\Models\Registrations;

use Codedge\Fpdf\Fpdf\Fpdf;

use stdClass;

use DB;

class ReportsController extends Controller
{
    public function fetch_centres()
    {
        return response()->json(['centres' => Centres::select('id as value','name as label')->where('status','!=','Deleted')->get()], 200);
    }

    public function fetch_reports()
    {
        return response()->json(['modules' => ReportModules::select('name as value','title as label')->get()], 200);
    }

    public function fetch_countries()
    {
        return response()->json(['countries' => Country::select('name as value','name as label')->distinct()->where('status','Active')->get('name')], 200);
    }

    public function generate_report(request $request)
    {
        $all = json_decode($request->getContent());

        $countries = array();

        $keys = array();

        foreach($all->countries as $c)
        {
            array_push($countries, $c->value);
        }

        if($all->report_type->value == 'registration_report')
        {
            $key = new stdClass();
            $key->name = "serial_no";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "name";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "father's_name";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "passport_no";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "agency";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "country";
            array_push($keys, $key);

            if($all->datafreq == 'Daily')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->where('reg_date',$all->dailydate)
                                        ->where('center_id',$all->centreID)
                                        ->whereIn('country',$countries)
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
                else
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->where('reg_date',$all->dailydate)
                                        ->where('center_id',$all->centreID)
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->whereMonth('reg_date',$all->monthlydate)
                                        ->where('center_id',$all->centreID)
                                        ->whereIn('country',$countries)
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
                else
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->whereMonth('reg_date',$all->monthlydate)
                                        ->where('center_id',$all->centreID)
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->whereYear('reg_date',$all->yearlydate)
                                        ->where('center_id',$all->centreID)
                                        ->whereIn('country',$countries)
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
                else
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->whereYear('reg_date',$all->yearlydate)
                                        ->where('center_id',$all->centreID)
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->where('reg_date','>=',$all->fromRange)
                                        ->where('reg_date','<=',$all->toRange)
                                        ->where('center_id',$all->centreID)
                                        ->whereIn('country',$countries)
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
                else
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->where('reg_date','>=',$all->fromRange)
                                        ->where('reg_date','<=',$all->toRange)
                                        ->where('center_id',$all->centreID)
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
            }

            return response()->json(['data' => $data,'keys' => $keys],200);
        }
        elseif($all->report_type->value == 'cash_report')
        {
            $key = new stdClass();
            $key->name = "particulars";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "cases";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "rate";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "amount";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "remarks";
            array_push($keys, $key);

            if($all->datafreq == 'Daily')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select("country as particulars", DB::raw("count(country) as cases"), DB::raw("FORMAT(fee_charged, 0) as rate"))
                                            ->where('reg_date', $all->dailydate)
                                            ->where('country', '!=', 'CASE CANCELLED')
                                            ->where('center_id', $all->centreID)
                                            ->whereIn('country', $countries)
                                            ->groupBy("country",'fee_charged')
                                            ->selectRaw('FORMAT(count(country) * fee_charged, 0) as amount')
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("country as particulars", DB::raw("count(country) as cases"), DB::raw("FORMAT(fee_charged, 0) as rate"))
                                            ->where('reg_date', $all->dailydate)
                                            ->where('country', '!=', 'CASE CANCELLED')
                                            ->where('center_id', $all->centreID)
                                            ->whereIn('country', $countries)
                                            ->groupBy("country",'fee_charged')
                                            ->selectRaw('FORMAT(count(country) * fee_charged, 0) as amount')
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select("country as particulars", DB::raw("count(country) as cases"), DB::raw("FORMAT(fee_charged, 0) as rate"))
                                            ->whereMonth('reg_date',$all->monthlydate)
                                            ->where('country','!=','CASE CANCELLED')
                                            ->where('center_id',$all->centreID)
                                            ->whereIn('country', $countries)
                                            ->groupBy("country",'fee_charged')
                                            ->selectRaw('FORMAT(count(country) * fee_charged, 0) as amount')
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("country as particulars", DB::raw("count(country) as cases"), DB::raw("FORMAT(fee_charged, 0) as rate"))
                                            ->whereMonth('reg_date',$all->monthlydate)
                                            ->where('country','!=','CASE CANCELLED')
                                            ->where('center_id',$all->centreID)
                                            ->whereIn('country', $countries)
                                            ->groupBy("country",'fee_charged')
                                            ->selectRaw('FORMAT(count(country) * fee_charged, 0) as amount')
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select("country as particulars", DB::raw("count(country) as cases"), DB::raw("FORMAT(fee_charged, 0) as rate"))
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->where('country','!=','CASE CANCELLED')
                                            ->where('center_id',$all->centreID)
                                            ->whereIn('country', $countries)
                                            ->groupBy("country",'fee_charged')
                                            ->selectRaw('FORMAT(count(country) * fee_charged, 0) as amount')
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("country as particulars", DB::raw("count(country) as cases"), DB::raw("FORMAT(fee_charged, 0) as rate"))
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->where('country','!=','CASE CANCELLED')
                                            ->where('center_id',$all->centreID)
                                            ->whereIn('country', $countries)
                                            ->groupBy("country",'fee_charged')
                                            ->selectRaw('FORMAT(count(country) * fee_charged, 0) as amount')
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select("country as particulars", DB::raw("count(country) as cases"), DB::raw("FORMAT(fee_charged, 0) as rate"))
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->where('country','!=','CASE CANCELLED')
                                            ->where('center_id',$all->centreID)
                                            ->whereIn('country', $countries)
                                            ->groupBy("country",'fee_charged')
                                            ->selectRaw('FORMAT(count(country) * fee_charged, 0) as amount')
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("country as particulars", DB::raw("count(country) as cases"), DB::raw("FORMAT(fee_charged, 0) as rate"))
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->where('country','!=','CASE CANCELLED')
                                            ->where('center_id',$all->centreID)
                                            ->whereIn('country', $countries)
                                            ->groupBy("country",'fee_charged')
                                            ->selectRaw('FORMAT(count(country) * fee_charged, 0) as amount')
                                            ->get();
                }
            }

            return response()->json(['data' => $data,'keys' => $keys],200);
        }
        elseif($all->report_type->value == 'eno_report')
        {
            $key = new stdClass();
            $key->name = "#";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "date";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "s.no";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "web_date";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "name";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "pp.no";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "e.no";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "remarks";
            array_push($keys, $key);

            if($all->datafreq == 'Daily')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no")
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->where('eno.created_at',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->whereIn('country', $countries)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no")
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->where('eno.created_at',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no")
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->whereMonth('eno.created_at',$all->monthlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->whereIn('country', $countries)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no")
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->whereMonth('eno.created_at',$all->monthlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no")
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->whereYear('eno.created_at',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->whereIn('country', $countries)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no")
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->whereYear('eno.created_at',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no")
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->where('eno.created_at','>=',$all->fromRange)
                                            ->where('eno.created_at','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->whereIn('country', $countries)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no")
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->where('eno.created_at','>=',$all->fromRange)
                                            ->where('eno.created_at','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }

            return response()->json(['data' => $data,'keys' => $keys],200);
        }
        elseif($all->report_type->value == 'status_report')
        {
            $key = new stdClass();
            $key->name = "#";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "date";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "serial_#";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "name";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "s/d/w/o";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "pp_#";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "country";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "agency";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "status";
            array_push($keys, $key);

            if($all->datafreq == 'Daily')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('reg_date',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->whereIn('country', $countries)
                                            ->orderBy('print_report_portion',"DESC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('reg_date',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('print_report_portion',"DESC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereMonth('reg_date',$all->monthlydate)
                                            ->where('center_id', $all->centreID)
                                            ->whereIn('country', $countries)
                                            ->orderBy('print_report_portion',"DESC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereMonth('reg_date',$all->monthlydate)
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('print_report_portion',"DESC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->whereIn('country', $countries)
                                            ->orderBy('print_report_portion',"DESC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('print_report_portion',"DESC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->whereIn('country', $countries)
                                            ->orderBy('print_report_portion',"DESC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('print_report_portion',"DESC")
                                            ->get();
                }
            }

            return response()->json(['data' => $data,'keys' => $keys],200);
        }
        elseif($all->report_type->value == 'lab_report')
        {
            $key = new stdClass();
            $key->name = "s.no";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "name";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "rbs";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "serum";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "creatinine_(mg/dl)";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "vdrl/tpha";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "l.f.t";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "serum";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "bilirubin_(mg/dl)";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "alt_u/l";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "ast_u/l";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "ask";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "po4_u/l";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "blood";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "hb_(g/dl)";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "thick_film";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "malarial_parasite";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "micro-filariae";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "blood_group";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "elisa";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "hbs";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "ag";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "hiv_1,2";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "anti_hcv";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "urine";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "sugar";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "albumin";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "bile";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "salt/pigment";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "stool";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "ova";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "cyst";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "pregnancy_test_(females_only)";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "tb_test";
            array_push($keys, $key);

            if($all->datafreq == 'Daily')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select(DB::raw('SUBSTRING(lab_result.barcode,1,4) as code'),
                                                    'serial_no as s.no',
                                                    'candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv1,2',DB::raw("CONCAT(vdrl,'/',tpha) as vdrl_tpha"),
                                                    'rbs','bil','alt as alt_u/l','alk as alk_u/l','ast','creatinine','blood_group','haemoglobin',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->where('reg_date',$all->dailydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select(DB::raw('SUBSTRING(lab_result.barcode,1,4) as code'),
                                                    'serial_no as s.no',
                                                    'candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv1,2',DB::raw("CONCAT(vdrl,'/',tpha) as vdrl_tpha"),
                                                    'rbs','bil','alt as alt_u/l','alk as alk_u/l','ast','creatinine','blood_group','haemoglobin',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->where('reg_date',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select(DB::raw('SUBSTRING(lab_result.barcode,1,4) as code'),
                                                    'serial_no as s.no',
                                                    'candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv1,2',DB::raw("CONCAT(vdrl,'/',tpha) as vdrl_tpha"),
                                                    'rbs','bil','alt as alt_u/l','alk as alk_u/l','ast','creatinine','blood_group','haemoglobin',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->whereMonth('reg_date',$all->monthlydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select(DB::raw('SUBSTRING(lab_result.barcode,1,4) as code'),
                                                    'serial_no as s.no',
                                                    'candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv1,2',DB::raw("CONCAT(vdrl,'/',tpha) as vdrl_tpha"),
                                                    'rbs','bil','alt as alt_u/l','alk as alk_u/l','ast','creatinine','blood_group','haemoglobin',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->whereMonth('reg_date',$all->monthlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select(DB::raw('SUBSTRING(lab_result.barcode,1,4) as code'),
                                                    'serial_no as s.no',
                                                    'candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv1,2',DB::raw("CONCAT(vdrl,'/',tpha) as vdrl_tpha"),
                                                    'rbs','bil','alt as alt_u/l','alk as alk_u/l','ast','creatinine','blood_group','haemoglobin',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select(DB::raw('SUBSTRING(lab_result.barcode,1,4) as code'),
                                                    'serial_no as s.no',
                                                    'candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv1,2',DB::raw("CONCAT(vdrl,'/',tpha) as vdrl_tpha"),
                                                    'rbs','bil','alt as alt_u/l','alk as alk_u/l','ast','creatinine','blood_group','haemoglobin',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select(DB::raw('SUBSTRING(lab_result.barcode,1,4) as code'),
                                                    'serial_no as s.no',
                                                    'candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv1,2',DB::raw("CONCAT(vdrl,'/',tpha) as vdrl_tpha"),
                                                    'rbs','bil','alt as alt_u/l','alk as alk_u/l','ast','creatinine','blood_group','haemoglobin',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select(DB::raw('SUBSTRING(lab_result.barcode,1,4) as code'),
                                                    'serial_no as s.no',
                                                    'candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv1,2',DB::raw("CONCAT(vdrl,'/',tpha) as vdrl_tpha"),
                                                    'rbs','bil','alt as alt_u/l','alk as alk_u/l','ast','creatinine','blood_group','haemoglobin',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }

            return response()->json(['data' => $data,'keys' => $keys],200);
        }
        elseif($all->report_type->value == 'reference_slip_report')
        {
            $key = new stdClass();
            $key->name = "passport_no";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "s.no";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "place_of_issue";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "slip_issue_date";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "slip_expiry_date";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "comment";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "status";
            array_push($keys, $key);

            if($all->datafreq == 'Daily')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('candidates.passport_no',
                                                    'serial_no as s.no',
                                                    'place_of_issue',
                                                    'slip_issue_date','slip_expiry_date','remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('reg_date',$all->dailydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.passport_no',
                                                    'serial_no as s.no',
                                                    'place_of_issue',
                                                    'slip_issue_date','slip_expiry_date','remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('reg_date',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('candidates.passport_no',
                                                    'serial_no as s.no',
                                                    'place_of_issue',
                                                    'slip_issue_date','slip_expiry_date','remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereMonth('reg_date',$all->monthlydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.passport_no',
                                                    'serial_no as s.no',
                                                    'place_of_issue',
                                                    'slip_issue_date','slip_expiry_date','remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereMonth('reg_date',$all->monthlydate)
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('candidates.passport_no',
                                                    'serial_no as s.no',
                                                    'place_of_issue',
                                                    'slip_issue_date','slip_expiry_date','remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.passport_no',
                                                    'serial_no as s.no',
                                                    'place_of_issue',
                                                    'slip_issue_date','slip_expiry_date','remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('candidates.passport_no',
                                                    'serial_no as s.no',
                                                    'place_of_issue',
                                                    'slip_issue_date','slip_expiry_date','remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.passport_no',
                                                    'serial_no as s.no',
                                                    'place_of_issue',
                                                    'slip_issue_date','slip_expiry_date','remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }

            return response()->json(['data' => $data,'keys' => $keys],200);
        }
        elseif($all->report_type->value == 'code_list_report')
        {
            $key = new stdClass();
            $key->name = "s#";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "serial_no";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "code";
            array_push($keys, $key);

            if($all->datafreq == 'Daily')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->where('lab_stickers.created_at',$all->dailydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->where('lab_stickers.created_at',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->whereMonth('lab_stickers.created_at',$all->monthlydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->whereMonth('lab_stickers.created_at',$all->monthlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->whereYear('lab_stickers.created_at',$all->yearlydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->whereYear('lab_stickers.created_at',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->where('lab_stickers.created_at','>=',$all->fromRange)
                                            ->where('lab_stickers.created_at','<=',$all->toRange)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->where('lab_stickers.created_at','>=',$all->fromRange)
                                            ->where('lab_stickers.created_at','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }

            return response()->json(['data' => $data,'keys' => $keys],200);
        }
        elseif($all->report_type->value == 'feed_back_report')
        {
            $key = new stdClass();
            $key->name = "s#";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "serial_no";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "code";
            array_push($keys, $key);

            if($all->datafreq == 'Daily')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->where('lab_stickers.created_at',$all->dailydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->where('lab_stickers.created_at',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->whereMonth('lab_stickers.created_at',$all->monthlydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->whereMonth('lab_stickers.created_at',$all->monthlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->whereYear('lab_stickers.created_at',$all->yearlydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->whereYear('lab_stickers.created_at',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->where('lab_stickers.created_at','>=',$all->fromRange)
                                            ->where('lab_stickers.created_at','<=',$all->toRange)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('lab_stickers.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_stickers','lab_stickers.reg_id','registrations.reg_id')
                                            ->where('lab_stickers.created_at','>=',$all->fromRange)
                                            ->where('lab_stickers.created_at','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }

            return response()->json(['data' => $data,'keys' => $keys],200);
        }
        elseif($all->report_type->value == 'xray_report')
        {
            $key = new stdClass();
            $key->name = "date";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "name";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "passport_no.";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "reporting";
            array_push($keys, $key);

            if($all->datafreq == 'Daily')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('xray_result.created_at as date','candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->where('reg_date',$all->dailydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('xray_result.created_at as date','candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->where('reg_date',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('xray_result.created_at as date','candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->whereMonth('reg_date',$all->monthlydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('xray_result.created_at as date','candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->whereMonth('reg_date',$all->monthlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('xray_result.created_at as date','candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('xray_result.created_at as date','candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('xray_result.created_at as date','candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->whereIn('country',$countries)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('xray_result.created_at as date','candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->get();
                }
            }

            return response()->json(['data' => $data,'keys' => $keys],200);
        }
    }

    public function export_report(request $request, $type)
    {
        $all = json_decode($request->getContent());

        $centre = Centres::find($all->centreID);

        $report = ReportModules::where('name',$all->report_type->value)->first();

        if($type == 'pdf')
        {

            $pdf = new Fpdf();
            $pdf->AddPage('L', 'Legal', '0');

            $pdf->SetFont('Arial','B',14);
            $pdf->Ln(2);

            //Header Start
            $pdf->SetX(140); //The next cell will be set 100 units to the right
            $pdf->Cell(40,0,$pdf->Image(asset('storage/app/public/centres/logos/'.$centre->image),$pdf->GetX(),$pdf->GetY(),70,20),0,0,'C',false);
            $pdf->setFillColor(210,230,230);
            $pdf->SetX(10);
            $pdf->Cell(65,7,$centre->name,0,1,'L',1);
            $pdf->Cell(100,6,$centre->address,0,1,'L',1);
            $pdf->Cell(35,6,$centre->city,0,0,'L',1);
            $pdf->Ln(10);
            $pdf->SetX(15);
            $pdf->Cell(0,6,$report->title,0,1,'C');


            $pdf->setFillColor(230,230,230);
            $pdf->SetFont('Arial','B',11);

            $measure = $this->report_measurements($all->report_type->value);

            //Body Cols
            $pdf->SetX(10);
            foreach($all->keys as $key)
            {
                if($key->name != '#')
                {
                    $pdf->Cell($measure[$key->name],9,strtoupper(str_replace('_',' ',$key->name)),1,0,'L',1);
                }
            }
            $pdf->SetX(10);

            //Body Rows
            $pdf->SetFont('Arial','',10);
            // $pdf->Ln(6);
            foreach($all->data as $data)
            {
                $pdf->Ln(10);
                $arr = (array)$data;

                foreach($all->keys as $key)
                {
                    if($key->name != '#')
                    {
                        $pdf->Cell($measure[$key->name],9,(isset($arr[$key->name])) ? $arr[$key->name] : '',1,0,'L');
                    }
                }
            }

            $filename = $all->report_type->value.'_export_' . time() . '.pdf';

            // Save the PDF to the storage folder
            $pdf->Output(storage_path("app/public/pdf_exports/$filename"), 'F');

            return response()->json(['success' => true, 'filename' => asset('storage/app/public/'.$type.'_exports/'.$filename)], 200);
        }
        else
        {
            $filepath = $all->report_type->value.'_export_' . time() . '.csv';
            $encoding = 'UTF-8';
            $delimiter = ',';
            $enclosure = '"';

            // Get data and headings dynamically (replace with your source)
            $data = $all->data; // Example function retrieving data
            $headings = array();
            foreach($all->keys as $keys)
            {
                array_push($headings,strtoupper(str_replace('_',' ',$key->name))); // Assuming first row contains headings
            }

            // Open the file in write mode
            $file = fopen($filepath, 'w');

            // Add BOM (Byte Order Mark) for UTF-8 encoding
            if ($encoding === 'UTF-8') {
                fwrite($file, chr(0xEF) . chr(0xBB) . chr(0xBF));
            }

            // Write the dynamically obtained header row
            fputcsv($file, $headings, $delimiter, $enclosure);

            // Write each data row
            foreach ($data as $row) {
                // Format data values dynamically (example assuming strings and dates)
                $changeRow = (array)$row;
                $formattedRow = [];
                foreach ($all->keys as $key) {
                    if(isset($row[$key->name]))
                    {
                        if (is_string($row[$key->name])) {
                            $formattedRow[] = $enclosure . $row[$key->name] . $enclosure; // Enclose strings
                        } else if (is_date($row[$key->name])) {
                            $formattedRow[] = $enclosure . date('Y-m-d', strtotime($row[$key->name])) . $enclosure; // Format date
                        } else {
                            $formattedRow[] = $row[$key->name]; // Handle other data types as needed
                        }
                    }
                }

                fputcsv($file, $formattedRow, $delimiter, $enclosure);
            }

            // Close the file
            fclose($file);

            if (move_uploaded_file($filepath, 'storage/app/public/excel_exports' . $filepath)) {

                return response()->json(['success' => true, 'filename' => asset('storage/app/public/'.$type.'_exports/'.$filepath)], 200);

            }
        }


    }

    public static function report_measurements($type)
    {
        if($type == 'registration_report')
        {
            $arr = array('serial_no' => 30, 'name' => 90, "father's_name" => 80, 'passport_no' => 35, 'agency' => 50, 'country' => 50);
        }
        elseif($type == 'status_report')
        {
            $arr = array('date' => 20, "serial_#" => 35, "name" => 70, 's/d/w/o' => 60, 'pp_#' => 35, 'country' => 40, 'agency' => 50, 'status' => 22);
        }
        elseif($type == 'cash_report')
        {
            $arr = array('particulars' => 50, 'cases' => 15, "rate" => 20, 'amount' => 20, 'remarks' => 85);
        }
        elseif($type == 'lab_report')
        {
            $arr = array('s.no' => 15,'name' => 32,
                        'rbs' => 10,
                        "serum" => 18,
                        'creatinine_(mg/dl)' => 36,
                        'vdrl/tpha' => 24,
                        'l.f.t' => 45,
                        'serum' => 13,
                        'bilirubin_(mg/dl)' => 26,
                        'alt_u/l' => 16,
                        'ast_u/l' => 16,
                        'ask' => 8,
                        'po4_u/l' => 16,
                        'blood' => 35,
                        'hb_(g/dl)' => 20,
                        'thick_film' => 25,
                        'malarial_parasite' => 26,
                        'micro-filariae' => 24,
                        'blood_group' => 22,
                        'elisa' => 30,
                        'hbs' => 8,
                        'ag' => 8,
                        'hiv_1,2' => 16,
                        'anti_hcv' => 16,
                        'urine' => 36,
                        'sugar' => 10,
                        'albumin' => 13,
                        'bile' => 13,
                        'salt/pigment' => 26,
                        'stool' => 10,
                        'ova' => 10,
                        'cyst' => 10,
                        'pregnancy_test_(females_only)' => 50,
                        'tb_test' => 20);
        }
        elseif($type == 'reference_slip_report')
        {
            $arr = array('passport_no' => 35, 's.no' => 30, 'place_of_issue' => 50, 'slip_issue_date' => 50, 'slip_expiry_date' => 50, 'comment' => 50, 'status' => 20);
        }
        elseif($type == 'xray_report')
        {
            $arr = array('date' => 20, 'name' => 65, 'passport_no.' => 45, 'reporting' => 65);
        }
        else
        {
            $arr = array();
        }

        return $arr;
    }
}
