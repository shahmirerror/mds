<?php

namespace App\Http\Controllers\API\CentreAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Registrations;

use App\Models\Medical;
use App\Models\XrayResult;
use App\Models\XrayStickers;

use App\Models\LabResult;
use App\Models\LabSticker;

class CandidatesController extends Controller
{
    public function fetch_reg($id)
    {
        return response()->json(['reg' => Registrations::find($id)], 200);
    }

    public function fetch_medical($id)
    {
        return response()->json(['medical' => Medical::find($id)], 200);
    }

    public function fetch_lab($id)
    {
        $result = LabResult::find($id);
        if($result)
        {
            return response()->json(['lab' => ['result' => $result, 'stickers' => LabSticker::where('centre_id', $result->centre_id)->where('reg_id', $result->reg_id)->first()]], 200);
        }
        else
        {
            return response()->json(['lab' => ['result' => $result, 'stickers' => []]], 404);
        }
    }

    public function fetch_xray($id)
    {
        $result = XrayResult::find($id);
        if($result)
        {
            return response()->json(['xray' => ['result' => $result, 'slips' => XraySlips::where('centre_id', $result->centre_id)->where('reg_id', $result->reg_id)->first()]], 200);
        }
        else
        {
            return response()->json(['xray' => ['result' => $result, 'slips' => []]], 404);
        }
    }
}
