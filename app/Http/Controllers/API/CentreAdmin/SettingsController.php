<?php

namespace App\Http\Controllers\API\CentreAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\BackupLogs;
use App\Models\BackupSettings;

class SettingsController extends Controller
{
    public function backup_logs()
    {
        $logs = BackupLogs::get();

        return response()->json(['logs' => $logs], 200);
    }

    public function backup_settings()
    {
        $settings = BackupSettings::first();

        return response()->json(['settings' => $settings], 200);
    }
}
