<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

use App\Models\Modules;
use Auth;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    public function role()
    {
        return $this->belongsTo('App\Models\Roles','role_id','id');
    }

    public function centre()
    {
        return $this->belongsTo('App\Models\CentreUsers','id','user_id');
    }

    public function modules($centre_id, $user_id)
    {
        return LabModules::my_lab_modules($centre_id, $user_id);
    }

    public static function check_permission($module_id, $right_name)
    {
        if(Auth::user()->role_id != 2)
        {
            $mod_per = LabModulePermissions::where('lab_module_id',$module_id)->where('name',$right_name)->first();

            if($mod_per)
            {
                $check = StaffLabRights::where('permission_id',$mod_per->id)->where('user_id',Auth::user()->id)->first();

                if($check)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return "500";
            }
        }
        else
        {
            return true;
        }
    }
}
