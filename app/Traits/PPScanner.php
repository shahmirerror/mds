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
    public function handle($file, $file2, $centre_id, $counter_no)
    {
        try {

        $txtFiles = File::glob($file2);

        foreach ($txtFiles as $txtFile) {

            copy($file2, storage_path('app/public/temp_passports').'/'.basename($txtFile));

            $fileHandle = fopen(storage_path('app/public/temp_passports').'/'.basename($txtFile), 'rb');
            $mrz = str_replace("\0", "", utf8_encode(fread($fileHandle, filesize(storage_path('app/public/temp_passports').'/'.basename($txtFile)))));

            // $text = preg_replace("/\n+/", "\n", $text);
            $lines = explode("\n",$mrz);
            Log::info($lines);
            Log::info($mrz);
            $result = [];

            // Iterate over each line
            foreach ($lines as $line) {
                // Split the line into key and value using the first occurrence of "/"
                $parts = explode('/', $line, 2);
                // Trim whitespace from key and value
                $key = trim($parts[0]);
                $value = isset($parts[1]) ? trim($parts[1]) : '';
                // Store key-value pair in the result array
                $result[$key] = $value;
            }

            Log::info($result);


            $centre = Centres::find($centre_id);

            if ($result) {

                $jpgFiles = File::glob($file.$result['DocumentNo.'].'.JPG');
                Log::info($file.$result['DocumentNo.']);

                foreach ($jpgFiles as $jpgFile) {
                    $image = new Imagick();
                    $image->readImage($jpgFile);

                    Storage::disk('public')->put('temp_passports/'.basename($jpgFile), $image->getImageBlob());
                }

                $new = [
                    'center_name' => $centre->name,
                    'center_id' => $centre_id,
                    'counter_no' => $counter_no,
                    'pp_no' => $result['DocumentNo.'],
                    'first_name' => $result['Givenname'],
                    'last_name' => $result['Familyname'],
                    'nationality' => $result['Nationality'],
                    'dob' => date('Y-m-d',strtotime($result['Dateofbirth'])),
                    'cnic' => substr($result['MRTDs'],-16,-3),
                    'gender' => ($result['Sex'] == 'M') ? 'Male' : 'Female',
                    'pp_expiry_date' => date('Y-m-d',strtotime($result['Dateofexpiry'])),
                    'pp_issue_state' => $result['Nationality']
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
