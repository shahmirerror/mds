<?php

namespace App\Http\Controllers\LabModules;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

class RegistrationsController extends Controller
{
    public function index()
    {
        return Inertia::render('LabModules/Registration');
    }
}
