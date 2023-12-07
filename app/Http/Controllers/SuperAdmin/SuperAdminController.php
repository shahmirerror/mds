<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

use App\Models\User;

use Hash;

class SuperAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where('role_id',1)->where('status','Active')->where('id','!=',1)->get();

        return Inertia::render('SuperAdmin/Users/Index', ['data' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $new = new User;
        $new->name = $request->name;
        $new->role_id = 1;
        $new->username = $request->username;
        $new->email = $request->email;
        $new->password = Hash::make($request->password);

        $new->save();

        return redirect()->route('users.index');
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $new = User::find($id);
        $new->name = $request->name;
        $new->role_id = 1;
        $new->username = $request->username;
        $new->email = $request->email;
        if($request->password != '')
        {
            $new->password = Hash::make($request->password);
        }

        $new->update();

        return redirect()->route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
