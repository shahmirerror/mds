<?php

namespace App\Http\Controllers\API\CentreStaff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Registrations;
use App\Models\Candidates;

use App\Models\Medical;
use App\Models\XrayResult;
use App\Models\XrayStickers;

use App\Models\LabResult;
use App\Models\LabSticker;
use Illuminate\Support\Facades\File;

class CandidatesController extends Controller
{
    public function fetch_reg($id)
    {
        $reg = Registrations::find($id);
        $cand = Candidates::find($reg->candidate_id);

        if($reg)
        {
            $assetUrl1 = @getimagesize(asset('storage/app/public/candidate_image/'.strtotime($cand->created_at).'.PNG'));
            $assetUrl2 = @getimagesize(asset('storage/app/public/candidate_image/'.strtotime($cand->created_at).'.png'));
            $assetUrl3 = @getimagesize(asset('storage/app/public/candidate_image/'.$cand->passport_no.'.PNG'));
            $assetUrl4 = @getimagesize(asset('storage/app/public/candidate_image/'.$cand->passport_no.'.png'));

            if ($assetUrl3 !== false)
            {
                $reg->candidate_passport = asset('storage/app/public/candidate_image/'.$cand->passport_no.'.PNG');
                $reg->candidate_picture = asset('storage/app/public/candidate_passport/'.$cand->passport_no.'.JPG');
            }
            elseif ($assetUrl4 !== false)
            {
                $reg->candidate_passport = asset('storage/app/public/candidate_image/'.$cand->passport_no.'.png');
                $reg->candidate_picture = asset('storage/app/public/candidate_passport/'.$cand->passport_no.'.jpg');
            }
            elseif($assetUrl1 !== false)
            {
                $reg->candidate_passport = asset('storage/app/public/candidate_image/'.strtotime($cand->created_at).'.PNG');
                $reg->candidate_picture = asset('storage/app/public/candidate_passport/'.strtotime($cand->created_at).'.JPG');
            }
            elseif($assetUrl2 !== false)
            {
                $reg->candidate_passport = asset('storage/app/public/candidate_image/'.strtotime($cand->created_at).'.png');
                $reg->candidate_picture = asset('storage/app/public/candidate_passport/'.strtotime($cand->created_at).'.jpg');
            }
        }
        return response()->json(['reg' => $reg], 200);
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
