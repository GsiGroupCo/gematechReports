<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HorasExtra extends Model
{
    use HasFactory;

    protected $fillable = [
        'horasextras_id',
        'empleado_id',
        'fecha',
        'hora_inicial',
        'hora_final',
        'cant_Horas',
        'ot',
        'estado',
        'detalles',
        'observaciones'
    ];

    public function Responsable(){
        return $this->belongsTo(Empleado::class, 'empleado_id', 'empleado_id');
    }


}
