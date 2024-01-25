<?php

namespace App\Http\Controllers\API\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\BackupLogs;
use App\Models\BackupSettings;
use App\Models\CentreDevices;

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

    public function update_backup_settings(request $request)
    {
        $all = json_decode($request->getContent());

        $settings = BackupSettings::find(1);
        $settings->type = $all->type;
        $settings->frequency = $all->frequency;
        if($settings->update())
        {
            return response()->json(['message' => 'Backup Settings have been updated!'], 200);
        }
        else
        {
            return response()->json(['message' => 'Something went wrong! Please try again :('], 500);
        }
    }

    public function centre_devices()
    {
        $devices = CentreDevices::select('centre_devices.*','centres.name as centre_name')
                                ->join('centres','centres.id','=','centre_devices.centre_id')
                                ->where('centres.status','Active')
                                ->where('centre_devices.status','Active')
                                ->get();

        return response()->json(['devices' => $devices], 200);
    }

    public function store_centre_devices(request $request)
    {
        $all = json_decode($request->getContent());

        $devices = new CentreDevices;
        $devices->centre_id = $all->centre_id;
        $devices->name = $all->name;
        $devices->brand = $all->brand;
        $devices->type = $all->type;
        if($devices->save())
        {
            return response()->json(['message' => 'Device has been saved!'], 200);
        }
        else
        {
            return response()->json(['message' => 'Something went wrong! Please try again :('], 500);
        }
    }

    public function update_centre_devices(request $request, $id)
    {
        $all = json_decode($request->getContent());
        $devices = CentreDevices::find($id);
        $devices->centre_id = $all->centre_id;
        $devices->name = $all->name;
        $devices->brand = $all->brand;
        $devices->type = $all->type;
        if($devices->update())
        {
            return response()->json(['message' => 'Device has been updated!'], 200);
        }
        else
        {
            return response()->json(['message' => 'Something went wrong! Please try again :('], 500);
        }
    }

    public function delete_centre_devices($id)
    {
        $devices = CentreDevices::find($id);

        if($devices->delete())
        {
            return response()->json(['message' => 'Device has been deleted!'], 200);
        }
        else
        {
            return response()->json(['message' => 'Something went wrong! Please try again :('], 500);
        }
    }
}
