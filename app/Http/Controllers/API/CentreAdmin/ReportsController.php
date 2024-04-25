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

        $print_report = $all->portion;

        $countries = array();
        $status = array();

        $keys = array();

        foreach($all->countries as $c)
        {
            array_push($countries, $c->value);
        }

        if(isset($all->case_status))
        {

            foreach($all->case_status as $c)
            {
                array_push($status, $c->value);
            }

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

            $key = new stdClass();
            $key->name = "comments";
            array_push($keys, $key);

            if($all->datafreq == 'Daily')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency','remarks as comments')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->where('center_id',$all->centreID)
                                        ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                         ->where('reg_date',$all->dailydate)
                                                         ->orWhere('print_report_portion','B');
                                        })
                                        ->when($print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                        ->when($print_report == 'A', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                         ->where('reg_date',$all->dailydate);
                                        })
                                        ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                            return $query->whereIn('country', $countries);
                                        })
                                        ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                            return $query->whereNotIn('country', $countries);
                                        })
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
                else
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency','remarks as comments')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->where('center_id',$all->centreID)
                                        ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                         ->where('reg_date',$all->dailydate)
                                                         ->orWhere('print_report_portion','B');
                                        })
                                        ->when($print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                        ->when($print_report == 'A', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                         ->where('reg_date',$all->dailydate);
                                        })
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency','remarks as comments')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->where('center_id',$all->centreID)
                                        ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                         ->whereMonth('reg_date',$all->monthlydate->value)
                                                         ->orWhere('print_report_portion','B');
                                        })
                                        ->when($print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                        ->when($print_report == 'A', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                         ->wherMonth('reg_date',$all->monthlydate->value);
                                        })
                                        ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                            return $query->whereNotIn('country', $countries);
                                        })
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
                else
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency','remarks as comments')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->where('center_id',$all->centreID)
                                        ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                         ->whereMonth('reg_date',$all->monthlydate->value)
                                                         ->orWhere('print_report_portion','B');
                                        })
                                        ->when($print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                        ->when($print_report == 'A', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                         ->whereMonth('reg_date',$all->monthlydate->value);
                                        })
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency','remarks as comments')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->where('center_id',$all->centreID)
                                        ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                         ->whereYear('reg_date',$all->yearlydate)
                                                         ->orWhere('print_report_portion','B');
                                        })
                                        ->when($print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                        ->when($print_report == 'A', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                         ->whereYear('reg_date',$all->yearlydate);
                                        })
                                        ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                            return $query->whereIn('country', $countries);
                                        })
                                        ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                            return $query->whereNotIn('country', $countries);
                                        })
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
                else
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency','remarks as comments')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->where('center_id',$all->centreID)
                                        ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                         ->whereYear('reg_date',$all->yearlydate)
                                                         ->orWhere('print_report_portion','B');
                                        })
                                        ->when($print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                        ->when($print_report == 'A', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                         ->whereYear('reg_date',$all->yearlydate);
                                        })
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency','remarks as comments')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->where('center_id',$all->centreID)
                                        ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->where('reg_date','>=',$all->fromRange)
                                                        ->where('reg_date','<=',$all->toRange)
                                                         ->orWhere('print_report_portion','B');
                                        })
                                        ->when($print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                        ->when($print_report == 'A', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->where('reg_date','>=',$all->fromRange)
                                                        ->where('reg_date','<=',$all->toRange);
                                        })
                                        ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                            return $query->whereIn('country', $countries);
                                        })
                                        ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                            return $query->whereNotIn('country', $countries);
                                        })
                                        ->orderBy('serial_no','ASC')
                                        ->get();
                }
                else
                {
                    $data = Registrations::select('serial_no','candidates.passport_no','candidates.candidate_name as name', "relative_name as father's_name", 'country', 'agency','remarks as comments')
                                        ->join('candidates','candidates.id','=','registrations.candidate_id')
                                        ->where('center_id',$all->centreID)
                                        ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->where('reg_date','>=',$all->fromRange)
                                                        ->where('reg_date','<=',$all->toRange)
                                                         ->orWhere('print_report_portion','B');
                                        })
                                        ->when($print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                        ->when($print_report == 'A', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->where('reg_date','>=',$all->fromRange)
                                                        ->where('reg_date','<=',$all->toRange);
                                        })
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
                                            ->where('center_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->groupBy("country",'fee_charged')
                                            ->selectRaw('FORMAT(count(country) * fee_charged, 0) as amount')
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("country as particulars", DB::raw("count(country) as cases"), DB::raw("FORMAT(fee_charged, 0) as rate"))
                                            ->where('center_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date',$all->dailydate);
                                            })
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
                                            ->where('center_id',$all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereMonth('reg_date',$all->monthlydate->value);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->groupBy("country",'fee_charged')
                                            ->selectRaw('FORMAT(count(country) * fee_charged, 0) as amount')
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("country as particulars", DB::raw("count(country) as cases"), DB::raw("FORMAT(fee_charged, 0) as rate"))
                                            ->where('center_id',$all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereMonth('reg_date',$all->monthlydate->value);
                                            })
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
                                            ->where('center_id',$all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereYear('reg_date',$all->yearlydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereYear('reg_date',$all->yearlydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->groupBy("country",'fee_charged')
                                            ->selectRaw('FORMAT(count(country) * fee_charged, 0) as amount')
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("country as particulars", DB::raw("count(country) as cases"), DB::raw("FORMAT(fee_charged, 0) as rate"))
                                            ->where('center_id',$all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereYear('reg_date',$all->yearlydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereYear('reg_date',$all->yearlydate);
                                            })
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
                                            ->where('center_id',$all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->groupBy("country",'fee_charged')
                                            ->selectRaw('FORMAT(count(country) * fee_charged, 0) as amount')
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("country as particulars", DB::raw("count(country) as cases"), DB::raw("FORMAT(fee_charged, 0) as rate"))
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->where('center_id',$all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange);
                                            })
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
            $key->name = "date";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "s.no";
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
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no", 'remarks')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no", 'remarks')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no", 'remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->whereMonth('reg_date',$all->monthlydate->value)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->whereMonth('reg_date',$all->monthlydate->value);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no", 'remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->whereMonth('reg_date',$all->monthlydate->value)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->whereMonth('reg_date',$all->monthlydate->value);
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no", 'remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->whereYear('reg_date',$all->yearlydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->whereYear('reg_date',$all->yearlydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no", 'remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->whereYear('reg_date',$all->yearlydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->whereYear('reg_date',$all->yearlydate);
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no", 'remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select("reg_date as date", "serial_no as s.no", "candidates.passport_no as pp.no", "candidates.candidate_name as name", "eno.eno as e.no", 'remarks')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('eno','eno.reg_id','registrations.reg_id')
                                            ->where('center_id', $all->centreID)
                                            ->where('eno.centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }

            return response()->json(['data' => $data,'keys' => $keys],200);
        }
        elseif($all->report_type->value == 'status_report')
        {
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
                $data = Registrations::select('candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                        ->join('candidates','candidates.id','registrations.candidate_id')
                                        ->where('center_id', $all->centreID)
                                        ->when($print_report == 'A-B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) > 0, function ($query) use ($all, $countries,$status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereIn('country', $countries)
                                                        ->whereIn('registrations.status', $status)
                                                            ->where('reg_date',$all->dailydate)
                                                            ->orWhere(function ($query) use ($countries, $status) {
                                                                $query->where('print_report_portion','B')->whereIn('country',$countries)->whereIn('registrations.status',$status);
                                                            });
                                        })
                                        ->when($print_report == 'A-B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) == 0, function ($query) use ($all, $countries) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereIn('country', $countries)
                                                            ->where('reg_date',$all->dailydate)
                                                            ->orWhere(function ($query) use ($countries) {
                                                                $query->where('print_report_portion','B')->whereIn('country',$countries);
                                                            });
                                        })
                                        ->when($print_report == 'A-B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) > 0, function ($query) use ($all, $countries) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereNotIn('country', $countries)
                                                        ->whereIn('registrations.status', $status)
                                                            ->where('reg_date',$all->dailydate)
                                                            ->orWhere(function ($query) use ($countries, $status) {
                                                                $query->where('print_report_portion','B')->whereNotIn('country',$countries)->whereIn('registrations.status',$status);
                                                            });
                                        })
                                        ->when($print_report == 'A-B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) == 0, function ($query) use ($all, $countries) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereNotIn('country', $countries)
                                                            ->where('reg_date',$all->dailydate)
                                                            ->orWhere(function ($query) use ($countries) {
                                                                $query->where('print_report_portion','B')->whereNotIn('country',$countries);
                                                            });
                                        })
                                        ->when($print_report == 'A-B' && count($countries) == 0 && count($status) > 0, function ($query) use ($all, $countries) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereIn('registrations.status', $status)
                                                            ->where('reg_date',$all->dailydate)
                                                            ->orWhere(function ($query) use ($status) {
                                                                $query->where('print_report_portion','B')->whereIn('registrations.status',$status);
                                                            });
                                        })
                                        ->when($print_report == 'A-B' && count($countries) == 0 && count($status) == 0, function ($query) use ($all, $countries) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date',$all->dailydate)
                                                            ->orWhere(function ($query) {
                                                                $query->where('print_report_portion','B');
                                                            });
                                        })
                                        ->when($print_report == 'B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) > 0, function ($query) use ($print_report,$countries,$status) {
                                            return $query->where('print_report_portion', $print_report)->whereIn('country', $countries)
                                                        ->whereIn('registrations.status', $status);
                                        })
                                        ->when($print_report == 'B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) == 0, function ($query) use ($print_report,$countries) {
                                            return $query->where('print_report_portion', $print_report)->whereIn('country', $countries);
                                        })
                                        ->when($print_report == 'B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) > 0, function ($query) use ($print_report, $status) {
                                            return $query->where('print_report_portion', $print_report)->whereNotIn('country', $countries)
                                                        ->whereIn('registrations.status', $status);
                                        })
                                        ->when($print_report == 'B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) == 0, function ($query) use ($print_report, $countries,$status) {
                                            return $query->where('print_report_portion', $print_report)->whereNotIn('country', $countries);
                                        })
                                        ->when($print_report == 'B' && count($countries) == 0 && count($status) > 0, function ($query) use ($print_report, $status) {
                                            return $query->where('print_report_portion', $print_report)
                                                        ->whereIn('registrations.status', $status);
                                        })
                                        ->when($print_report == 'B' && count($countries) == 0 && count($status) == 0, function ($query) use ($print_report, $status) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                        ->when($print_report == 'A' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) > 0, function ($query) use ($all,$countries, $status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereIn('country', $countries)
                                                            ->where('reg_date',$all->dailydate)
                                                            ->whereIn('registrations.status', $status);
                                        })
                                        ->when($print_report == 'A' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) == 0, function ($query) use ($all,$countries, $status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereIn('country', $countries)
                                                            ->where('reg_date',$all->dailydate);
                                        })
                                        ->when($print_report == 'A' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) > 0, function ($query) use ($all,$countries, $status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereNotIn('country', $countries)
                                                            ->where('reg_date',$all->dailydate)
                                                            ->whereIn('registrations.status', $status);
                                        })
                                        ->when($print_report == 'A' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) == 0, function ($query) use ($all,$countries, $status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereNotIn('country', $countries)
                                                            ->where('reg_date',$all->dailydate);
                                        })
                                        ->when($print_report == 'A' && count($countries) == 0 && count($status) > 0, function ($query) use ($all,$countries, $status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date',$all->dailydate)
                                                            ->whereIn('registrations.status', $status);
                                        })
                                        ->when($print_report == 'A' && count($countries) == 0 && count($status) == 0, function ($query) use ($all,$countries, $status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date',$all->dailydate);
                                        })
                                        ->orderBy('print_report_portion',"DESC")
                                        ->orderBy('serial_no',"ASC")
                                        ->get();
            }
            elseif($all->datafreq == 'Monthly')
            {
                $data = Registrations::select('candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                        ->join('candidates','candidates.id','registrations.candidate_id')
                                        ->where('center_id', $all->centreID)
                                        ->when($print_report == 'A-B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) > 0, function ($query) use ($all, $countries,$status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereIn('country', $countries)
                                                        ->whereIn('registrations.status', $status)
                                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                                            ->orWhere(function ($query) use ($countries, $status) {
                                                                $query->where('print_report_portion','B')->whereIn('country',$countries)->whereIn('registrations.status',$status);
                                                            });
                                        })
                                        ->when($print_report == 'A-B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) == 0, function ($query) use ($all, $countries) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereIn('country', $countries)
                                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                                            ->orWhere(function ($query) use ($countries) {
                                                                $query->where('print_report_portion','B')->whereIn('country',$countries);
                                                            });
                                        })
                                        ->when($print_report == 'A-B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) > 0, function ($query) use ($all, $countries) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereNotIn('country', $countries)
                                                        ->whereIn('registrations.status', $status)
                                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                                            ->orWhere(function ($query) use ($countries, $status) {
                                                                $query->where('print_report_portion','B')->whereNotIn('country',$countries)->whereIn('registrations.status',$status);
                                                            });
                                        })
                                        ->when($print_report == 'A-B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) == 0, function ($query) use ($all, $countries) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereNotIn('country', $countries)
                                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                                            ->orWhere(function ($query) use ($countries) {
                                                                $query->where('print_report_portion','B')->whereNotIn('country',$countries);
                                                            });
                                        })
                                        ->when($print_report == 'A-B' && count($countries) == 0 && count($status) > 0, function ($query) use ($all, $countries) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereIn('registrations.status', $status)
                                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                                            ->orWhere(function ($query) use ($status) {
                                                                $query->where('print_report_portion','B')->whereIn('registrations.status',$status);
                                                            });
                                        })
                                        ->when($print_report == 'A-B' && count($countries) == 0 && count($status) == 0, function ($query) use ($all, $countries) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                                            ->orWhere(function ($query) {
                                                                $query->where('print_report_portion','B');
                                                            });
                                        })
                                        ->when($print_report == 'B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) > 0, function ($query) use ($print_report,$countries,$status) {
                                            return $query->where('print_report_portion', $print_report)->whereIn('country', $countries)
                                                        ->whereIn('registrations.status', $status);
                                        })
                                        ->when($print_report == 'B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) == 0, function ($query) use ($print_report,$countries) {
                                            return $query->where('print_report_portion', $print_report)->whereIn('country', $countries);
                                        })
                                        ->when($print_report == 'B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) > 0, function ($query) use ($print_report, $status) {
                                            return $query->where('print_report_portion', $print_report)->whereNotIn('country', $countries)
                                                        ->whereIn('registrations.status', $status);
                                        })
                                        ->when($print_report == 'B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) == 0, function ($query) use ($print_report, $countries,$status) {
                                            return $query->where('print_report_portion', $print_report)->whereNotIn('country', $countries);
                                        })
                                        ->when($print_report == 'B' && count($countries) == 0 && count($status) > 0, function ($query) use ($print_report, $status) {
                                            return $query->where('print_report_portion', $print_report)
                                                        ->whereIn('registrations.status', $status);
                                        })
                                        ->when($print_report == 'B' && count($countries) == 0 && count($status) == 0, function ($query) use ($print_report, $status) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                        ->when($print_report == 'A' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) > 0, function ($query) use ($all,$countries, $status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereIn('country', $countries)
                                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                                            ->whereIn('registrations.status', $status);
                                        })
                                        ->when($print_report == 'A' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) == 0, function ($query) use ($all,$countries, $status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereIn('country', $countries)
                                                            ->whereMonth('reg_date',$all->monthlydate->value);
                                        })
                                        ->when($print_report == 'A' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) > 0, function ($query) use ($all,$countries, $status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                        ->whereNotIn('country', $countries)
                                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                                            ->whereIn('registrations.status', $status);
                                        })
                                        ->when($print_report == 'A' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) == 0, function ($query) use ($all,$countries, $status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereNotIn('country', $countries)
                                                            ->whereMonth('reg_date',$all->monthlydate->value);
                                        })
                                        ->when($print_report == 'A' && count($countries) == 0 && count($status) > 0, function ($query) use ($all,$countries, $status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                                            ->whereIn('registrations.status', $status);
                                        })
                                        ->when($print_report == 'A' && count($countries) == 0 && count($status) == 0, function ($query) use ($all,$countries, $status) {
                                            return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereMonth('reg_date',$all->monthlydate->value);
                                        })
                                        ->orderBy('print_report_portion',"DESC")
                                        ->orderBy('serial_no',"ASC")
                                        ->get();
            }
            elseif($all->datafreq == 'Yearly')
            {
                    $data = Registrations::select('candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('center_id', $all->centreID)
                                            ->when($print_report == 'A-B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) > 0, function ($query) use ($all, $countries,$status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereIn('country', $countries)
                                                            ->whereIn('registrations.status', $status)
                                                                ->whereYear('reg_date',$all->yearlydate)
                                                                ->orWhere(function ($query) use ($countries, $status) {
                                                                    $query->where('print_report_portion','B')->whereIn('country',$countries)->whereIn('registrations.status',$status);
                                                                });
                                            })
                                            ->when($print_report == 'A-B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) == 0, function ($query) use ($all, $countries) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereIn('country', $countries)
                                                                ->whereYear('reg_date',$all->yearlydate)
                                                                ->orWhere(function ($query) use ($countries) {
                                                                    $query->where('print_report_portion','B')->whereIn('country',$countries);
                                                                });
                                            })
                                            ->when($print_report == 'A-B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) > 0, function ($query) use ($all, $countries) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereNotIn('country', $countries)
                                                            ->whereIn('registrations.status', $status)
                                                                ->whereYear('reg_date',$all->yearlydate)
                                                                ->orWhere(function ($query) use ($countries, $status) {
                                                                    $query->where('print_report_portion','B')->whereNotIn('country',$countries)->whereIn('registrations.status',$status);
                                                                });
                                            })
                                            ->when($print_report == 'A-B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) == 0, function ($query) use ($all, $countries) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereNotIn('country', $countries)
                                                                ->whereYear('reg_date',$all->yearlydate)
                                                                ->orWhere(function ($query) use ($countries) {
                                                                    $query->where('print_report_portion','B')->whereNotIn('country',$countries);
                                                                });
                                            })
                                            ->when($print_report == 'A-B' && count($countries) == 0 && count($status) > 0, function ($query) use ($all, $countries) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereIn('registrations.status', $status)
                                                                ->whereYear('reg_date',$all->yearlydate)
                                                                ->orWhere(function ($query) use ($status) {
                                                                    $query->where('print_report_portion','B')->whereIn('registrations.status',$status);
                                                                });
                                            })
                                            ->when($print_report == 'A-B' && count($countries) == 0 && count($status) == 0, function ($query) use ($all, $countries) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                                ->whereYear('reg_date',$all->yearlydate)
                                                                ->orWhere(function ($query) {
                                                                    $query->where('print_report_portion','B');
                                                                });
                                            })
                                            ->when($print_report == 'B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) > 0, function ($query) use ($print_report,$countries,$status) {
                                                return $query->where('print_report_portion', $print_report)->whereIn('country', $countries)
                                                            ->whereIn('registrations.status', $status);
                                            })
                                            ->when($print_report == 'B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) == 0, function ($query) use ($print_report,$countries) {
                                                return $query->where('print_report_portion', $print_report)->whereIn('country', $countries);
                                            })
                                            ->when($print_report == 'B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) > 0, function ($query) use ($print_report, $status) {
                                                return $query->where('print_report_portion', $print_report)->whereNotIn('country', $countries)
                                                            ->whereIn('registrations.status', $status);
                                            })
                                            ->when($print_report == 'B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) == 0, function ($query) use ($print_report, $countries,$status) {
                                                return $query->where('print_report_portion', $print_report)->whereNotIn('country', $countries);
                                            })
                                            ->when($print_report == 'B' && count($countries) == 0 && count($status) > 0, function ($query) use ($print_report, $status) {
                                                return $query->where('print_report_portion', $print_report)
                                                            ->whereIn('registrations.status', $status);
                                            })
                                            ->when($print_report == 'B' && count($countries) == 0 && count($status) == 0, function ($query) use ($print_report, $status) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) > 0, function ($query) use ($all,$countries, $status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereIn('country', $countries)
                                                                ->whereYear('reg_date',$all->yearlydate)
                                                                ->whereIn('registrations.status', $status);
                                            })
                                            ->when($print_report == 'A' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) == 0, function ($query) use ($all,$countries, $status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereIn('country', $countries)
                                                                ->whereYear('reg_date',$all->yearlydate);
                                            })
                                            ->when($print_report == 'A' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) > 0, function ($query) use ($all,$countries, $status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereNotIn('country', $countries)
                                                                ->whereYear('reg_date',$all->yearlydate)
                                                                ->whereIn('registrations.status', $status);
                                            })
                                            ->when($print_report == 'A' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) == 0, function ($query) use ($all,$countries, $status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                                ->whereNotIn('country', $countries)
                                                                ->whereYear('reg_date',$all->yearlydate);
                                            })
                                            ->when($print_report == 'A' && count($countries) == 0 && count($status) > 0, function ($query) use ($all,$countries, $status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                                ->whereYear('reg_date',$all->yearlydate)
                                                                ->whereIn('registrations.status', $status);
                                            })
                                            ->when($print_report == 'A' && count($countries) == 0 && count($status) == 0, function ($query) use ($all,$countries, $status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                                ->whereYear('reg_date',$all->yearlydate);
                                            })
                                            ->orderBy('print_report_portion',"DESC")
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                    $data = Registrations::select('candidates.passport_no as pp_#','candidates.candidate_name as name','relative_name as s/d/w/o','country','agency','serial_no as serial_#','reg_date as date', 'print_report_portion', 'registrations.status')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('center_id', $all->centreID)
                                            ->when($print_report == 'A-B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) > 0, function ($query) use ($all, $countries,$status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereIn('country', $countries)
                                                            ->whereIn('registrations.status', $status)
                                                                ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                                ->orWhere(function ($query) use ($countries, $status) {
                                                                    $query->where('print_report_portion','B')->whereIn('country',$countries)->whereIn('registrations.status',$status);
                                                                });
                                            })
                                            ->when($print_report == 'A-B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) == 0, function ($query) use ($all, $countries) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereIn('country', $countries)
                                                                ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                                ->orWhere(function ($query) use ($countries) {
                                                                    $query->where('print_report_portion','B')->whereIn('country',$countries);
                                                                });
                                            })
                                            ->when($print_report == 'A-B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) > 0, function ($query) use ($all, $countries) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereNotIn('country', $countries)
                                                            ->whereIn('registrations.status', $status)
                                                                ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                                ->orWhere(function ($query) use ($countries, $status) {
                                                                    $query->where('print_report_portion','B')->whereNotIn('country',$countries)->whereIn('registrations.status',$status);
                                                                });
                                            })
                                            ->when($print_report == 'A-B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) == 0, function ($query) use ($all, $countries) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereNotIn('country', $countries)
                                                                ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                                ->orWhere(function ($query) use ($countries) {
                                                                    $query->where('print_report_portion','B')->whereNotIn('country',$countries);
                                                                });
                                            })
                                            ->when($print_report == 'A-B' && count($countries) == 0 && count($status) > 0, function ($query) use ($all, $countries) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereIn('registrations.status', $status)
                                                                ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                                ->orWhere(function ($query) use ($status) {
                                                                    $query->where('print_report_portion','B')->whereIn('registrations.status',$status);
                                                                });
                                            })
                                            ->when($print_report == 'A-B' && count($countries) == 0 && count($status) == 0, function ($query) use ($all, $countries) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                                ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                                ->orWhere(function ($query) {
                                                                    $query->where('print_report_portion','B');
                                                                });
                                            })
                                            ->when($print_report == 'B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) > 0, function ($query) use ($print_report,$countries,$status) {
                                                return $query->where('print_report_portion', $print_report)->whereIn('country', $countries)
                                                            ->whereIn('registrations.status', $status);
                                            })
                                            ->when($print_report == 'B' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) == 0, function ($query) use ($print_report,$countries) {
                                                return $query->where('print_report_portion', $print_report)->whereIn('country', $countries);
                                            })
                                            ->when($print_report == 'B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) > 0, function ($query) use ($print_report, $status) {
                                                return $query->where('print_report_portion', $print_report)->whereNotIn('country', $countries)
                                                            ->whereIn('registrations.status', $status);
                                            })
                                            ->when($print_report == 'B' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) == 0, function ($query) use ($print_report, $countries,$status) {
                                                return $query->where('print_report_portion', $print_report)->whereNotIn('country', $countries);
                                            })
                                            ->when($print_report == 'B' && count($countries) == 0 && count($status) > 0, function ($query) use ($print_report, $status) {
                                                return $query->where('print_report_portion', $print_report)
                                                            ->whereIn('registrations.status', $status);
                                            })
                                            ->when($print_report == 'B' && count($countries) == 0 && count($status) == 0, function ($query) use ($print_report, $status) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) > 0, function ($query) use ($all,$countries, $status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereIn('country', $countries)
                                                                ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                                ->whereIn('registrations.status', $status);
                                            })
                                            ->when($print_report == 'A' && ($all->inclusion == 'Yes' && count($countries) > 0) && count($status) == 0, function ($query) use ($all,$countries, $status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereIn('country', $countries)
                                                                ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange);
                                            })
                                            ->when($print_report == 'A' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) > 0, function ($query) use ($all,$countries, $status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereNotIn('country', $countries)
                                                                ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                                ->whereIn('registrations.status', $status);
                                            })
                                            ->when($print_report == 'A' && ($all->inclusion == 'No' && count($countries) > 0) && count($status) == 0, function ($query) use ($all,$countries, $status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                                ->whereNotIn('country', $countries)
                                                                ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange);
                                            })
                                            ->when($print_report == 'A' && count($countries) == 0 && count($status) > 0, function ($query) use ($all,$countries, $status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                                ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                                ->whereIn('registrations.status', $status);
                                            })
                                            ->when($print_report == 'A' && count($countries) == 0 && count($status) == 0, function ($query) use ($all,$countries, $status) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                                ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange);
                                            })
                                            ->orderBy('print_report_portion',"DESC")
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
            }

            return response()->json(['data' => $data,'keys' => $keys],200);
        }
        elseif($all->report_type->value == 'lab_report')
        {
            $key = new stdClass();
            $key->name = ($all->code_type == 'serial') ? "s.no" : 'code';
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "name";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "rbs";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "serum_creatinine_(mg/dl)";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "vdrl_/_tpha";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "serum_bilirubin_(mg/dl)";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "alt_u/l";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "ast_u/l";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "alp_u/l";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "hb_(g/dl)";
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
            $key->name = "hbsag";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "hiv_1,2";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "anti_hcv";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "sugar";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "albumin";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "bile_salt/pigment";
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
                    $data = Registrations::select('candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv_1,2',DB::raw("CONCAT(vdrl,'/',tpha) as 'vdrl_/_tpha'"),
                                                    'rbs','bil as serum_bilirubin_(mg/dl)','alt as alt_u/l','alk as alp_u/l','ast as ast_u/l','creatinine as serum_creatinine_(mg/dl)','blood_group','haemoglobin as hb_(g/dl)',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->where('lab_sticker.centre_id', $all->centreID)
                                            ->when($all->code_type == 'serial', function ($query) {
                                                return $query->addSelect('serial_no as s.no');
                                            })
                                            ->when($all->code_type == 'code', function ($query) {
                                                return $query->addSelect(DB::raw('SUBSTRING(lab_sticker.sticker_value_2,1,4) as code'));
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv_1,2',DB::raw("CONCAT(vdrl,'/',tpha) as 'vdrl_/_tpha'"),
                                                    'rbs','bil as serum_bilirubin_(mg/dl)','alt as alt_u/l','alk as alp_u/l','ast as ast_u/l','creatinine as serum_creatinine_(mg/dl)','blood_group','haemoglobin as hb_(g/dl)',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->where('center_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->where('lab_sticker.centre_id', $all->centreID)
                                            ->when($all->code_type == 'serial', function ($query) {
                                                return $query->addSelect('serial_no as s.no');
                                            })
                                            ->when($all->code_type == 'code', function ($query) {
                                                return $query->addSelect(DB::raw('SUBSTRING(lab_sticker.sticker_value_2,1,4) as code'));
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv_1,2',DB::raw("CONCAT(vdrl,'/',tpha) as 'vdrl_/_tpha'"),
                                                    'rbs','bil as serum_bilirubin_(mg/dl)','alt as alt_u/l','alk as alp_u/l','ast as ast_u/l','creatinine as serum_creatinine_(mg/dl)','blood_group','haemoglobin as hb_(g/dl)',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereMonth('reg_date',$all->monthlydate->value);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->where('lab_sticker.centre_id', $all->centreID)
                                            ->when($all->code_type == 'serial', function ($query) {
                                                return $query->addSelect('serial_no as s.no');
                                            })
                                            ->when($all->code_type == 'code', function ($query) {
                                                return $query->addSelect(DB::raw('SUBSTRING(lab_sticker.sticker_value_2,1,4) as code'));
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv_1,2',DB::raw("CONCAT(vdrl,'/',tpha) as 'vdrl_/_tpha'"),
                                                    'rbs','bil as serum_bilirubin_(mg/dl)','alt as alt_u/l','alk as alp_u/l','ast as ast_u/l','creatinine as serum_creatinine_(mg/dl)','blood_group','haemoglobin as hb_(g/dl)',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->where('center_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereMonth('reg_date',$all->monthlydate->value);
                                            })
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->where('lab_sticker.centre_id', $all->centreID)
                                            ->when($all->code_type == 'serial', function ($query) {
                                                return $query->addSelect('serial_no as s.no');
                                            })
                                            ->when($all->code_type == 'code', function ($query) {
                                                return $query->addSelect(DB::raw('SUBSTRING(lab_sticker.sticker_value_2,1,4) as code'));
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv_1,2',DB::raw("CONCAT(vdrl,'/',tpha) as 'vdrl_/_tpha'"),
                                                    'rbs','bil as serum_bilirubin_(mg/dl)','alt as alt_u/l','alk as alp_u/l','ast as ast_u/l','creatinine as serum_creatinine_(mg/dl)','blood_group','haemoglobin as hb_(g/dl)',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereYear('reg_date',$all->yearlydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereYear('reg_date',$all->yearlydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->where('lab_sticker.centre_id', $all->centreID)
                                            ->when($all->code_type == 'serial', function ($query) {
                                                return $query->addSelect('serial_no as s.no');
                                            })
                                            ->when($all->code_type == 'code', function ($query) {
                                                return $query->addSelect(DB::raw('SUBSTRING(lab_sticker.sticker_value_2,1,4) as code'));
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv_1,2',DB::raw("CONCAT(vdrl,'/',tpha) as 'vdrl_/_tpha'"),
                                                    'rbs','bil as serum_bilirubin_(mg/dl)','alt as alt_u/l','alk as alp_u/l','ast as ast_u/l','creatinine as serum_creatinine_(mg/dl)','blood_group','haemoglobin as hb_(g/dl)',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->where('center_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereYear('reg_date',$all->yearlydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->whereYear('reg_date',$all->yearlydate);
                                            })
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->where('lab_sticker.centre_id', $all->centreID)
                                            ->when($all->code_type == 'serial', function ($query) {
                                                return $query->addSelect('serial_no as s.no');
                                            })
                                            ->when($all->code_type == 'code', function ($query) {
                                                return $query->addSelect(DB::raw('SUBSTRING(lab_sticker.sticker_value_2,1,4) as code'));
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv_1,2',DB::raw("CONCAT(vdrl,'/',tpha) as 'vdrl_/_tpha'"),
                                                    'rbs','bil as serum_bilirubin_(mg/dl)','alt as alt_u/l','alk as alp_u/l','ast as ast_u/l','creatinine as serum_creatinine_(mg/dl)','blood_group','haemoglobin as hb_(g/dl)',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->where('lab_sticker.centre_id', $all->centreID)
                                            ->when($all->code_type == 'serial', function ($query) {
                                                return $query->addSelect('serial_no as s.no');
                                            })
                                            ->when($all->code_type == 'code', function ($query) {
                                                return $query->addSelect(DB::raw('SUBSTRING(lab_sticker.sticker_value_2,1,4) as code'));
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.candidate_name as name',
                                                    'hcv as anti_hcv','hbsag','hiv as hiv_1,2',DB::raw("CONCAT(vdrl,'/',tpha) as 'vdrl_/_tpha'"),
                                                    'rbs','bil as serum_bilirubin_(mg/dl)','alt as alt_u/l','alk as alp_u/l','ast as ast_u/l','creatinine as serum_creatinine_(mg/dl)','blood_group','haemoglobin as hb_(g/dl)',
                                                    'malaria as malarial_parasite','micro_filariae as micro-filariae','sugar','albumin',
                                                    'helminthes','ova','cyst','tb as tb_test','pregnancy as pregnancy_test_(females_only)')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('lab_result','lab_result.reg_id','registrations.reg_id')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->where('center_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                            ->where('reg_date','>=',$all->fromRange)
                                                            ->where('reg_date','<=',$all->toRange);
                                            })
                                            ->where('lab_result.centre_id', $all->centreID)
                                            ->where('lab_sticker.centre_id', $all->centreID)
                                            ->when($all->code_type == 'serial', function ($query) {
                                                return $query->addSelect('serial_no as s.no');
                                            })
                                            ->when($all->code_type == 'code', function ($query) {
                                                return $query->addSelect(DB::raw('SUBSTRING(lab_sticker.sticker_value_2,1,4) as code'));
                                            })
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

            if($all->datafreq == 'Daily')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('candidates.passport_no',
                                                    'serial_no as s.no',
                                                    'place_of_issue',
                                                    'slip_issue_date','slip_expiry_date','remarks as comment')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('reg_date',$all->dailydate)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A','B']);
                                        })
                                        ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.passport_no',
                                                    'serial_no as s.no',
                                                    'place_of_issue',
                                                    'slip_issue_date','slip_expiry_date','remarks as comment')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('reg_date',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A','B']);
                                        })
                                        ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
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
                                                    'slip_issue_date','slip_expiry_date','remarks as comment')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A','B']);
                                        })
                                        ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.passport_no',
                                                    'serial_no as s.no',
                                                    'place_of_issue',
                                                    'slip_issue_date','slip_expiry_date','remarks as comment')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                            ->where('center_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A','B']);
                                        })
                                        ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
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
                                                    'slip_issue_date','slip_expiry_date','remarks as comment')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A','B']);
                                        })
                                        ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.passport_no',
                                                    'serial_no as s.no',
                                                    'place_of_issue',
                                                    'slip_issue_date','slip_expiry_date','remarks as comment')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A','B']);
                                        })
                                        ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
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
                                                    'slip_issue_date','slip_expiry_date','remarks as comment')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A','B']);
                                        })
                                        ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('candidates.passport_no',
                                                    'serial_no as s.no',
                                                    'place_of_issue',
                                                    'slip_issue_date','slip_expiry_date','remarks as comment')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A','B']);
                                        })
                                        ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }

            return response()->json(['data' => $data,'keys' => $keys],200);
        }
        elseif($all->report_type->value == 'code_list_report')
        {
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
                    $data = Registrations::select('lab_sticker.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->where('registrations.reg_date',$all->dailydate)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A','B']);
                                            })
                                            ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('lab_sticker.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->where('registrations.reg_date',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                            return $query->whereIn('print_report_portion', ['A-B','A','B']);
                                        })
                                        ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
                                            return $query->where('print_report_portion', $print_report);
                                        })
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('lab_sticker.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->whereMonth('registrations.reg_date',$all->monthlydate->value)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('lab_sticker.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->whereMonth('registrations.reg_date',$all->monthlydate->value)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A','B']);
                                            })
                                            ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('lab_sticker.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->whereYear('registrations.reg_date',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('lab_sticker.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->whereYear('registrations.reg_date',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A','B']);
                                            })
                                            ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('lab_sticker.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->where('registrations.reg_date','>=',$all->fromRange)
                                            ->where('registrations.reg_date','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('sticker_value_2', '!=', NULL)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('lab_sticker.sticker_value_2 as code',
                                                    'serial_no')
                                            ->join('lab_sticker','lab_sticker.reg_id','registrations.reg_id')
                                            ->where('lab_sticker.created_at','>=',$all->fromRange)
                                            ->where('lab_sticker.created_at','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
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
            $key->name = "serial_no";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "candidate_name";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "feedback";
            array_push($keys, $key);

            $key = new stdClass();
            $key->name = "comments";
            array_push($keys, $key);

            if($all->datafreq == 'Daily')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('feedback.status as feedback','serial_no','candidate_name','feedback.comments')
                                            ->join('feedback','feedback.reg_id','registrations.reg_id')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereDate('feedback.created_at',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('feedback.status as feedback','serial_no','candidate_name','feedback.comments')
                                            ->join('feedback','feedback.reg_id','registrations.reg_id')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereDate('feedback.created_at',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('feedback.status as feedback','serial_no','candidate_name','feedback.comments')
                                            ->join('feedback','feedback.reg_id','registrations.reg_id')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereMonth('feedback.created_at',$all->monthlydate->value)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('feedback.status as feedback','serial_no','candidate_name','feedback.comments')
                                            ->join('feedback','feedback.reg_id','registrations.reg_id')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereMonth('feedback.created_at',$all->monthlydate->value)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('feedback.status as feedback','serial_no','candidate_name','feedback.comments')
                                            ->join('feedback','feedback.reg_id','registrations.reg_id')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereYear('feedback.created_at',$all->yearlydate)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('feedback.status as feedback','serial_no','candidate_name','feedback.comments')
                                            ->join('feedback','feedback.reg_id','registrations.reg_id')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->whereYear('feedback.created_at',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select('feedback.status as feedback','serial_no','candidate_name','feedback.comments')
                                            ->join('feedback','feedback.reg_id','registrations.reg_id')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('feedback.created_at','>=',$all->fromRange)
                                            ->where('feedback.created_at','<=',$all->toRange)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->orderBy('serial_no',"ASC")
                                            ->get();
                }
                else
                {
                    $data = Registrations::select('feedback.status as feedback','serial_no','candidate_name','feedback.comments')
                                            ->join('feedback','feedback.reg_id','registrations.reg_id')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->where('feedback.created_at','>=',$all->fromRange)
                                            ->where('feedback.created_at','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
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
                    $data = Registrations::select(DB::raw("DATE_FORMAT(xray_result.created_at, '%Y-%m-%e') as date"),'candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->where('reg_date',$all->dailydate)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->get();
                }
                else
                {
                    $data = Registrations::select(DB::raw("DATE_FORMAT(xray_result.created_at, '%Y-%m-%e') as date"),'candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->where('reg_date',$all->dailydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Monthly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select(DB::raw("DATE_FORMAT(xray_result.created_at, '%Y-%m-%e') as date"),'candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->get();
                }
                else
                {
                    $data = Registrations::select(DB::raw("DATE_FORMAT(xray_result.created_at, '%Y-%m-%e') as date"),'candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->whereMonth('reg_date',$all->monthlydate->value)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Yearly')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select(DB::raw("DATE_FORMAT(xray_result.created_at, '%Y-%m-%e') as date"),'candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->get();
                }
                else
                {
                    $data = Registrations::select(DB::raw("DATE_FORMAT(xray_result.created_at, '%Y-%m-%e') as date"),'candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->whereYear('reg_date',$all->yearlydate)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->get();
                }
            }
            elseif($all->datafreq == 'Custom Date Range')
            {
                if(count($countries) > 0)
                {
                    $data = Registrations::select(DB::raw("DATE_FORMAT(xray_result.created_at, '%Y-%m-%e') as date"),'candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
                                                return $query->whereIn('country', $countries);
                                            })
                                            ->when($all->inclusion == 'No', function ($query) use ($countries) {
                                                return $query->whereNotIn('country', $countries);
                                            })
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->get();
                }
                else
                {
                    $data = Registrations::select(DB::raw("DATE_FORMAT(xray_result.created_at, '%Y-%m-%e') as date"),'candidate_name as name','passport_no as passport_no.','notes as reporting')
                                            ->join('candidates','candidates.id','registrations.candidate_id')
                                            ->join('xray_result','xray_result.reg_id','registrations.reg_id')
                                            ->where('reg_date','>=',$all->fromRange)
                                            ->where('reg_date','<=',$all->toRange)
                                            ->where('center_id', $all->centreID)
                                            ->where('centre_id', $all->centreID)
                                            ->when($print_report == 'A-B', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate)
                                                             ->orWhere('print_report_portion','B');
                                            })
                                            ->when($print_report == 'B', function ($query) use ($print_report) {
                                                return $query->where('print_report_portion', $print_report);
                                            })
                                            ->when($print_report == 'A', function ($query) use ($all) {
                                                return $query->whereIn('print_report_portion', ['A-B','A'])
                                                             ->where('reg_date',$all->dailydate);
                                            })
                                            ->get();
                }
            }

            return response()->json(['data' => $data,'keys' => $keys],200);
        }
        // elseif($all->report_type->value == 'summary_report')
        // {
        //     $key = new stdClass();
        //     $key->name = "date";
        //     array_push($keys, $key);

        //     $key = new stdClass();
        //     $key->name = "name";
        //     array_push($keys, $key);

        //     $key = new stdClass();
        //     $key->name = "passport_no.";
        //     array_push($keys, $key);

        //     $key = new stdClass();
        //     $key->name = "reporting";
        //     array_push($keys, $key);

        //     if($all->datafreq == 'Daily')
        //     {
        //         if(count($countries) > 0)
        //         {
        //             $data = Registrations::select("country", DB::raw("count(country) as cases"))
        //                                     ->where('reg_date',$all->dailydate)
        //                                     ->when($print_report == 'A-B', function ($query) use ($all) {
        //                                         return $query->whereIn('print_report_portion', ['A-B','A','B']);
        //                                     })
        //                                     ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
        //                                         return $query->where('print_report_portion', $print_report);
        //                                     })
        //                                     ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
        //                                         return $query->whereIn('country', $countries);
        //                                     })
        //                                     ->when($all->inclusion == 'No', function ($query) use ($countries) {
        //                                         return $query->whereNotIn('country', $countries);
        //                                     })
        //                                     ->where('center_id', $all->centreID)
        //                                     ->groupBy("country")
        //                                     ->get();
        //         }
        //         else
        //         {
        //             $data = Registrations::select("country", DB::raw("count(country) as cases"))
        //                                     ->where('reg_date',$all->dailydate)
        //                                     ->when($print_report == 'A-B', function ($query) use ($all) {
        //                                         return $query->whereIn('print_report_portion', ['A-B','A','B']);
        //                                     })
        //                                     ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
        //                                         return $query->where('print_report_portion', $print_report);
        //                                     })
        //                                     ->where('center_id', $all->centreID)
        //                                     ->groupBy("country")
        //                                     ->get();
        //         }
        //     }
        //     elseif($all->datafreq == 'Monthly')
        //     {
        //         if(count($countries) > 0)
        //         {
        //             $data = Registrations::select("country", DB::raw("count(country) as cases"))
        //                                     ->where('reg_date',$all->dailydate)
        //                                     ->when($print_report == 'A-B', function ($query) use ($all) {
        //                                         return $query->whereIn('print_report_portion', ['A-B','A','B']);
        //                                     })
        //                                     ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
        //                                         return $query->where('print_report_portion', $print_report);
        //                                     })
        //                                     ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
        //                                         return $query->whereIn('country', $countries);
        //                                     })
        //                                     ->when($all->inclusion == 'No', function ($query) use ($countries) {
        //                                         return $query->whereNotIn('country', $countries);
        //                                     })
        //                                     ->where('center_id', $all->centreID)
        //                                     ->groupBy("country")
        //                                     ->get();
        //         }
        //         else
        //         {
        //             $data = Registrations::select(DB::raw("DATE_FORMAT(xray_result.created_at, '%Y-%m-%e') as date"),'candidate_name as name','passport_no as passport_no.','notes as reporting')
        //                                     ->join('candidates','candidates.id','registrations.candidate_id')
        //                                     ->join('xray_result','xray_result.reg_id','registrations.reg_id')
        //                                     ->whereMonth('reg_date',$all->monthlydate->value)
        //                                     ->where('center_id', $all->centreID)
        //                                     ->where('centre_id', $all->centreID)
        //                                     ->when($print_report == 'A-B', function ($query) use ($all) {
        //                                         return $query->whereIn('print_report_portion', ['A-B','A','B']);
        //                                     })
        //                                     ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
        //                                         return $query->where('print_report_portion', $print_report);
        //                                     })
        //                                     ->get();
        //         }
        //     }
        //     elseif($all->datafreq == 'Yearly')
        //     {
        //         if(count($countries) > 0)
        //         {
        //             $data = Registrations::select(DB::raw("DATE_FORMAT(xray_result.created_at, '%Y-%m-%e') as date"),'candidate_name as name','passport_no as passport_no.','notes as reporting')
        //                                     ->join('candidates','candidates.id','registrations.candidate_id')
        //                                     ->join('xray_result','xray_result.reg_id','registrations.reg_id')
        //                                     ->whereYear('reg_date',$all->yearlydate)
        //                                     ->when($print_report == 'A-B', function ($query) use ($all) {
        //                                         return $query->whereIn('print_report_portion', ['A-B','A','B']);
        //                                     })
        //                                     ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
        //                                         return $query->where('print_report_portion', $print_report);
        //                                     })
        //                                     ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
        //                                         return $query->whereIn('country', $countries);
        //                                     })
        //                                     ->when($all->inclusion == 'No', function ($query) use ($countries) {
        //                                         return $query->whereNotIn('country', $countries);
        //                                     })
        //                                     ->where('center_id', $all->centreID)
        //                                     ->where('centre_id', $all->centreID)
        //                                     ->get();
        //         }
        //         else
        //         {
        //             $data = Registrations::select(DB::raw("DATE_FORMAT(xray_result.created_at, '%Y-%m-%e') as date"),'candidate_name as name','passport_no as passport_no.','notes as reporting')
        //                                     ->join('candidates','candidates.id','registrations.candidate_id')
        //                                     ->join('xray_result','xray_result.reg_id','registrations.reg_id')
        //                                     ->whereYear('reg_date',$all->yearlydate)
        //                                     ->where('center_id', $all->centreID)
        //                                     ->where('centre_id', $all->centreID)
        //                                     ->when($print_report == 'A-B', function ($query) use ($all) {
        //                                         return $query->whereIn('print_report_portion', ['A-B','A','B']);
        //                                     })
        //                                     ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
        //                                         return $query->where('print_report_portion', $print_report);
        //                                     })
        //                                     ->get();
        //         }
        //     }
        //     elseif($all->datafreq == 'Custom Date Range')
        //     {
        //         if(count($countries) > 0)
        //         {
        //             $data = Registrations::select(DB::raw("DATE_FORMAT(xray_result.created_at, '%Y-%m-%e') as date"),'candidate_name as name','passport_no as passport_no.','notes as reporting')
        //                                     ->join('candidates','candidates.id','registrations.candidate_id')
        //                                     ->join('xray_result','xray_result.reg_id','registrations.reg_id')
        //                                     ->where('reg_date','>=',$all->fromRange)
        //                                     ->where('reg_date','<=',$all->toRange)
        //                                     ->when($print_report == 'A-B', function ($query) use ($all) {
        //                                         return $query->whereIn('print_report_portion', ['A-B','A','B']);
        //                                     })
        //                                     ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
        //                                         return $query->where('print_report_portion', $print_report);
        //                                     })
        //                                     ->when($all->inclusion == 'Yes', function ($query) use ($countries) {
        //                                         return $query->whereIn('country', $countries);
        //                                     })
        //                                     ->when($all->inclusion == 'No', function ($query) use ($countries) {
        //                                         return $query->whereNotIn('country', $countries);
        //                                     })
        //                                     ->where('center_id', $all->centreID)
        //                                     ->where('centre_id', $all->centreID)
        //                                     ->get();
        //         }
        //         else
        //         {
        //             $data = Registrations::select(DB::raw("DATE_FORMAT(xray_result.created_at, '%Y-%m-%e') as date"),'candidate_name as name','passport_no as passport_no.','notes as reporting')
        //                                     ->join('candidates','candidates.id','registrations.candidate_id')
        //                                     ->join('xray_result','xray_result.reg_id','registrations.reg_id')
        //                                     ->where('reg_date','>=',$all->fromRange)
        //                                     ->where('reg_date','<=',$all->toRange)
        //                                     ->where('center_id', $all->centreID)
        //                                     ->where('centre_id', $all->centreID)
        //                                     ->when($print_report == 'A-B', function ($query) use ($all) {
        //                                         return $query->whereIn('print_report_portion', ['A-B','A','B']);
        //                                     })
        //                                     ->when($print_report == 'A' || $print_report == 'B', function ($query) use ($print_report) {
        //                                         return $query->where('print_report_portion', $print_report);
        //                                     })
        //                                     ->get();
        //         }
        //     }

        //     return response()->json(['data' => $data,'keys' => $keys],200);
        // }
    }

    public function export_report(request $request, $type)
    {
        $all = json_decode($request->getContent());

        $centre = Centres::find($all->centreID);

        $report = ReportModules::where('name',$all->report_type->value)->first();

        if($type == 'pdf')
        {

            $pdf = new Fpdf();
            if($all->report_type->value == 'reference_slip_report')
            {
                $pdf->AddPage('P', 'A4', '0');
            }
            else
            {
                $pdf->AddPage('L', 'Legal', '0');
            }

            $pdf->SetFont('Arial','B',14);
            $pdf->Ln(2);

            //Header Start
            $pdf->SetX(140); //The next cell will be set 100 units to the right
            if($all->report_type->value != 'reference_slip_report')
            {
                $pdf->Cell(40,0,$pdf->Image(asset('storage/app/public/centres/logos/'.$centre->image),$pdf->GetX(),$pdf->GetY(),70,20),0,0,'C',false);
            }
            $pdf->setFillColor(210,230,230);
            if($all->report_type->value != 'reference_slip_report')
            {
                $pdf->SetX(10);
                $pdf->Cell(65,7,$centre->name,0,1,'L',1);
                $pdf->Cell(100,6,$centre->address,0,1,'L',1);
                $pdf->Cell(35,6,$centre->city,0,0,'L',1);
            }
            else
            {
                $pdf->SetX(70);
                $pdf->Cell(65,7,$centre->name,0,1,'C',1);
                $pdf->SetX(50);
                $pdf->Cell(100,6,$report->title,0,1,'C',1);
            }
            $pdf->Ln(10);
            $pdf->Cell(45,8,'Code '.$centre->code,1,0, 'C',1);
            $pdf->SetX(15);
            if($all->report_type->value == 'reference_slip_report')
            {
                if($all->datafreq == 'Daily')
                {
                    $pdf->SetX(155);
                    $pdf->Cell(45,8,'Date : '. date('d-m-Y',strtotime($all->dailydate)),1,0, 'C',1);
                }
                elseif($all->datafreq == 'Monthly')
                {
                    $pdf->SetX(155);
                    $pdf->Cell(50,8,'Month of '. $all->monthlydate->label,1,0, 'C',1);
                }
                elseif($all->datafreq == 'Yearly')
                {
                    $pdf->SetX(160);
                    $pdf->Cell(45,8,'Year of '. $all->yearlydate,1,0, 'C',1);
                }
                elseif($all->datafreq == 'Custom Date Range')
                {
                    $pdf->SetX(145);
                    $pdf->Cell(60,8,date('d-m-Y',strtotime($all->fromRange)).' to '.date('d-m-Y',strtotime($all->toRange)),1,0, 'C',1);
                }
            }
            else
            {
                $pdf->Cell(0,4,$report->title,0,1,'C');
                if($all->datafreq == 'Daily')
                {
                    $pdf->SetX(295);
                    $pdf->Cell(45,8,'Date : '. date('d-m-Y',strtotime($all->dailydate)),1,0, 'C',1);
                }
                elseif($all->datafreq == 'Monthly')
                {
                    $pdf->SetX(295);
                    $pdf->Cell(50,8,'Month of '. $all->monthlydate->label,1,0, 'C',1);
                }
                elseif($all->datafreq == 'Yearly')
                {
                    $pdf->SetX(300);
                    $pdf->Cell(45,8,'Year of '. $all->yearlydate,1,0, 'C',1);
                }
                elseif($all->datafreq == 'Custom Date Range')
                {
                    $pdf->SetX(285);
                    $pdf->Cell(60,8,date('d-m-Y',strtotime($all->fromRange)).' to '.date('d-m-Y',strtotime($all->toRange)),1,0, 'C',1);
                }
            }


            $pdf->setFillColor(230,230,230);


            $measure = $this->report_measurements($all->report_type->value);

            if($all->report_type->value == 'lab_report') {
                $pdf->Ln(6);
                $pdf->SetFont('Arial','B',8);
                $pdf->SetX(15);
                // $pdf->Cell(15,35,'',1,0,'',1);
                $pdf->Ln(14);
                $pdf->Cell(15, 22, ($all->keys[0]->name == 's.no') ? 'S.No' : 'Code', 1, 0,'C',1);
                $pdf->SetX(25);
                $pdf->Cell(65, 22,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(35);
                $pdf->Cell(45, 50, 'Name', 0, 0,'C');
                $pdf->Ln(14);
                $pdf->SetX(90);
                $pdf->Cell(10, 22,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(90);
                $pdf->Cell(15, 50, 'RBS', 0, 0);
                $pdf->Ln(12);
                $pdf->Ln(2);
                $pdf->SetX(100);
                $pdf->Cell(20, 22,'',1,0,'',1);
                $pdf->Ln(-12);
                $pdf->SetX(102);
                $pdf->Cell(20, 35, 'Serum', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(102);
                $pdf->Cell(20, 30, 'Creatinine', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(102);
                $pdf->Cell(20, 25, 'mg/dl', 0, 0);
                // $pdf->Ln(2);
                $pdf->SetX(120);
                $pdf->Cell(15, 22,'',1,0,'',1);
                $pdf->Ln(-12);
                $pdf->SetX(121);
                $pdf->Cell(15, 35, 'VDRL/', 0, 0);
                $pdf->Ln(4);
                $pdf->SetX(121);
                $pdf->Cell(15, 34, 'TPHA', 0, 0);
                $pdf->Ln(6);
                $pdf->Ln(2);
                $pdf->SetX(135);
                $pdf->Cell(39, 8,'',1,0,'',1);
                $pdf->SetX(135);
                $pdf->Cell(39, 8, 'L.F.T', 0, 0,'C');
                $pdf->Ln(8);
                $pdf->SetX(135);
                $pdf->Cell(15, 14,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(135);
                $pdf->Cell(15, 32, 'Serum', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(135);
                $pdf->Cell(15, 27, 'Bilirubin', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(135);
                $pdf->Cell(15, 22, 'mg/dl', 0, 0);
                $pdf->Ln(2);
                $pdf->SetX(150);
                $pdf->Cell(8, 14,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(150);
                $pdf->Cell(8, 32, 'ALT', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(150);
                $pdf->Cell(8, 27, 'U/L', 0, 0);
                $pdf->Ln(6);
                $pdf->Ln(2);
                $pdf->SetX(158);
                $pdf->Cell(8, 14,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(158);
                $pdf->Cell(8, 32, 'AST', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(158);
                $pdf->Cell(8, 27, 'U/L', 0, 0);
                $pdf->Ln(6);
                $pdf->Ln(2);
                $pdf->SetX(166);
                $pdf->Cell(8, 14,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(166);
                $pdf->Cell(8, 32, 'ALP', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(166);
                $pdf->Cell(8, 27, 'U/L', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(118);
                $pdf->Cell(8, 22, '', 0, 0);
                $pdf->Ln(6);
                $pdf->Ln(-12);
                $pdf->SetX(174);
                $pdf->Cell(37, 8,'',1,0,'',1);
                $pdf->SetX(174);
                $pdf->Cell(37, 8, 'BLOOD', 0, 0,'C');
                $pdf->Ln(8);
                $pdf->SetX(174);
                $pdf->Cell(10, 14,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(174);
                $pdf->Cell(10, 32, 'HB', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(174);
                $pdf->Cell(10, 27, 'g/dl', 0, 0);
                $pdf->Ln(8);
                $pdf->SetX(184);
                $pdf->Cell(28, 6,'',1,0,'',1);
                $pdf->SetX(184);
                $pdf->Cell(28, 6, 'Thick Film', 0, 0,'C');
                $pdf->Ln(6);
                $pdf->SetX(184);
                $pdf->Cell(14, 8,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(184);
                $pdf->Cell(14, 32, 'Malarial', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(184);
                $pdf->Cell(14, 26, 'Parasite', 0, 0);
                $pdf->Ln(8);
                $pdf->SetX(198);
                $pdf->Cell(13, 8,'',1,0,'',1);
                $pdf->Ln(-14);
                // $pdf->SetFont('Arial','B',7);
                $pdf->SetX(198);
                $pdf->Cell(13, 32, 'Micro-', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(198);
                $pdf->Cell(13, 26, 'filaria', 0, 0);
                $pdf->Ln(-6);
                $pdf->SetX(211);
                $pdf->Cell(12, 22,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(211);
                $pdf->Cell(12, 35, 'Blood', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(211);
                $pdf->Cell(12, 30, 'Group', 0, 0);
                $pdf->Ln(8);
                $pdf->SetX(222);
                $pdf->Cell(30, 8,'',1,0,'',1);
                $pdf->SetX(222);
                $pdf->Cell(30, 8, 'ELISA', 0, 0,'C');
                $pdf->Ln(8);
                $pdf->SetX(222);
                $pdf->Cell(9, 14,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(223);
                $pdf->Cell(8, 32, 'HBs', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(223);
                $pdf->Cell(8, 27, 'Ag', 0, 0);
                $pdf->Ln(8);
                $pdf->SetX(231);
                $pdf->Cell(10, 14,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(232);
                $pdf->Cell(8, 32, 'HIV', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(232);
                $pdf->Cell(8, 27, '1,2', 0, 0);
                $pdf->Ln(8);
                $pdf->SetX(241);
                $pdf->Cell(10, 14,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(242);
                $pdf->Cell(8, 32, 'Anti', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(242);
                $pdf->Cell(8, 27, 'HCV', 0, 0);
                $pdf->SetX(251);
                $pdf->Cell(36, 8,'',1,0,'',1);
                $pdf->SetX(251);
                $pdf->Cell(36, 8, 'URINE', 0, 0,'C');
                $pdf->Ln(8);
                $pdf->SetX(251);
                $pdf->Cell(10, 14,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(251);
                $pdf->Cell(10, 32, 'Sugar', 0, 0);
                $pdf->Ln(14);
                $pdf->SetX(261);
                $pdf->Cell(13, 14,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(261);
                $pdf->Cell(13, 32, 'Albumin', 0, 0);
                $pdf->Ln(14);
                $pdf->SetX(274);
                $pdf->Cell(13, 14,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(274);
                $pdf->Cell(13, 32, 'Bile', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(274);
                $pdf->Cell(13, 27, 'Salt/', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(274);
                $pdf->Cell(13, 22, 'pigment', 0, 0);
                $pdf->Ln(-6);
                $pdf->SetX(287);
                $pdf->Cell(24, 8,'',1,0,'',1);
                $pdf->SetX(287);
                $pdf->Cell(24, 8, 'STOOL', 0, 0,'C');
                $pdf->Ln(8);
                $pdf->SetX(287);
                $pdf->Cell(12, 14,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(288);
                $pdf->Cell(12, 32, 'OVA', 0, 0);
                $pdf->Ln(14);
                $pdf->SetX(299);
                $pdf->Cell(12, 14,'',1,0,'',1);
                $pdf->Ln(-14);
                $pdf->SetX(300);
                $pdf->Cell(12, 32, 'Cyst', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(311);
                $pdf->Cell(15, 22,'',1,0,'',1);
                $pdf->SetX(311);
                $pdf->Cell(15, 8, 'Pregn-', 0, 0);
                $pdf->Ln(5);
                $pdf->SetX(311);
                $pdf->Cell(15, 5, 'ancy', 0, 0);
                $pdf->Ln(-8);
                $pdf->SetX(311);
                $pdf->Cell(15, 28, 'Test', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(311);
                $pdf->Cell(15, 22, '(Females', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(311);
                $pdf->Cell(15, 16, 'Only)', 0, 0);
                $pdf->Ln(-9);
                $pdf->SetX(326);
                $pdf->Cell(14, 22,'',1,0,'',1);
                $pdf->SetX(326);
                $pdf->Cell(14, 8, 'TB', 0, 0);
                $pdf->Ln(6);
                $pdf->SetX(326);
                $pdf->Cell(14, 5, 'Test', 0, 0);
                $pdf->SetFont('Arial','B',8);
                $pdf->Ln(7);
            }
            else
            {
                $pdf->Ln(11);
                $pdf->SetFont('Arial','B',9);

                if($all->report_type->value == 'code_list_report')
                {
                    $data = (array)$all->data;

                    $pdf->SetX(10);
                    foreach($all->keys as $key)
                    {
                        if($key->name != '#' && isset($measure[$key->name]))
                        {
                            $pdf->Cell($measure[$key->name],9,strtoupper(str_replace('_',' ',$key->name)),1,0,'C',1);
                        }
                    }

                    if(count($data) > 15)
                    {
                        $pdf->SetX(135);
                        foreach($all->keys as $key)
                        {
                            if($key->name != '#' && isset($measure[$key->name]))
                            {
                                $pdf->Cell($measure[$key->name],9,strtoupper(str_replace('_',' ',$key->name)),1,0,'C',1);
                            }
                        }
                    }

                    if(count($data) > 30)
                    {
                        $pdf->SetX(250);
                        foreach($all->keys as $key)
                        {
                            if($key->name != '#' && isset($measure[$key->name]))
                            {
                                $pdf->Cell($measure[$key->name],9,strtoupper(str_replace('_',' ',$key->name)),1,0,'C',1);
                            }
                        }
                    }

                }
                elseif($all->report_type->value != 'code_list_report')
                {
                    //Body Cols
                    $pdf->SetX(10);
                    foreach($all->keys as $key)
                    {
                        if($key->name != '#' && isset($measure[$key->name]))
                        {
                            $pdf->Cell($measure[$key->name],9,strtoupper(str_replace('_',' ',$key->name)),1,0,'C',1);
                        }
                    }
                }
            }
            if($all->report_type->value != 'code_list_report')
            {
                $pdf->SetX(5);
            }
            //Body Rows
            $i = 0;
            if($all->report_type->value == 'status_report')
            {
                $prev_print = ($all->data[0]->print_report_portion == 'A-B' || $all->data[0]->print_report_portion == 'A') ? 'A' : 'B';
            }
            else
            {
                $prev_print = NULL;
            }
            if($all->report_type->value == 'status_report')
            {
                $pdf->Ln(9);
                $pdf->Cell(330, 9,'Portion  '.$prev_print, 1, 1,'',1);
                $i++;
            }
            foreach($all->data as $data)
            {
                $i++;
                if($i > 2 && $all->report_type->value == 'status_report')
                {
                    $pdf->Ln(9);
                }
                elseif($all->report_type->value != 'status_report')
                {
                    $pdf->Ln(9);
                }
                if($all->report_type->value == 'code_list_report' && ($i >=16 && $i <= 30) && $pdf->PageNo() == 1)
                {
                    if($i == 16)
                    {
                        $pdf->Ln(-135);
                    }
                    $pdf->SetX(135);
                }
                elseif($all->report_type->value == 'code_list_report' && ($i >=21 && $i <= 40) && $pdf->PageNo() != 1)
                {
                    if($i == 21)
                    {
                        $pdf->Ln(-180);
                    }
                    $pdf->SetX(135);
                }
                elseif($all->report_type->value == 'code_list_report' && ($i >=31 && $i <= 45) && $pdf->PageNo() == 1)
                {
                    if($i == 31)
                    {
                        $pdf->Ln(-135);
                    }
                    $pdf->SetX(250);
                }
                elseif($all->report_type->value == 'code_list_report' && ($i >=41 && $i <= 60) && $pdf->PageNo() != 1)
                {
                    if($i == 41)
                    {
                        $pdf->Ln(-180);
                    }
                    $pdf->SetX(250);
                }
                $arr = (array)$data;

                if($all->report_type->value == 'status_report')
                {
                    if($data->print_report_portion != $prev_print && (($data->print_report_portion == 'A-B' || $data->print_report_portion == 'A') && $prev_print != 'A'))
                    {
                        $prev_print = ($data->print_report_portion == 'A-B' || $data->print_report_portion == 'A') ? 'A' : 'B';
                        $pdf->Cell(330, 9,'Portion  '.$prev_print, 1, 1,'',1);
                        $i++;
                    }
                }

                foreach($all->keys as $key)
                {
                    if($key->name != '#' && isset($arr[$key->name]))
                    {
                        if($key->name == "vdrl_/_tpha" || $key->name == "hbsag" || $key->name == "anti_hcv" || $key->name == "sugar" || $key->name == "albumin" || $key->name == 'pregnancy_test_(females_only)' || $key->name == 'hiv_1,2')
                        {
                            if($arr[$key->name] == 'negative/positive' || $arr[$key->name] == 'positive/negative' || $arr[$key->name] == 'positive/positive' || $arr[$key->name] == 'positive')
                            {
                                $pdf->Cell($measure[$key->name],9,'+VE',1,0,'C');
                            }
                            elseif($arr[$key->name] == 'negative/negative' || $arr[$key->name] == 'negative')
                            {
                                $pdf->Cell($measure[$key->name],9,'-VE',1,0,'C');
                            }
                            else
                            {
                                $pdf->Cell($measure[$key->name],9,(isset($arr[$key->name])) ? $arr[$key->name] : '-',1,0,'C');
                            }
                        }
                        elseif($key->name == 'date' || $key->name == 'slip_issue_date' || $key->name == 'slip_expiry_date')
                        {
                            $pdf->Cell($measure[$key->name],9,(isset($arr[$key->name])) ? date('d-m-Y',strtotime($arr[$key->name])) : '-',1,0,'C');
                        }
                        else
                        {
                            if(isset($arr[$key->name]) && isset($measure[$key->name]))
                            {
                                if($key->name == 'comments' || $key->name == 'comment')
                                {
                                    if($pdf->GetStringWidth(trim($arr[$key->name]) ) > 36){
                                        // $pdf->SetMargins(0,1);
                                        $pdf->setFillColor(210,230,230);
                                        $pdf->MultiCell($measure[$key->name],4,(isset($arr[$key->name])) ? trim($arr[$key->name]) : '-',1,'C',1);
                                        // $pdf->Cell($measure[$key->name],9,(isset($arr[$key->name])) ? substr(trim($arr[$key->name]), 0, 36) : '-',1,0,'C');
                                    }
                                    else
                                    {
                                        $pdf->Cell($measure[$key->name],9,(isset($arr[$key->name])) ? trim($arr[$key->name]) : '-',1,'C');
                                    }
                                    $pdf->Ln(-9);
                                }
                                else
                                {
                                    $pdf->Cell($measure[$key->name],9,(isset($arr[$key->name])) ? trim($arr[$key->name]) : '-',1,0,'C');
                                }
                            }
                            elseif(isset($measure[$key->name]))
                            {
                                $pdf->Cell($measure[$key->name],9,'-',1,0,'C');
                            }
                        }

                    }
                }

                if(($i % 10 == 0 && $pdf->PageNo() == 1) && $all->report_type->value == 'lab_report')
                {
                    if($all->report_type->value == 'lab_report')
                    {
                        $pdf->Ln(11);
                        $pdf->SetFont('Arial','',11);
                        $pdf->SetX(270);
                        $pdf->Cell(80,0,$pdf->Image(asset('storage/app/public/lab_register_signature.jpg'),$pdf->GetX(),$pdf->GetY(),32,18),0,0,'L',false);
                        $pdf->SetX(230);
                        $pdf->Cell(80,20,"Checked By   _______________________",0,0,'R');
                        $pdf->Ln(5);
                        $pdf->Cell(645,10,'Page '.$pdf->PageNo().' of {nb}'.$pdf->AliasNbPages().'',0,0,'C');
                        $pdf->SetFont('Arial','B',8);
                        $i = 0;
                    }
                }
                elseif($i % 18 == 0 && $all->report_type->value == 'lab_report')
                {
                    if($all->report_type->value == 'lab_report')
                    {
                        $pdf->Ln(11);
                        $pdf->SetFont('Arial','',11);
                        $pdf->SetX(270);
                        $pdf->Cell(80,0,$pdf->Image(asset('storage/app/public/lab_register_signature.jpg'),$pdf->GetX(),$pdf->GetY(),32,18),0,0,'L',false);
                        $pdf->SetX(230);
                        $pdf->Cell(80,20,"Checked By   _______________________",0,0,'R');
                        $pdf->Ln(5);
                        $pdf->Cell(645,10,'Page '.$pdf->PageNo().' of {nb}'.$pdf->AliasNbPages().'',0,0,'C');
                        $pdf->SetFont('Arial','B',8);
                        $i = 0;
                    }
                    
                }

                if(($i % 11 == 0 && $pdf->PageNo() == 1) && $all->report_type->value == 'status_report' && $all->portion == 'A-B')
                {
                        $pdf->Ln(30);
                        $pdf->Cell(140,10, "_______________________", 0, 0);
                        $pdf->Cell(130,10, "_______________________", 0, 0);
                        $pdf->Cell(15,10, "____________________________", 0, 0);
                        $pdf->Ln(5);
                        $pdf->Cell(140,10, '           Prepared By ', 0, 0);
                        $pdf->Cell(130,10, '           Checked By ', 0, 0);
                        $pdf->Cell(195,10, '           Authorised Signature ', 0, 0);
                        $i = 0;
                }
                elseif($i % 19 == 0 && $all->report_type->value == 'status_report' && $all->portion == 'A-B')
                {
                        $pdf->Ln(25);
                        $pdf->Cell(140,10, "_______________________", 0, 0);
                        $pdf->Cell(130,10, "_______________________", 0, 0);
                        $pdf->Cell(15,10, "____________________________", 0, 0);
                        $pdf->Ln(5);
                        $pdf->Cell(140,10, '           Prepared By ', 0, 0);
                        $pdf->Cell(130,10, '           Checked By ', 0, 0);
                        $pdf->Cell(195,10, '           Authorised Signature ', 0, 0);
                        $i = 0;
                }
                elseif(($i % 11 == 0 && $pdf->PageNo() == 1) && $all->report_type->value == 'status_report' && ($all->portion == 'B' || $all->portion == 'A'))
                {
                        $pdf->Ln(30);
                        $pdf->Cell(140,10, "_______________________", 0, 0);
                        $pdf->Cell(130,10, "_______________________", 0, 0);
                        $pdf->Cell(15,10, "____________________________", 0, 0);
                        $pdf->Ln(5);
                        $pdf->Cell(140,10, '           Prepared By ', 0, 0);
                        $pdf->Cell(130,10, '           Checked By ', 0, 0);
                        $pdf->Cell(195,10, '           Authorised Signature ', 0, 0);
                        $i = 0;
                }
                elseif($i % 19 == 0 && $all->report_type->value == 'status_report' && ($all->portion == 'B' || $all->portion == 'A'))
                {
                        $pdf->Ln(25);
                        $pdf->Cell(140,10, "_______________________", 0, 0);
                        $pdf->Cell(130,10, "_______________________", 0, 0);
                        $pdf->Cell(15,10, "____________________________", 0, 0);
                        $pdf->Ln(5);
                        $pdf->Cell(140,10, '           Prepared By ', 0, 0);
                        $pdf->Cell(130,10, '           Checked By ', 0, 0);
                        $pdf->Cell(195,10, '           Authorised Signature ', 0, 0);
                        $i = 0;
                }

                if($i == 45 || $i == 60)
                {
                    $i = 0;
                }
            }

            if($all->report_type->value == 'lab_report')
            {
                        $pdf->Ln(11);
                        $pdf->SetFont('Arial','',11);
                        $pdf->SetX(270);
                        $pdf->Cell(80,0,$pdf->Image(asset('storage/app/public/lab_register_signature.jpg'),$pdf->GetX(),$pdf->GetY(),32,18),0,0,'L',false);
                        $pdf->SetX(230);
                        $pdf->Cell(80,20,"Checked By   _______________________",0,0,'R');
                        $pdf->Ln(5);
                    $pdf->Cell(645,10,'Page '.$pdf->PageNo().' of {nb}'.$pdf->AliasNbPages().'',0,0,'C');
                    $pdf->SetFont('Arial','B',8);
                    $i = 0;
            }
            elseif(($i <= 18 || $i <= 10) && $all->report_type->value == 'status_report')
            {
                $pdf->Ln(30);
                $pdf->Cell(140,10, "_______________________", 0, 0);
                $pdf->Cell(130,10, "_______________________", 0, 0);
                $pdf->Cell(15,10, "____________________________", 0, 0);
                $pdf->Ln(5);
                $pdf->Cell(140,10, '           Prepared By ', 0, 0);
                $pdf->Cell(130,10, '           Checked By ', 0, 0);
                $pdf->Cell(195,10, '           Authorised Signature ', 0, 0);
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
            foreach($all->keys as $key)
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
            fputcsv($file, array($centre->name,$report->title), $delimiter, $enclosure);
            fputcsv($file, array(), $delimiter, $enclosure);

            // Write the dynamically obtained header row
            fputcsv($file, $headings, $delimiter, $enclosure);

            // Write each data row
            foreach ($data as $row) {
                // Format data values dynamically (example assuming strings and dates)
                $changeRow = (array)$row;
                $formattedRow = [];
                foreach ($all->keys as $key) {
                    if(isset($changeRow[$key->name]))
                    {
                        if (is_string($changeRow[$key->name])) {
                            $formattedRow[] = $changeRow[$key->name]; // Enclose strings
                        } else if (is_date($row[$key->name])) {
                            $formattedRow[] = date('Y-m-d', strtotime($changeRow[$key->name])); // Format date
                        } else {
                            $formattedRow[] = $changeRow[$key->name]; // Handle other data types as needed
                        }
                    }
                }

                fputcsv($file, $formattedRow, $delimiter, $enclosure);
            }

            // Close the file
            fclose($file);

            if(copy($filepath, 'storage/app/public/excel_exports/'.$filepath))
            {
                return response()->json(['success' => true, 'filename' => asset('storage/app/public/excel_exports/'.$filepath)], 200);
            }
            else
            {
                return response()->json(['success' => false, 'filename' => NULL], 200);
            }
        }


    }

    public static function report_measurements($type)
    {
        if($type == 'registration_report')
        {
            $arr = array('serial_no' => 20, 'name' => 70, "father's_name" => 70, 'passport_no' => 30, 'agency' => 25, 'country' => 50, 'comments' => 70);
        }
        elseif($type == 'code_list_report')
        {
            $arr = array('serial_no' => 30, 'code' => 60);
        }
        elseif($type == 'eno_report')
        {
            $arr = array('date' => 30, 's.no' => 30, 'name' => '80', 'pp.no' => 35, 'e.no' => 40, 'remarks' => '115');
        }
        elseif($type == 'status_report')
        {
            $arr = array('date' => 20, "serial_#" => 20, "name" => 78, 's/d/w/o' => 70, 'pp_#' => 35, 'country' => 40, 'agency' => 45, 'status' => 22);
        }
        elseif($type == 'cash_report')
        {
            $arr = array('particulars' => 60, 'cases' => 25, "rate" => 30, 'amount' => 30, 'remarks' => 185);
        }
        elseif($type == 'feed_back_report')
        {
            $arr = array('serial_no' => 20, 'candidate_name' => 90, "feedback" => 30, 'comments' => 190);
        }
        elseif($type == 'lab_report')
        {
            $arr = array('s.no' => 15,'code' => 15,'name' => 65,
                        'rbs' => 10,
                        'serum_creatinine_(mg/dl)' => 20,
                        'vdrl_/_tpha' => 15,
                        'serum_bilirubin_(mg/dl)' => 15,
                        'alt_u/l' => 8,
                        'ast_u/l' => 8,
                        'alp_u/l' => 8,
                        'hb_(g/dl)' => 10,
                        'malarial_parasite' => 14,
                        'micro-filariae' => 13,
                        'blood_group' => 11,
                        'hbsag' => 9,
                        'hiv_1,2' => 10,
                        'anti_hcv' => 10,
                        'sugar' => 10,
                        'albumin' => 13,
                        'bile_salt/pigment' => 13,
                        'ova' => 12,
                        'cyst' => 12,
                        'pregnancy_test_(females_only)' => 15,
                        'tb_test' => 14);
        }
        elseif($type == 'reference_slip_report')
        {
            // $arr = array('passport_no' => 35, 's.no' => 30, 'place_of_issue' => 50, 'slip_issue_date' => 50, 'slip_expiry_date' => 50, 'comment' => 95);
            $arr = array('passport_no' => 30, 's.no' => 15, 'place_of_issue' => 40, 'slip_issue_date' => 35, 'slip_expiry_date' => 35, 'comment' => 35);
        }
        elseif($type == 'xray_report')
        {
            $arr = array('date' => 20, 'name' => 75, 'passport_no.' => 45, 'reporting' => 190);
        }
        else
        {
            $arr = array();
        }

        return $arr;
    }
}
