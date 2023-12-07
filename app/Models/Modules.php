<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modules extends Model
{
    use HasFactory;

    public static function get_super_mods()
    {
        return Modules::where('portal','Super Admin')->where('status','Active')->orderBy('order','ASC')->get();
    }

    public static function get_admin_mods()
    {
        return Modules::where('portal','Centre Admin')->where('status','Active')->orderBy('order','ASC')->get();
    }

    public static function get_staff_mods()
    {
        return Modules::where('portal','Centre Staff')->where('status','Active')->orderBy('order','ASC')->get();
    }
}
