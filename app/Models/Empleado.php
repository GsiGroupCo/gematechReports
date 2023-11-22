<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;

    protected $fillable = [
        'empleado_id',
        'nombre',
        'cargo',
        'cc',
        'estado'
    ];

    public function bonos(){
        return $this->hasMany(Bono::class, 'empleado_id', 'empleado_id');
    }

    public function horas_extras(){
        return $this->hasMany(HorasExtra::class, 'empleado_id', 'empleado_id');
    }
 

}
