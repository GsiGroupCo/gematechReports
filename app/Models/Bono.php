<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bono extends Model
{
    use HasFactory;

    protected $fillable = [
        'bono_id',
        'ot_id',
        'empleado_id',
        'lugar_bono',
        'fecha_bono',
        'estado',
        'cliente',
        'detalles',
        'observaciones'
    ];

    public function Responsable(){
        return $this->belongsTo(Empleado::class, 'empleado_id', 'empleado_id');
    }

}
