<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QueueManager extends Model
{
    use HasFactory;

    protected $table = 'queue_manager';
}
