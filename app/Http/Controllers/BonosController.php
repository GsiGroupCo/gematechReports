<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Empleado;
use App\Models\Bono; 

class BonosController extends Controller
{

    public function aprobada(Request $request)
    {        
        try {
            Bono::where('bono_id', 'LIKE', $request -> bono_id) -> update([
                'estado' => 'Aprobado'
            ]);
            return redirect() -> route('home') -> with('status', 'Bono Aprobado');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('error', 'Problema Aprobando Bono');
        }
    }

    public function desaprobada(Request $request)
    {        
        try {
            Bono::where('bono_id', 'LIKE', $request -> bono_id) -> update([
                'estado'   => 'Desaprobado',
                'detalles' => $request -> descripcion
            ]);
            return redirect() -> route('home') -> with('status', 'Bono desaprobado');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('status', 'Problema Desaprobando Bono');
        }
    }

    public function auth(Request $request)
    {        
        try {
            Bono::where('bono_id', 'LIKE', $request -> bono_id) -> update([
                'estado' => 'Autorizado'
            ]);
            return redirect() -> route('home') -> with('status', 'Bono Autorizado');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('status', 'Problema  Autorizando Bono');
        }
    } 

    public function desauth(Request $request)
    {        
        try {
            $exist = Bono::where('bono_id','LIKE', $request -> bono_id) -> count();
            if($exist>0){
                Bono::where('bono_id', 'LIKE', $request -> bono_id) -> update([
                    'estado'   => 'Desautorizado',
                    'detalles' => $request -> descripcion
                ]);
                return redirect() -> route('home') -> with('status', 'Bono desautorizado');
            }else{
                return redirect() -> route('home') -> with('status', 'Problema desautorizando Bono');
            }
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('status', 'Problema desautorizando Bono');
        }
    }

    public function store(Request $request)
    {       
        try {
            $empleado = Empleado::where('cc','LIKE',$request -> cc) -> get();
            $ot = $request -> tipe.$request -> Ot;
            Bono::create([
                'bono_id'      => uniqid(TRUE),
                'empleado_id'  => $empleado[0]['empleado_id'],
                'lugar_bono'   => $request -> Lugar,
                'fecha_bono'   => $request -> Fecha,
                'cliente'      => $request -> Cliente,
                'estado'       => 'Pendiente',
                'detalles'     => 'SIN NOVEDAD',
                'observaciones'=> $request -> observaciones,
                'ot_id'        => $ot,
            ]);

            return redirect() -> route('dashboard',['cc' => $request -> cc]) -> with('status', 'Bono Registrado');
        } catch (\Throwable $th) { 
            return redirect() -> route('dashboard',['cc' => $request -> cc]) -> with('error', 'Problema  Registrado');
        }
    }

    public function update(Request $request){
         
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