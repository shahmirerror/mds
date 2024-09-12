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
            if(Auth::user()->status == 'Active')
            {
                if(Auth::user()->role_id == 1)
                {
                    return redirect()->route('super.dashboard');
                }
                elseif(Auth::user()->role_id == 2)
                {
                    return redirect()->route('admin.dashboard');
                }
                elseif(Auth::user()->role_id == 3)
                {
                    return redirect()->route('staff.dashboard');
                }
                elseif(Auth::user()->role_id == 4)
                {
                    return redirect()->route('token-generation-page');
                }
                elseif(Auth::user()->role_id == 5)
                {
                    return redirect()->route('feedback-page');
                }
            }
            else
            {
                Auth::logout();
            }
        }
    }
}
