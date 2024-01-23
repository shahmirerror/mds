<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Centres;
use App\Models\CentreUsers;
use App\Models\CentreLabModules;
use App\Models\LabModules;
use App\Models\User;

use Hash;

use Inertia\Inertia;

class CentreManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $centres = Centres::where('status','!=','Deleted')->get();

        return Inertia::render('SuperAdmin/Centres/Index',['data' => $centres]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $mods = LabModules::new_centre_lab_modules();
        return Inertia::render('SuperAdmin/Centres/Create', ['modules' => $mods]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $new = new Centres;
        $new->name = $request->name;
        $new->phone = $request->phone;
        $new->address = $request->address;
        $new->city = $request->city;
        $new->country = $request->country;

        if($request->hasFile('logo'))
        {
            $image = $request->file('logo');
            $imageName = time().'.'.$image->getClientOriginalExtension();

            $image->move(storage_path('app/public/centres/logos'), $imageName);
        }
        else
        {
            $imageName = NULL;
        }
        $new->image = $imageName;
        $new->save();

        foreach($request->users as $staff)
        {
            if($staff['username'] != NULL && $staff['password'] != NULL && $staff['role'] != NULL)
            {
                $new_user = new User;
                $new_user->username = $staff['username'];
                $new_user->password = Hash::make($staff['password']);
                if($staff['role'] == 'Staff')
                {
                    $new_user->role_id = 3;
                }
                else
                {
                    $new_user->role_id = 2;
                }
                $new_user->save();

                $new_staff = new CentreUsers;
                $new_staff->centre_id = $new->id;
                $new_staff->user_id = $new_user->id;
                $new_staff->save();
            }
        }

        foreach($request->modules as $mods)
        {
            if($mods['status'] == true)
            {
                $new_mod = new CentreLabModules;
                $new_mod->centre_id = $new->id;
                $new_mod->lab_module_id = $mods['id'];
                $new_mod->save();
            }
        }

        return redirect()->route('centres.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $centre = Centres::find($id);
        $mods = LabModules::centre_lab_modules($id);
        $users = CentreUsers::select('users.id','users.name','users.username','users.role_id','users.status')
                          ->leftjoin('users','users.id','centre_users.user_id')
                          ->where('centre_id',$id)
                          ->whereIn('users.status',['Active','Inactive'])
                          ->get();

        return Inertia::render('SuperAdmin/Centres/Edit', ['centre' => $centre, 'users' => $users, 'modules' => $mods]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $new = Centres::find($id);
        $new->name = $request->name;
        $new->phone = $request->phone;
        $new->address = $request->address;
        $new->city = $request->city;
        $new->country = $request->country;

        if($request->hasFile('logo'))
        {
            $image = $request->file('logo');
            $imageName = time().'.'.$image->getClientOriginalExtension();

            $image->move(storage_path('app/public/centres/logos'), $imageName);
        }
        else
        {
            $imageName = $new->image;
        }
        $new->image = $imageName;
        $new->update();

        return redirect()->route('centres.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function suspend($id)
    {
        Centres::where('id',$id)->update(array('status' => 'Inactive'));

        return redirect()->route('centres.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Centres::where('id',$id)->update(array('status' => 'Deleted'));

        return redirect()->route('centres.index');
    }
}
