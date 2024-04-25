<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\CentreLabModules;
use App\Models\CentreUserModules;
use App\Models\StaffLabRights;
use App\Models\LabModulePermissions;
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
        $user = User::find($user_id);
        foreach($all as $a)
        {
            $send_out = new stdClass();
            $check = CentreLabModules::where('centre_id',$centre_id)->where('lab_module_id',$a->id)->first();

                $send_out->id = $a->id;
                $send_out->title = $a->title;
                $send_out->description = $a->description;
                $send_out->route = $a->route;
                $send_out->rights = LabModules::get_permissions($a->id, $user_id, $user->role_id);
                $send_out->status = (isset($check->lab_module_id)) ? true : false;

                array_push($send_out_arr, $send_out);
        }

        return $send_out_arr;
    }

    public static function get_permissions($module_id, $user_id, $role_id)
    {
        $rights = array();
        if($role_id == 2)
        {
            $mod_per = LabModulePermissions::where('lab_module_id',$module_id)->get();

            foreach($mod_per as $mp)
            {
                $per = new stdClass();

                $per->permission_id = $mp->id;
                $per->permission_name = $mp->name;
                $per->permission_value = NULL;
                $per->permission_type = $mp->type;
                $per->status = true;

                array_push($rights, $per);
            }

            return $rights;
        }
        else
        {
            $mod_per = LabModulePermissions::where('lab_module_id',$module_id)->get();

            foreach($mod_per as $mp)
            {
                $per = new stdClass();

                $check = StaffLabRights::where('permission_id',$mp->id)->where('user_id',$user_id)->first();

                $per->permission_id = $mp->id;
                $per->permission_name = $mp->name;
                $per->permission_value = ($check) ? $check->permission_value : NULL;
                $per->permission_type = $mp->type;
                $per->status = ($check) ? true : false;

                array_push($rights, $per);
            }

            return $rights;
        }
    }
}
