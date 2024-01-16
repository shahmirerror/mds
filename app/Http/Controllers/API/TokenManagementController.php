<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Tokens;

class TokenManagementController extends Controller
{
    public function new_token(request $request)
    {
        $new_token = rand(100, 1000);

        $duplicate = true;

        while($duplicate)
        {
            $check = Tokens::where('token_date',date('Y-m-d'))->where('token_no',$new_token)->first();

            if(!$check)
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
        $new->center_id = $request->centre_id;
        $new->save();

        return response()->json(['new_token' => $new_token], 200);
    }

    public function assign_token(request $request)
    {

    }

    public function refresh_token()
    {

    }

    public function update_token()
    {

    }
}
