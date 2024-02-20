<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\PassportInfo;
use App\Traits\PPScanner;

use DB;

class PPScannerController extends Controller
{
    use PPScanner;

    public function fetch_passport(request $request)
    {
        $all = json_decode($request->getContent());
        $desktopPath = '\\\\'.$all->username.'\\SharedFolder\\';
        // $desktopPath = 'C:\SharedFolder/';
        $date = date('Y-m-d-H-i', strtotime('+5 hours'));
        Log::info($desktopPath);
        for($i = 0; $i <= 59; $i++)
        {
            for($k = 1; $k < 1000; $k++)
            {
                $imageFilename = $date;

                if($i < 10)
                {
                    $imageFilename .= '-0'.$i;
                }
                else
                {
                    $imageFilename .= '-'.$i;
                }
                if($k < 10)
                {
                    $imageFilename .= '-00'.$k.'.jpg';
                }
                elseif($k < 100)
                {
                    $imageFilename .= '-0'.$k.'.jpg';
                }
                else
                {
                    $imageFilename .= '-'.$k.'.jpg';
                }

                $fileHandle = @fopen($desktopPath.$imageFilename, 'r');

                if($fileHandle !== false)
                {
                    $result = $this->handle($desktopPath.$imageFilename, $all->centre_id, $all->counter_id);

                    if($result == true)
                    {
                        $get_ppinfo = PassportInfo::select("dob",
                                                    "pp_expiry_date",
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
                    }
                    else
                    {
                        $get_ppinfo = [];
                    }

                    unlink($desktopPath.$imageFilename);

                    return response()->json(['pp_info' => $get_ppinfo, 'message' => $result, 'filename' => asset('storage/app/public/temp_passports/'.$imageFilename)], 200);
                }
            }
        }

        return response()->json(['pp_info' => [], 'message' => 'No Passport Found!', 'filename' => NULL], 200);
    }
}
