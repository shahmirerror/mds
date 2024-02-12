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
        $country_cases = Registrations::select("country as particulars", DB::raw("count(country) as cases"))
                                        ->where('reg_date', $today)
                                        ->where('country', '!=', 'CASE CANCELLED')
                                        ->where('center_id', $centreID)
                                        ->groupBy("country")
                                        ->get();

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
                                  'unfit' => $unfit], 200);
    }
}
