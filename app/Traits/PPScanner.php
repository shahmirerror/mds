<?php

namespace App\Traits;

use thiagoalessio\TesseractOCR\TesseractOCR;
use Alimranahmed\LaraOCR\Facades\OCR;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

use Imagick;
use Rakibdevs\MrzParser\MrzParser;

use App\Models\PassportInfo;
use App\Models\Centres;

trait PPScanner
{
    public function handle($file, $centre_id, $counter_no)
    {
        try {
        $jpgFiles = File::glob($file);

        foreach ($jpgFiles as $jpgFile) {
            $image = new Imagick();
            $image->readImage($jpgFile);

            Storage::disk('public')->put('temp_passports/'.basename($jpgFile), $image->getImageBlob());

            $mrz = (new TesseractOCR(storage_path('app/public/temp_passports/'.basename($jpgFile))));
            $text = $mrz->run();
            // $text = preg_replace("/\n+/", "\n", $text);
            $arr = explode("\n",$text);
            Log::info($arr);
            for($l = 0; $l < count($arr); $l++)
            {
                if(strpos($arr[$l], "P<") !== false)
                {
                    $first = $arr[$l];
                    if($arr[$l+1] != '')
                    {
                        $last = $arr[$l+1];
                    }
                    else
                    {
                        $last = $arr[$l+2];
                    }
                }
            }
            $first = str_replace(" ","<",$first);
            $last = str_replace(" ","",$last);
            $last_less_than_position = strrpos($first, "<");
            // for($i = 1; $i <= $last_less_than_position; $i++)
            // {
            //     if (ctype_alpha($first[strlen($first)-$i]) &&
            //         ($first[strlen($first)-$i] !== "<" &&
            //         ($first[strlen($first)-$i-1] == "<" &&
            //         $first[strlen($first)-$i-2] == "<" && $first[strlen($first)-$i-3] == "<")))
            //     {
            //         $first[strlen($first)-$i] = "<";
            //     }
            // }
            // $last_less_than_position = strrpos($first, "<<<");
            // for($i = 1; $i <= $last_less_than_position; $i++)
            // {
            //         $first[strlen($first)-$i] = "<";
            // }
            if(strlen($first) > 44)
            {
                $first = substr($first, 0, 44);
            }
            if(strlen($last) == 44)
            {
                $last[0] = (is_numeric($last[0])) ? 'G' : $last[0];
                $last[0] = ($last[0] == ':') ? '' : $last[0];
            }
            elseif(strlen($last) > 44)
            {
                unset($last[0]);
            }
                Log::info($first."\n".$last);

                $data = MrzParser::parse($first."\n".$last);


            $centre = Centres::find($centre_id);

            if ($data) {

                $new = [
                    'center_name' => $centre->name,
                    'center_id' => $centre_id,
                    'counter_no' => $counter_no,
                    'pp_no' => $data['card_no'],
                    'first_name' => $data['first_name'],
                    'last_name' => $data['last_name'],
                    'nationality' => $data['nationality'],
                    'dob' => $data['date_of_birth'],
                    'cnic' => $data['personal_number'],
                    'gender' => $data['gender'],
                    'pp_expiry_date' => $data['date_of_expiry'],
                    'pp_issue_state' => $data['issuer']
                ];

                PassportInfo::insert($new);
            }
        }

        return true;

        } catch (\Exception $e) {
            Log::info($e);
            return 'Passport is Invalid';
        }
    }
}
