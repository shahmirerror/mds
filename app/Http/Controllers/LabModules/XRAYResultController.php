<?php

namespace App\Http\Controllers\LabModules;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\XrayResult;
use App\Models\XraySlips;
use App\Models\Registrations;

use Auth;

use Inertia\Inertia;

class XRAYResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('LabModules/XRAYResult');
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
        $check = Registrations::where('center_id',Auth::user()->centre->id)->where('serial_no',$request->serial_no)->where('reg_date',$request->date)->first();
        if($check)
        {
            $new = new XRAYResult;
            $new->centre_id = Auth::user()->centre->id;
            $new->reg_id = $check->reg_id;
            $new->chest = $request->chest;
            $new->notes = $request->notes;
            if($request->chest == "lung fields clear")
            {
                $new->status = 'FIT';
            }
            else
            {
                $new->status = 'UNFIT';
            }
            $new->save();

            if($request->hasFile('images'))
            {
                $files = $request->file('images');

                foreach($files as $file)
                {
                    $fileName = time().'.'.$file->getClientOriginalName();
                    $file->move(storage_path('app/public/xray_slips/'.$check->center_id.'/'.$check->reg_id), $fileName);

                    $new1 = new XraySlips;
                    $new1->centre_id = $check->center_id;
                    $new1->reg_id = $check->reg_id;
                    $new1->slips = $fileName;
                    $new1->save();
                }
            }

            return redirect()->route('centre.xrayresult');
        }
        else
        {
            return redirect()->route('centre.xrayresult');
        }
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
        $new = XRAYResult::find($id);
        $new->chest = $request->chest;
        $new->notes = $request->notes;
        if($request->chest == "lung fields clear")
        {
            $new->status = 'FIT';
        }
        else
        {
            $new->status = 'UNFIT';
        }
        $new->update();

        if($request->hasFile('images'))
        {
            $files = $request->file('images');
            XraySlips::where('centre_id',Auth::user()->centre->id)->where('reg_id',$new->reg_id)->delete();
            foreach($files as $file)
            {
                $fileName = time().'.'.$file->getClientOriginalName();
                $file->move(storage_path('app/public/xray_slips/'.$check->center_id.'/'.$check->reg_id), $fileName);

                $new1 = new XraySlips;
                $new1->centre_id = $check->center_id;
                $new1->reg_id = $check->reg_id;
                $new1->slips = $fileName;
                $new1->save();
            }
        }

        return redirect()->route('centre.xrayresult');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
