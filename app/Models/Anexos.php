<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anexos extends Model
{
    use HasFactory;

    protected $fillable = [
        'anexo_id',
        'permiso_id',
        'nombre_documento',
        'url'
    ];

    public function Permiso(){
        return $this->belongsTo(permisos::class, 'permiso_id', 'permiso_id');
    }
}

