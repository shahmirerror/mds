<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class RedirectController extends Controller
{
    public function index()
    {
        if(Auth::user())
        {
            if(Auth::user()->role_id == 1)
            {
                return redirect()->route('super.dashboard');
            }
            elseif(Auth::user()->role_id == 2)
            {
                return redirect()->route('admin.dashboard');
            }
        }
    }
}
