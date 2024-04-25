<?php

namespace App\Http\Controllers\LabModules;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\XrayVerification;
use App\Models\QueueManager;

use Inertia\Inertia;

use App\Models\User;

use Auth;

class XRAYVerificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $token = QueueManager::where('center_id',Auth::user()->centre->centre_id)
                            ->where('process_id',5)
                            ->where('process_date',date('Y-m-d'))
                            ->where('status','In Process')
                            ->where('cancelled',NULL)
                            ->first();

        $queue = QueueManager::select("token_no","id")
                                        ->where("process_id",5)
                                        ->where("center_id",Auth::user()->centre->centre_id)
                                        ->where('status','Pending')
                                        ->where('cancelled',NULL)
                                        ->where('process_date',date('Y-m-d'))
                                        ->where('counter_id',NULL)
                                        ->orderBy('id', 'ASC')
                                        ->count();

        $token_no = ($token) ? $token->token_no : 'None';

        return Inertia::render('LabModules/XRAYVerification', ['token_no' => $token_no, 'in_queue' => $queue,]);
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
