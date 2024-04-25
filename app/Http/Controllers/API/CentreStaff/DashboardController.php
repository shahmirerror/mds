<?php

namespace App\Http\Controllers\API\CentreAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Registrations;
use App\Models\ReportIssue;
use App\Models\LabResult;

use DB;

class DashboardController extends Controller
{
    public function stats($centreID)
    {
        $today = date('Y-m-d');
        $country_cases = Registrations::select("country", DB::raw("count(country) as cases"))
                                        ->where('reg_date', $today)
                                        ->where('country', '!=', 'CASE CANCELLED')
                                        ->where('center_id', $centreID)
                                        ->groupBy("country")
                                        ->get();

        $total_cases = Registrations::where('reg_date', $today)
                                        ->where('country', '!=', 'CASE CANCELLED')
                                        ->where('center_id', $centreID)
                                        ->groupBy("country")
                                        ->count();

        $cancelled_cases = Registrations::where('reg_date', $today)
                                        ->where('country', '=', 'CASE CANCELLED')
                                        ->where('center_id', $centreID)
                                        ->count();

        $fit = Registrations::whereMonth('reg_date', $today)
                                ->where('status', '=', 'FIT')
                                ->where('center_id', $centreID)
                                ->count();

        $unfit = Registrations::whereMonth('reg_date', $today)
                                ->where('status', '=', 'UNFIT')
                                ->where('center_id', $centreID)
                                ->count();

        $reports_issued = ReportIssue::whereMonth('created_at', $today)
                                          ->where('centre_id', $centreID)
                                          ->count();

        $reports_in_hand = Registrations::join('report_issue','report_issue.reg_id','!=','registrations.reg_id')
                                          ->whereMonth('reg_date', $today)
                                          ->where('center_id', $centreID)
                                          ->where('centre_id', $centreID)
                                          ->count();

        $last_lab_update = LabResult::select('updated_at')
                                      ->where('centre_id', $centreID)
                                      ->where('updated_at','>','created_at')
                                      ->orderBy('updated_at','DESC')
                                      ->first();

        $ll_update;

        if($last_lab_update)
        {
            $ll_update = date('d M, Y (h:i:s A)', strtotime($last_lab_update->updated_at));
        }
        else
        {
            $ll_update = 'No Update Found';
        }

         return response()->json(['country_cases' => $country_cases,
                                  'cancelled_cases' => $cancelled_cases,
                                  'reports_issued' => $reports_issued,
                                  'reports_in_hand' => $reports_in_hand,
                                  'last_lab_update' => $ll_update,
                                  'fit' => $fit,
                                  'total_cases' => $total_cases,
                                  'unfit' => $unfit], 200);
    }

    public function stats_separate(request $request, $centreID)
    {
        $all = json_decode($request->getContent());

        $prev_7_days = date("Y-m-d",strtotime("-".$all->rate." days"));

        if($all->type == 'country_cases')
        {
            $country_cases = Registrations::select("country", DB::raw("count(country) as cases"))
                                            ->where('reg_date','>=' ,$prev_7_days)
                                            ->where('country', '!=', 'CASE CANCELLED')
                                            ->where('center_id', $centreID)
                                            ->groupBy("country")
                                            ->get();

            return response()->json(['result' => $country_cases], 200);
        }
        elseif($all->type == 'cancelled_cases')
        {
            $cancelled_cases = Registrations::where('reg_date','>=' ,$prev_7_days)
                                            ->where('country', '=', 'CASE CANCELLED')
                                            ->where('center_id', $centreID)
                                            ->count();
            return response()->json(['result' => $cancelled_cases], 200);
        }
        elseif($all->type == 'fit_unfit')
        {
            $fit = Registrations::where('reg_date','>=', $prev_7_days)
                                    ->where('status', '=', 'FIT')
                                    ->where('center_id', $centreID)
                                    ->count();

            $unfit = Registrations::where('reg_date','>=', $prev_7_days)
                                    ->where('status', '=', 'UNFIT')
                                    ->where('center_id', $centreID)
                                    ->count();

            return response()->json(['result1' => $fit, 'result2' => $unfit], 200);
        }
        elseif($all->type == 'reports_issued')
        {
            $reports_issued = ReportIssue::where('created_at','>=' ,$prev_7_days)
                                            ->where('centre_id', $centreID)
                                            ->count();
            return response()->json(['result' => $reports_issued], 200);
        }
        elseif($all->type == 'reports_in_hand')
        {
            $reports_in_hand = Registrations::join('report_issue','report_issue.reg_id','!=','registrations.reg_id')
                                            ->where('reg_date', '>=',$prev_7_days)
                                            ->where('center_id', $centreID)
                                            ->where('centre_id', $centreID)
                                            ->count();

            return response()->json(['result' => $reports_in_hand], 200);
        }
    }
}
