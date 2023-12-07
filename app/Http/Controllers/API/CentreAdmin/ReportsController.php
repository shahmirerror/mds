<?php

namespace App\Http\Controllers\API\CentreAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Centres;
use App\Models\ReportModules;

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
}
