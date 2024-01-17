<?php

namespace App\Http\Controllers\CentreAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Candidates;
use App\Models\Registrations;
use App\Models\Centres;

use Inertia\Inertia;

use Auth;

class CandidatesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $candidates = Registrations::leftjoin('candidates','candidates.id','registrations.candidate_id')
                                      ->where('registrations.center_id', Auth::user()->centre->id)
                                      ->limit(100)->orderBy('registrations.created_at','DESC')->get();
        // print_r($candidates[0]);
        return Inertia::render('CentreAdmin/Candidates/Index', ['candidates' => $candidates]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $candidate = Candidates::find($id);
        $registrations = Registrations::select('registrations.id',
                                               'registrations.reg_id',
                                               'registrations.token_no',
                                               'registrations.reg_date',
                                               'registrations.created_at',
                                               'xray_result.status as xray_status','xray_result.id as xray_id',
                                               'lab_result.status as laboratory_status','lab_result.id as lab_id',
                                               'medical.status as medical_status','medical.id as med_id')
                                        ->leftjoin('xray_result','xray_result.reg_id','=','registrations.reg_id')
                                        ->leftjoin('lab_result','lab_result.reg_id','=','registrations.reg_id')
                                        ->leftjoin('medical','medical.reg_id','=','registrations.reg_id')
                                        ->where('center_id', Auth::user()->centre->id)
                                        ->where('candidate_id',$id)
                                        ->get();
        // print_r($registrations);
        return Inertia::render('CentreAdmin/Candidates/View', ['candidate' => $candidate, 'registrations' => $registrations]);
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
