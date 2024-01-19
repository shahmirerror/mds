<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\CentreLabModules;
use App\Models\CentreUserModules;
use stdClass;

class LabModules extends Model
{
    use HasFactory;

    public static function new_centre_lab_modules()
    {
        $send_out_arr = array();
        $all = LabModules::get();
        foreach($all as $a)
        {
            $send_out = new stdClass();
            $send_out->id = $a->id;
            $send_out->title = $a->title;
            $send_out->description = $a->description;
            $send_out->status = false;

            array_push($send_out_arr, $send_out);
        }

        return $send_out_arr;
    }

    public static function centre_lab_modules($id)
    {
        $send_out_arr = array();
        $all = LabModules::get();
        foreach($all as $a)
        {
            $send_out = new stdClass();
            $check = CentreLabModules::where('centre_id',$id)->where('lab_module_id',$a->id)->first();

            $send_out->id = $a->id;
            $send_out->title = $a->title;
            $send_out->description = $a->description;
            $send_out->route = $a->route;
            $send_out->status = ($check) ? true : false;

            array_push($send_out_arr, $send_out);
        }

        return $send_out_arr;
    }

    public static function my_lab_modules($centre_id, $user_id)
    {
        $send_out_arr = array();
        $all = LabModules::get();
        foreach($all as $a)
        {
            $send_out = new stdClass();
            $check = CentreLabModules::where('centre_id',$centre_id)->where('lab_module_id',$a->id)->first();

            $check2 = CentreUserModules::where('centre_id',$centre_id)->where('user_id',$user_id)->where('lab_module_id',$a->id)->first();

                $send_out->id = $a->id;
                $send_out->title = $a->title;
                $send_out->description = $a->description;
                $send_out->route = $a->route;
                $send_out->status = ($check && $check2) ? true : false;

                array_push($send_out_arr, $send_out);
        }

        return $send_out_arr;
    }
}
