<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HoraHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'horas_history_id',
        'horasextras_id',
        'user_id',
        'state'
    ];

    public function Responsable(){
        return $this->belongsTo(user::class, 'user_id', 'user_id');
    }

    public function Horas(){
        return $this->belongsTo(HorasExtra::class, 'horasextras_id', 'horasextras_id');
    }

}
