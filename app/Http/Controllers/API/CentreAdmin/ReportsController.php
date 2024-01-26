<?php

namespace App\Http\Controllers\API\CentreAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Centres;
use App\Models\ReportModules;
use App\Models\Country;

use App\Models\Registrations;

use stdClass;

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
    }
}
