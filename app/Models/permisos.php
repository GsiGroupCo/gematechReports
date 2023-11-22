<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class permisos extends Model
{
    use HasFactory;

    protected $fillable = [
        'permiso_id',
        'empleado_id',
        'user_id',
        'motivo',
        'fecha_inicio',
        'fecha_terminacion',
        'jornada',
        'hora_inicio',
        'hora_fin',
        'cant_horas',
        'observaciones',
        'estado',
    ];

    public function Responsable(){
        return $this->belongsTo(Empleado::class, 'empleado_id', 'empleado_id');
    }

    public function Autorizador(){
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}

