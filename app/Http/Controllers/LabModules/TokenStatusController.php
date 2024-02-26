<?php

namespace App\Http\Controllers\LabModules;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\QueueManager;

use Inertia\Inertia;

class TokenStatusController extends Controller
{
    public function index()
    {
        $completed = QueueManager::select('process_desc','token_no','status')
                                   ->join('processes','processes.process_id','queue_manager.process_id')
                                   ->where('process_date',date('Y-m-d'))
                                   ->where('status','Completed')->get();

        $in_process = QueueManager::select('process_desc','token_no','status')
                                   ->join('processes','processes.process_id','queue_manager.process_id')
                                   ->where('process_date',date('Y-m-d'))
                                   ->where('status','In Process')
                                   ->where('cancelled',NULL)->get();

        $pending = QueueManager::select('process_desc','token_no','status')
                                   ->join('processes','processes.process_id','queue_manager.process_id')
                                   ->where('process_date',date('Y-m-d'))
                                   ->where('status','Pending')
                                   ->where('cancelled',NULL)
                                   ->get();

        return Inertia::render('LabModules/TokenStatus', ['completed' => $completed, 'in_process' => $in_process, 'pending' => $pending]);
    }
}
