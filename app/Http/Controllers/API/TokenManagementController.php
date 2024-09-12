<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Tokens;
use App\Models\Centres;
use App\Models\QueueManager;

use DB;

class TokenManagementController extends Controller
{
    public function new_token(request $request)
    {
        $all = json_decode($request->getContent());

        $centre = Centres::find($all->centre_id);

        $new_token = rand(100, 1000);

        $duplicate = true;

        while($duplicate)
        {
            $check = Tokens::where('token_date',date('Y-m-d'))
                           ->where('token_no',$new_token)
                           ->where('center_id',$all->centre_id)
                           ->where('token_type',$all->token_type)
                           ->first();

            if(!isset($check->token_date))
            {
                $duplicate = false;
            }
            else
            {
                $new_token = rand(100, 1000);
            }
        }

        $new = new Tokens;
        $new->token_no = $new_token;
        $new->token_date = date('Y-m-d');
        $new->center_id = $all->centre_id;
        $new->token_type = $all->token_type;
        $new->save();

        if($all->token_type == 'Medical')
        {
            $processes = DB::table('processes')->orderBy('process_seq','ASC')->get();
            foreach($processes as $process)
            {

                $new2 = new QueueManager;
                $new2->token_no = $new_token;
                $new2->center_id = $all->centre_id;
                $new2->process_id = $process->process_id;
                $new2->process_date = date('Y-m-d');
                $new2->save();
            }
        }

        $time = time();

        $port = file_put_contents("storage/app/public/tokens/".$time.".txt", $centre->name."\n \n \t\t \t Token #: M".$new_token, LOCK_EX);

        return response()->json(['new_token' => 'M'.$new_token, 'url' => asset("storage/app/public/tokens/".$time.".txt")], 200);
    }

    public function assign_token(request $request)
    {
        $all = json_decode($request->getContent());

        $get_token_query = QueueManager::select("token_no","id")
                                        ->where("process_id",$all->process_id)
                                        ->where("center_id",$all->centre_id)
                                        ->where('status','Pending')
                                        ->where('cancelled',NULL)
                                        ->where('process_date',date('Y-m-d'))
                                        ->where('counter_id',NULL)
                                        ->orderBy('id', 'ASC')
                                        ->first();

        if($get_token_query)
        {
            $old = QueueManager::select("token_no","id")
                                        ->where("process_id",$all->process_id)
                                        ->where("center_id",$all->centre_id)
                                        ->where('status','In Process')
                                        ->where('process_date',date('Y-m-d'))
                                        ->where('cancelled',NULL)
                                        ->where('counter_id',$all->counter_no)
                                        ->orderBy('id', 'ASC')
                                        ->first();

            if($old)
            {
                QueueManager::where('token_no',$old->token_no)->where('process_date',date('Y-m-d'))->update(array('cancelled' => 'Yes'));
            }

            QueueManager::where('id',$get_token_query->id)->update(array('status' => 'In Process', 'counter_id' => $all->counter_no));

            $queue = QueueManager::select("token_no","id")
                                        ->where("process_id",$all->process_id)
                                        ->where("center_id",$all->centre_id)
                                        ->where('status','Pending')
                                        ->where('cancelled',NULL)
                                        ->where('process_date',date('Y-m-d'))
                                        ->where('counter_id',NULL)
                                        ->orderBy('id', 'ASC')
                                        ->count();

            return response()->json(['new_token' => $get_token_query->token_no, 'in_queue' => $queue], 200);
        }
        else
        {
            return response()->json(['new_token' => 'None', 'in_queue' => 0], 200);
        }
    }

    public function now_serving(request $request)
    {
        $all = json_decode($request->getContent());
        $get_token_query = QueueManager::select("token_no","id")
                                        ->where("process_id",$all->process_id)
                                        ->where("center_id",$all->centre_id)
                                        ->where('status','In Process')
                                        ->where('cancelled',NULL)
                                        ->where('process_date',date('Y-m-d'))
                                        ->where('counter_id',$all->counter_no)
                                        ->orderBy('id', 'DESC')
                                        ->first();

        if($get_token_query)
        {
            $token = 'M'.$get_token_query->token_no;
        }
        else
        {
            $token = 'None';
        }

        return response()->json(['now_serving' => $token], 200);
    }
}
