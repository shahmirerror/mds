<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CentreLabModules extends Model
{
    use HasFactory;

    protected $fillable = ['centre_id', 'lab_module_id'];
}
