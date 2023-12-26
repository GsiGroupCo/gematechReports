<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Empleado;
use App\Models\Bono;
use App\Models\BonoHistory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;


class BonosController extends Controller
{
    public function aprobada(Request $request)
    {        
        try {
            $user = Auth::user();
            $exist = Bono::where('bono_id', 'LIKE', $request -> bono_id) -> count(); 
            if($exist){
                Bono::where('bono_id', 'LIKE', $request -> bono_id) -> update([
                    'estado' => 'Aprobado'
                ]);
                BonoHistory::create([
                    'bono_history_id' => uniqid(TRUE),
                    'bono_id'         => $request -> bono_id,
                    'user_id'         => $user -> user_id,
                    'state'           => 'Aprobado'
                ]);
                return redirect() -> route('home') -> with('status', 'Bono Aprobado');
            }else{
                return redirect() -> route('home') -> with('status', 'Bono no encontrado');
            }
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('error', 'Problema Aprobando Bono');
        }
    }

    public function aprobe_all(){
        try {
            $user = Auth::user();
            $exist = Bono::where('estado', 'LIKE',`Pendiente`)-> count();
            $pendientes = Bono::where('estado','LIKE','Pendiente')->get();
            if($exist === 1){
                Bono::where('estado', 'LIKE',`Pendiente`) -> update([
                    'estado' => 'Aprobado'
                ]); 
                for($i = 0; $i < $exist; $i++){
                    BonoHistory::create([
                        'bono_history_id' => uniqid(TRUE),
                        'bono_id'         => $pendientes[$i]['bono_id'],
                        'user_id'         => $user -> user_id,
                        'state'           => 'Aprobado'
                    ]);
                }
            }            
            return redirect() -> route('home') -> with('status', 'Bonos Aprobados');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('error', 'Problema Aprobando Bonos');
        }
    }

    public function desaprobada(Request $request)
    {        
        try {
            $user = Auth::user();
            $exist = Bono::where('bono_id', 'LIKE', $request -> bono_id)->count();
            if($exist){
                Bono::where('bono_id', 'LIKE', $request -> bono_id) -> update([
                    'estado'   => 'Desaprobado',
                    'detalles' => $request -> descripcion
                ]);
                BonoHistory::create([
                    'bono_history_id' => uniqid(TRUE),
                    'bono_id'         => $request -> bono_id,
                    'user_id'         => $user -> user_id,
                    'state'           => 'Desaprobado'
                ]);
                return redirect() -> route('home') -> with('status', 'Bono desaprobado');
            }else{ 
                return redirect() -> route('home') -> with('error', 'Bono no encontrado');
            }
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('status', 'Problema Desaprobando Bono');
        }
    }

    public function auth(Request $request)
    {        
        try { 
            $user = Auth::user();
            $exist = Bono::where('bono_id', 'LIKE', $request -> bono_id)->count();
            if($exist){
                Bono::where('bono_id', 'LIKE', $request -> bono_id) -> update([
                    'estado' => 'Autorizado'
                ]);
                BonoHistory::create([
                    'bono_history_id' => uniqid(TRUE),
                    'bono_id'         => $request -> bono_id,
                    'user_id'         => $user -> user_id,
                    'state'           => 'Autorizado'
                ]);
                return redirect() -> route('home') -> with('status', 'Bono Autorizado');
            }else{ 
                return redirect() -> route('home') -> with('error', 'Bono no encontrado');
            }
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('status', 'Problema  Autorizando Bono');
        }
    } 

    public function auth_all(){
        try {
            $user = Auth::user();
            $exist = Bono::where('estado', 'LIKE',`Aprobado`)-> count();
            $Aprobados = Bono::where('estado','LIKE','Aprobado')->get();
            if($exist === 1){
                Bono::where('estado', 'LIKE',`Aprobado`) -> update([
                    'estado' => 'Autorizado'
                ]); 
                for($i = 0; $i < $exist; $i++){
                    BonoHistory::create([
                        'bono_history_id' => uniqid(TRUE),
                        'bono_id'         => $Aprobados[$i]['bono_id'],
                        'user_id'         => $user -> user_id,
                        'state'           => 'Autorizado'
                    ]);
                }
            }            
            return redirect() -> route('home') -> with('status', 'Bonos Autorizados');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('error', 'Problema Autorizado Bonos');
        }
    }

    public function desauth(Request $request)
    {        
        try {
            $user = Auth::user();
            $exist = Bono::where('bono_id','LIKE', $request -> bono_id) -> count();
            if($exist>0){
                Bono::where('bono_id', 'LIKE', $request -> bono_id) -> update([
                    'estado'   => 'Desautorizado',
                    'detalles' => $request -> descripcion
                ]);
                BonoHistory::create([
                    'bono_history_id' => uniqid(TRUE),
                    'bono_id'         => $request -> bono_id,
                    'user_id'         => $user -> user_id,
                    'state'           => 'Desautorizado'
                ]);
                return redirect() -> route('home') -> with('status', 'Bono desautorizado');
            }else{
                return redirect() -> route('home') -> with('status', 'Bono no encontrado');
            }
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('status', 'Problema desautorizando Bono');
        }
    }

    public function store(Request $request)
    {   
        try {
            $empleado = Empleado::where('cc', 'LIKE', $request->cc)->first();
            $ot = $request->tipe . $request->Ot;
            $fechaInicial = Carbon::parse($request->FechaInicial);
            $fechaFinal = Carbon::parse($request->FechaFinal);
            $diferenciaDias = $fechaFinal->diffInDays($fechaInicial);
        
            for ($i = 0; $i <= $diferenciaDias; $i++) {
                $exist = Bono::where('fecha_bono', $fechaInicial->copy()->addDays($i)->toDateString())
                    ->where('empleado_id', $empleado->empleado_id)
                    ->exists();
        
                if (!$exist) {
                    Bono::create([
                        'bono_id'       => uniqid(true),
                        'empleado_id'   => $empleado->empleado_id,
                        'lugar_bono'    => $request->Lugar,
                        'fecha_bono'    => $fechaInicial->copy()->addDays($i)->toDateString(),
                        'cliente'       => $request->Cliente,
                        'estado'        => 'Pendiente',
                        'detalles'      => 'SIN NOVEDAD',
                        'observaciones' => $request->observaciones,
                        'ot_id'         => $ot,
                    ]);
                }

            }
        
            return redirect()->route('dashboard', ['cc' => $request->cc])->with('status', 'Bonos Registrados');
        } catch (\Throwable $th) {
            return redirect()->route('dashboard', ['cc' => $request->cc])->with('error', 'Problema Registrado Bonos');
        }
    }

    public function update(Request $request)
    {
        try {
            $ot = $request -> tipe.$request -> Ot;
            Bono::where('bono_id', 'LIKE', $request -> bono_id) -> update([ 
                'lugar_bono'   => $request -> Lugar,
                'fecha_bono'   => $request -> Fecha,
                'cliente'      => $request -> Cliente,
                'ot_id'        => $ot,
            ]);
            return redirect() -> route('home') -> with('status', 'Bono Editado');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('status', 'Problema Editado Bono');
        }
    }

}
