<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermisosHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'permisos_history_id',
        'permiso_id',
        'user_id',
        'state'
    ];

    public function Responsable(){
        return $this->belongsTo(user::class, 'user_id', 'user_id');
    }

    public function Permisos(){
        return $this->belongsTo(permisos::class, 'permiso_id', 'permiso_id');
    }

}
