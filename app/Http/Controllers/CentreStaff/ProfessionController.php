<?php

namespace App\Http\Controllers\CentreStaff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Profession;

use Inertia\Inertia;

use Auth;

class ProfessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('CentreStaff/Profession', ['profession' => Profession::where('centre_id', Auth::user()->centre->centre_id)->get()], 200);
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
        $new = new Profession;
        $new->name = $request->name;
        $new->centre_id = Auth::user()->centre->centre_id;

        $new->save();

        return redirect()->route('professionsetup.index');
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
        $new = Profession::find($id);
        $new->name = $request->name;
        $new->centre_id = Auth::user()->centre->centre_id;

        $new->update();

        return redirect()->route('professionsetup.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Profession::where('id',$id)->delete();

        return redirect()->route('professionsetup.index');
    }
}
