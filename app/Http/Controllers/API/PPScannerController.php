<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\PassportInfo;
use App\Models\Registrations;
use App\Traits\PPScanner;

use DB;

class PPScannerController extends Controller
{
    use PPScanner;

    public function fetch_passport(request $request)
    {
        $all = json_decode($request->getContent());
        $desktopPath = '\\\\'.$all->username.'\\SharedFolder\\';
        $desktopPath2 = '\\\\'.$all->username.'\\Plustek-SecureScan\\';
        // $desktopPath = 'C:\Users/shahm/Pictures/passports/';
        // $desktopPath2 = 'C:\Users\Public\Documents\Plustek-SecureScan/';
        $date = date('Y-m-d-H-i', strtotime('+5 hours'));


                // Get an array of all files in the folder
                $files1 = scandir($desktopPath);
                $files1 = array_reverse($files1);
                Log::info($files1);


                // Get the latest file (last element after sorting)
                $latestFile = $files1[0];

                // Filter out directories (if any)
                $files2 = scandir($desktopPath2);
                $files2 = array_reverse($files2);

                Log::info($files2);

                $latestFile2 =$files2[5];

                $imageFilename = basename((string)$latestFile);
                $imageFilename2 = basename((string)$latestFile2);

                $fileHandle = @fopen($desktopPath.$imageFilename, 'r');
                $fileHandle2 = @fopen($desktopPath2.$imageFilename2, 'r');

                if($fileHandle !== false && $fileHandle2 !== false)
                {
                    $result = $this->handle($desktopPath,$desktopPath2.$imageFilename2, $all->centre_id, $all->counter_id);

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
                        if($get_ppinfo)
                        {
                            $prev = Registrations::select('reg_date','serial_no','country','status')->where('cnic',$get_ppinfo->cnic)->where('center_id',$all->centre_id)->orderBy('id','DESC')->first();

                            if(!$prev)
                            {
                                $prev = NULL;
                            }
                        }
                        else
                        {
                            $prev = NULL;
                        }
                    }
                    else
                    {
                        $get_ppinfo = [];
                        $prev = NULL;
                    }

                    // unlink($desktopPath.$imageFilename);

                    return response()->json(['pp_info' => $get_ppinfo, 'message' => $result, 'prev' => $prev, 'filename' => asset('storage/app/public/temp_passports/'.$get_ppinfo->pp_no.'.JPG')], 200);
                }

        return response()->json(['pp_info' => [], 'message' => 'No Passport Found!', 'filename' => NULL], 200);
    }
}
