<?php

namespace App\Http\Controllers\CentreAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Nationality;

use Inertia\Inertia;

use Auth;

class NationalityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('CentreAdmin/Nationality', ['nationality' => Nationality::where('centre_id', Auth::user()->centre->centre_id)->where('status', 'Active')->get()], 200);
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
        $new = new Nationality;
        $new->name = $request->name;
        $new->centre_id = Auth::user()->centre->centre_id;

        $new->save();

        return redirect()->route('nationality-setup.index');
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
        $new = Nationality::find($id);
        $new->name = $request->name;
        $new->centre_id = Auth::user()->centre->centre_id;

        $new->update();

        return redirect()->route('nationality-setup.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Nationality::where('id',$id)->update(array('status' => 'Inactive'));

        return redirect()->route('nationality-setup.index');
    }
}
