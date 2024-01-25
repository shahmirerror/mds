<?php

namespace App\Http\Controllers\API\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Centres;
use App\Models\ReportModules;
use App\Models\Country;

class ReportsController extends Controller
{
    public function fetch_centres()
    {
        return response()->json(['centres' => Centres::where('status','!=','Deleted')->get()], 200);
    }

    public function fetch_reports()
    {
        return response()->json(['modules' => ReportModules::get()], 200);
    }

    public function fetch_countries()
    {
        return response()->json(['countries' => Country::distinct()->where('status','Active')->get('name')], 200);
    }

    public function fetch_result(request $request)
    {
        $all = json_decode($request->getContent());
    }
}
