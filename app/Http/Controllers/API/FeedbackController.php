<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Feedback;
use App\Models\QueueManager;
use App\Models\Registrations;

use DB;

class FeedbackController extends Controller
{
    public function new_feedback(request $request)
    {
        $all = json_decode($request->getContent());

        $check = Registrations::where('center_id',$all->centre_id)->where('barcode_no',$all->barcode)->first();

        $new = Feedback::insert(array('centre_id' => $all->centre_id, 'reg_id' => ($check) ? $check->reg_id : NULL, 'status' => $all->status, 'comments' => $all->comments));

        return response()->json(['message' => 'Thank you for submitting your feedback!'], 200);
    }
}
