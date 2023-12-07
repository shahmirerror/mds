<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Modules;

class ModulesController extends Controller
{
    public function fetch_super()
    {
        return response()->json(['modules' => Modules::get_super_mods()], 200);
    }

    public function fetch_admin()
    {
        return response()->json(['modules' => Modules::get_admin_mods()], 200);
    }
}
