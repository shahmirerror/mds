<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use thiagoalessio\TesseractOCR\TesseractOCR;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class ProcessPassportImages extends Command
{
    protected $signature = 'process:passports';
    protected $description = 'Process passport images and store information in the database';

    protected $temImgPPList = [];

    public function __construct()
    {
        parent::__construct();

        // Initialize temporary passport image list
        $this->temImgPPList = [
            ['file' => config('passport_settings.tempPPImg1'), 'counterno' => '1'],
            ['file' => config('passport_settings.tempPPImg2'), 'counterno' => '2'],
            ['file' => config('passport_settings.tempPPImg3'), 'counterno' => '3']
        ];
    }

    public function handle()
    {
        $temImgPPList = [
            ['file' => config('passport_settings.tempPPImg1'), 'counterno' => '1'],
            ['file' => config('passport_settings.tempPPImg2'), 'counterno' => '2'],
            ['file' => config('passport_settings.tempPPImg3'), 'counterno' => '3']
        ];
        while (true) {
            Log::info('ran '.json_encode($this->temImgPPList));
            foreach ($this->temImgPPList as $temImgPP) {
                Log::info('ran first foreach');
                $jpgFiles = File::glob($temImgPP['file'] . '/*.jpg');
                foreach ($jpgFiles as $jpgFile) {
                    Log::info('ran second foreach');
                        // $mrz = PassportEye::readMRZ($jpgFile, true);
                        $mrz = new TesseractOCR($jpgFile);
                        $text = $mrz->run();

                        // Example using regular expressions (adapt to your MRZ format)
                        $pattern = '/([A-Z<>0-9]{9})<([A-Z0-9]{3})<([A-Z0-9]{13})<([0-9]{2})<([FM])/';
                        preg_match($pattern, $text, $matches);

                        if (count($matches) > 5) {

                            $data = [
                                // 'center_name' => config('settings.centerName'),
                                // 'center_id' => config('settings.centerID'),
                                'counter_no' => $temImgPP['counterno'],
                                'pp_no' => $matches[1],
                                // 'first_name' => $fname,
                                // 'last_name' => $mrz->surname,
                                // 'nationality' => $mrz->nationality,
                                // 'dob' => $mrz->date_of_birth,
                                'cnic' => $matches[2],
                                'gender' => $matches[5],
                                // 'pp_expiry_date' => $mrz->expiration_date,
                                // 'pp_issue_state' => $mrz->country
                            ];

                        PassportInfo::insert($data);

                        }

                        Log::info(json_encode($matches));

                        // Move or remove the processed image
                        if (config('passport_settings.remotePPImg')) {
                            File::move($jpgFile, config('passport_settings.remotePPImg') . '/' . basename($jpgFile));
                        } else {
                            File::delete($jpgFile);
                        }

                }

            }
            sleep(10);
        }
    }
}
