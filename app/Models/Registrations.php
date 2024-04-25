<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\XrayVerification;
use App\Models\XrayResult;
use App\Models\Medical;
use App\Models\LabResult;
use App\Models\LabSticker;

class Registrations extends Model
{
    use HasFactory;

    public static function get_passport_image($cand_obj, $reg_obj)
    {
        $assetUrl1 = @getimagesize(asset('storage/app/public/candidate_passport/'.strtotime($cand_obj->updated_at).'.JPG'));
        $assetUrl2 = @getimagesize(asset('storage/app/public/candidate_passport/'.strtotime($cand_obj->updated_at).'.jpg'));
        $assetUrl3 = @getimagesize(asset('storage/app/public/candidate_passport/'.strtotime($cand_obj->created_at).'.JPG'));
        $assetUrl4 = @getimagesize(asset('storage/app/public/candidate_passport/'.strtotime($cand_obj->created_at).'.jpg'));
        $assetUrl5 = @getimagesize(asset('storage/app/public/candidate_passport/'.$reg_obj->old_img.'.JPG'));
        $assetUrl6 = @getimagesize(asset('storage/app/public/candidate_passport/'.$reg_obj->old_img.'.jpg'));

        if($assetUrl5 != false)
        {
            return asset('storage/app/public/candidate_passport/'.$reg_obj->old_img.'.JPG');
        }
        elseif($assetUrl6 != false)
        {
            return asset('storage/app/public/candidate_passport/'.$reg_obj->old_img.'.jpg');
        }
        elseif($assetUrl3 != false)
        {
            return asset('storage/app/public/candidate_passport/'.strtotime($cand_obj->created_at).'.JPG');
        }
        elseif($assetUrl4 != false)
        {
            return asset('storage/app/public/candidate_passport/'.strtotime($cand_obj->created_at).'.jpg');
        }
        elseif($assetUrl1 != false)
        {
            return asset('storage/app/public/candidate_passport/'.strtotime($cand_obj->updated_at).'.JPG');
        }
        elseif($assetUrl2 != false)
        {
            return asset('storage/app/public/candidate_passport/'.strtotime($cand_obj->updated_at).'.jpg');
        }
        else
        {
            return $assetUrl5.' '.$assetUrl6.' '.$assetUrl3.' '.$assetUrl4.' '.$assetUrl5.' '.$assetUrl6;
        }
    }

    public static function get_candidate_image($cand_obj, $reg_obj)
    {
        $assetUrl1 = @getimagesize(asset('storage/app/public/candidate_image/'.strtotime($cand_obj->updated_at).'.PNG'));
        $assetUrl2 = @getimagesize(asset('storage/app/public/candidate_image/'.strtotime($cand_obj->updated_at).'.png'));
        $assetUrl3 = @getimagesize(asset('storage/app/public/candidate_image/'.strtotime($cand_obj->created_at).'.PNG'));
        $assetUrl4 = @getimagesize(asset('storage/app/public/candidate_image/'.strtotime($cand_obj->created_at).'.png'));
        $assetUrl5 = @getimagesize(asset('storage/app/public/candidate_image/'.$reg_obj->old_img.'.PNG'));
        $assetUrl6 = @getimagesize(asset('storage/app/public/candidate_image/'.$reg_obj->old_img.'.png'));

        if($assetUrl5 != false)
        {
            return asset('storage/app/public/candidate_image/'.$reg_obj->old_img.'.PNG');
        }
        elseif($assetUrl6 != false)
        {
            return asset('storage/app/public/candidate_image/'.$reg_obj->old_img.'.png');
        }
        elseif($assetUrl3 != false)
        {
            return asset('storage/app/public/candidate_image/'.strtotime($cand_obj->created_at).'.PNG');
        }
        elseif($assetUrl4 != false)
        {
            return asset('storage/app/public/candidate_image/'.strtotime($cand_obj->created_at).'.png');
        }
        elseif($assetUrl1 != false)
        {
            return asset('storage/app/public/candidate_image/'.strtotime($cand_obj->updated_at).'.PNG');
        }
        elseif($assetUrl2 != false)
        {
            return asset('storage/app/public/candidate_image/'.strtotime($cand_obj->updated_at).'.png');
        }
        else
        {
            return $reg_obj->old_img;
        }
    }

    public static function get_xray_verification($centre_id, $reg_id)
    {
        return XrayVerification::where('centre_id',$centre_id)->where('reg_id',$reg_id)->first();
    }

    public static function get_xray_result($centre_id, $reg_id)
    {
        return XrayResult::where('centre_id',$centre_id)->where('reg_id',$reg_id)->first();
    }

    public static function get_medical($centre_id, $reg_id)
    {
        return Medical::where('centre_id',$centre_id)->where('reg_id',$reg_id)->first();
    }

    public static function get_lab_result($centre_id, $reg_id)
    {
        return LabResult::where('centre_id',$centre_id)->where('reg_id',$reg_id)->first();
    }

    public static function get_lab_sticker($centre_id, $reg_id)
    {
        return LabSticker::where('centre_id',$centre_id)->where('reg_id',$reg_id)->first();
    }
}
