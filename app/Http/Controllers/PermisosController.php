<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

use App\Models\permisos;
use App\Models\Empleado;

use Illuminate\Support\Facades\Auth;

class PermisosController extends Controller
{
    public function store(Request $request)
    {       
        try {
            permisos::create([
                'permiso_id'        => uniqid(TRUE),
                'empleado_id'       => $request -> Solicitante,
                'motivo'            => $request -> Motivo,
                'fecha_inicio'      => $request -> FechaInicio,
                'fecha_terminacion' => $request -> FechaTerminacion,
                'jornada'           => $request -> Jornada,
                'hora_inicio'       => $request -> HoraInicio,
                'hora_fin'          => $request -> HoraTerminacion,
                'cant_horas'        => $request -> CantHoras,
                'observaciones'     => $request -> Observaciones,
                'estado'            => 'Pendiente',
            ]);
    
            return redirect() -> route('home') -> with('status', 'Permiso Registrado');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('error', 'Problema registrnado permiso');
        }
    }
}
