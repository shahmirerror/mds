<?php

namespace App\Http\Controllers\CentreAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Centres;
use App\Models\CentreUsers;
use App\Models\CentreLabModules;
use App\Models\LabModules;
use App\Models\User;

use Inertia\Inertia;

use Auth;

class CentreManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $centre = Centres::find(Auth::user()->centre->details->id);
        $mods = LabModules::centre_lab_modules(Auth::user()->centre->details->id);
        $users = CentreUsers::select('users.id','users.name','users.username','users.role_id','users.status')
                          ->leftjoin('users','users.id','centre_users.user_id')
                          ->where('centre_id',Auth::user()->centre->details->id)
                          ->where('user_id','!=',Auth::user()->id)
                          ->whereIn('users.status',['Active','Inactive'])
                          ->get();

        return Inertia::render('CentreAdmin/Centre', ['centre' => $centre, 'users' => $users, 'modules' => $mods]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $new = Centres::find($id);
        $new->name = $request->name;
        $new->code = $request->code;
        $new->fax = $request->fax;
        $new->email = $request->email;
        $new->phone = $request->phone;
        $new->address = $request->address;
        $new->city = $request->city;
        $new->country = $request->country;

        if($request->hasFile('image'))
        {
            $image = $request->file('image');
            $imageName = time().'.'.$image->getClientOriginalExtension();

            $image->move(storage_path('app/public/centres/logos'), $imageName);
        }
        else
        {
            $imageName = $new->image;
        }
        $new->image = $imageName;
        $new->update();

        return redirect()->route('centre-settings.index');
    }
}
