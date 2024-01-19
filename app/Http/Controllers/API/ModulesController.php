<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Modules;
use App\Models\LabModules;

class ModulesController extends Controller
{
    public function fetch_super()
    {
        return response()->json(['modules' => Modules::get_super_mods()], 200);
    }

    public function fetch_admin($centre_id)
    {
        return response()->json(['modules' => Modules::get_admin_mods(), 'lab' => LabModules::centre_lab_modules($centre_id)], 200);
    }

    public function fetch_staff($centre_id, $user_id)
    {
        return response()->json(['modules' => Modules::get_staff_mods(), 'lab' => LabModules::my_lab_modules($centre_id, $user_id)], 200);
    }
}
