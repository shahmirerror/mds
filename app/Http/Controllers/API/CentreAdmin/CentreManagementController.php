<?php

namespace App\Http\Controllers\API\CentreAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\CentreUsers;
use App\Models\CentreLabModules;

use Hash;
use Auth;

class CentreManagementController extends Controller
{
    public function store_user(Request $request, $id)
    {
        $array = json_decode($request->getContent());
        $new_user = new User;
        $new_user->name = $array->name;
        $new_user->username = $array->username;
        $new_user->password = Hash::make($array->password);
        if($array->role == 'Staff')
        {
            $new_user->role_id = 3;
        }
        else
        {
            $new_user->role_id = 2;
        }
        $new_user->save();

        $new_staff = new CentreUsers;
        $new_staff->centre_id = $id;
        $new_staff->user_id = $new_user->id;
        $new_staff->save();

        return response()->json(['message' => 'New Staff Member has been added!'], 200);
    }

    public function update_user(Request $request, $id)
    {
        $array = json_decode($request->getContent());
        $new_user = User::find($array->id);
        $new_user->name = $array->name;
        $new_user->username = $array->username;
        $new_user->password = Hash::make($array->password);
        if($array->role == 'Staff')
        {
            $new_user->role_id = 3;
        }
        else
        {
            $new_user->role_id = 2;
        }
        $new_user->update();

        return response()->json(['message' => 'New Staff Member has been added!'], 200);
    }

    public function toggle_centre_lab_modules($module_id, $centre_id)
    {
        $check = CentreLabModules::where('centre_id',$centre_id)->where('lab_module_id',$module_id)->first();

        if($check)
        {
            $del = CentreLabModules::where('centre_id',$centre_id)->where('lab_module_id',$module_id)->delete();

            if($del)
            {
                return response()->json(['message' => 'Centre Lab Module Deleted!'], 200);
            }
            else
            {
                return response()->json(['message' => 'Error in deleting Centre Lab Module!'], 500);
            }
        }
        else
        {
            $new = CentreLabModules::create(array('centre_id' => $centre_id, 'lab_module_id' => $module_id));

            if($new)
            {
                return response()->json(['message' => 'Centre Lab Module Created!'], 200);
            }
            else
            {
                return response()->json(['message' => 'Error in creating Centre Lab Module!'], 500);
            }
        }
    }

    public function fetch_users($id)
    {
        $users = CentreUsers::select('users.id','users.name','users.username','users.role_id','users.status')
                          ->leftjoin('users','users.id','centre_users.user_id')
                          ->where('centre_id',$id)
                          ->where('user_id','!=',Auth::user()->id)
                          ->whereIn('users.status',['Active','Inactive'])
                          ->get();

        return response()->json(['users' => $users], 200);
    }

    public function update_user_status(Request $request, $id)
    {
        $array = json_decode($request->getContent());
        $new_user = User::find($array->id);
        $new_user->status = $array->status;
        $new_user->update();

        return response()->json(['message' => 'New Staff Member has been added!'], 200);
    }
}