<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\PassportInfo;

use DB;

class PPScannerController extends Controller
{
    public function fetch_passport(request $request)
    {
        $all = json_decode($request->getContent());

        $get_ppinfo = PassportInfo::select(DB::raw("SUBSTRING(dob,1, 2) AS d_year"),
                                           DB::raw("SUBSTRING(dob,3, 2) AS d_month"),
                                           DB::raw("SUBSTRING(dob,5, 2) AS d_date"),
                                           DB::raw("SUBSTRING(pp_expiry_date,1, 2) AS p_year"),
                                           DB::raw("SUBSTRING(pp_expiry_date,3, 2) AS p_month"),
                                           DB::raw("SUBSTRING(pp_expiry_date,5, 2) AS p_date"),
                                           'pp_no',
                                           'nationality',
                                           'first_name',
                                           'gender',
                                           'last_name',
                                           'cnic',
                                           'pp_issue_state')
                                        ->where('center_id',$all->centre_id)
                                        ->where('counter_no',$all->counter_id)
                                        ->orderBy('id','DESC')
                                        ->first();

        if($get_ppinfo)
        {
            return response()->json(['pp_info' => $get_ppinfo], 200);
        }
        else
        {
            return response()->json(['pp_info' => []], 404);
        }
    }
}
