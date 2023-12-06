<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonoHistory extends Model
{
    use HasFactory;

    protected $table = 'bonos_history';

    protected $fillable = [
       'bono_history_id',
       'bono_id',
       'user_id',
       'state'
    ];

    public function Responsable(){
        return $this->belongsTo(user::class, 'user_id', 'user_id');
    }

    public function Historial(){
        return $this->hasMany(HoraHistory::class, 'horasextras_id', 'horasextras_id');
    }

    public function Bono(){
        return $this->belongsTo(Bono::class, 'bono_id', 'bono_id');
    }

}
