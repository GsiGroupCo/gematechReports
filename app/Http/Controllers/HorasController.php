<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Empleado;
use App\Models\HoraHistory;
use App\Models\HorasExtra;

class HorasController extends Controller
{
    public function aprobada(Request $request)
    {         
        try {
            HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id) -> update([
                'estado' => 'Aprobado'
            ]);
            HoraHistory::create([
                'horas_history_id' => uniqid(TRUE),
                'horasextras_id'  => $request -> horasextras_id,
                'user_id'         => $request -> user_id,
                'state'           => 'Aprobado'
            ]);
            return redirect() -> route('home') -> with('status', 'Hora Aprobada');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('status', 'Problema Aprobando Hora');
        }
    }

    public function desaprobada(Request $request)
    {         
        try {
            HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id) -> update([
                'estado'   => 'Desaprobado',
                'detalles' => $request -> descripcion
            ]);
            HoraHistory::create([
                'horas_history_id' => uniqid(TRUE),
                'horasextras_id'  => $request -> horasextras_id,
                'user_id'         => $request -> user_id,
                'state'           => 'Desaprobado'
            ]);
            return redirect() -> route('home') -> with('status', 'Hora desaprobada');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('error', 'Problema desaprobando hora');
        }
    }

    public function auth(Request $request)
    {       
        try {
            HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id) -> update([
                'estado' => 'Autorizado'
            ]);
            HoraHistory::create([
                'horas_history_id' => uniqid(TRUE),
                'horasextras_id'  => $request -> horasextras_id,
                'user_id'         => $request -> user_id,
                'state'           => 'Autorizado'
            ]);
            return redirect() -> route('home') -> with('status', 'Hora Autorizada');
        } catch (\Throwable $th) {
            dd($th);
            return redirect() -> route('home') -> with('error', 'Problema Autorizando hora');
        }
    }

    public function desauth(Request $request)
    {        
        try {
            $exist =  HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id) -> count();
            if($exist > 0){
                HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id) -> update([
                    'estado'   => 'Desautorizado',
                    'detalles' => $request -> descripcion
                ]);
                HoraHistory::create([
                    'horas_history_id' => uniqid(TRUE),
                    'horasextras_id'  => $request -> horasextras_id,
                    'user_id'         => $request -> user_id,
                    'state'           => 'Desautorizado'
                ]);
                return redirect() -> route('home') -> with('status', 'Hora desautorizada');
            }else{
                return redirect() -> route('home') -> with('status', 'Problema desautorizando hora');
            }
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('status', 'Problema desautorizando hora');
        }
    }

    public function store(Request $request)
    {        
        try {
            function calcular_tiempo_trasnc($hora1,$hora2){

                $separar[1]=explode(':',$hora1);
                $separar[2]=explode(':',$hora2);
    
                $total_minutos_trasncurridos[1] = ($separar[1][0]*60)+$separar[1][1];
                $total_minutos_trasncurridos[2] = ($separar[2][0]*60)+$separar[2][1];
                if($total_minutos_trasncurridos[1] > $total_minutos_trasncurridos[2]){
                    $total_minutos_trasncurridos = $total_minutos_trasncurridos[1]-$total_minutos_trasncurridos[2];
                }else{
                    $total_minutos_trasncurridos = $total_minutos_trasncurridos[2]-$total_minutos_trasncurridos[1];
                }
                if($total_minutos_trasncurridos<=59) return($total_minutos_trasncurridos.' Minutos');
                elseif($total_minutos_trasncurridos>59){
                $HORA_TRANSCURRIDA = round($total_minutos_trasncurridos/60);
                if($HORA_TRANSCURRIDA<=9) $HORA_TRANSCURRIDA='0'.$HORA_TRANSCURRIDA;
                $MINUITOS_TRANSCURRIDOS = $total_minutos_trasncurridos%60;
                if($MINUITOS_TRANSCURRIDOS<=9) $MINUITOS_TRANSCURRIDOS='0'.$MINUITOS_TRANSCURRIDOS;
                return ($HORA_TRANSCURRIDA.':'.$MINUITOS_TRANSCURRIDOS.' Horas');
    
                }
            }
            
            $empleado = Empleado::where('cc','LIKE',$request -> cc) -> get();
          
            $ot = $request -> tipe.$request -> Ot;
            HorasExtra::create([
                'horasextras_id' => uniqid(TRUE),
                'empleado_id'    => $empleado[0]['empleado_id'],
                'fecha'          => $request -> Fecha,
                'hora_inicial'   => $request -> HoraInicial,
                'hora_final'     => $request -> HoraFinal,
                'cant_Horas'     => calcular_tiempo_trasnc( $request ->HoraFinal, $request ->HoraInicial ),
                'estado'         => 'Pendiente',
                'detalles'       => 'SIN NOVEDAD',
                'observaciones'  => $request -> observaciones,
                'ot'             => $ot,
            ]);
    
            return redirect() -> route('dashboard',['cc' => $request -> cc]) -> with('status', 'Hora Registrada');
        } catch (\Throwable $th) {
            return redirect() -> route('dashboard',['cc' => $request -> cc]) -> with('error', 'Problema Registrando hora');
        }
    }

    public function update(Request $request){
        
        try {
            function calcular_tiempo_trasnc2($hora1,$hora2){

                $separar[1]=explode(':',$hora1);
                $separar[2]=explode(':',$hora2);
    
                $total_minutos_trasncurridos[1] = ($separar[1][0]*60)+$separar[1][1];
                $total_minutos_trasncurridos[2] = ($separar[2][0]*60)+$separar[2][1];
                if($total_minutos_trasncurridos[1] > $total_minutos_trasncurridos[2]){
                    $total_minutos_trasncurridos = $total_minutos_trasncurridos[1]-$total_minutos_trasncurridos[2];
                }else{
                    $total_minutos_trasncurridos = $total_minutos_trasncurridos[2]-$total_minutos_trasncurridos[1];
                }
                if($total_minutos_trasncurridos<=59) return($total_minutos_trasncurridos.' Minutos');
                elseif($total_minutos_trasncurridos>59){
                $HORA_TRANSCURRIDA = round($total_minutos_trasncurridos/60);
                if($HORA_TRANSCURRIDA<=9) $HORA_TRANSCURRIDA='0'.$HORA_TRANSCURRIDA;
                $MINUITOS_TRANSCURRIDOS = $total_minutos_trasncurridos%60;
                if($MINUITOS_TRANSCURRIDOS<=9) $MINUITOS_TRANSCURRIDOS='0'.$MINUITOS_TRANSCURRIDOS;
                return ($HORA_TRANSCURRIDA.':'.$MINUITOS_TRANSCURRIDOS.' Horas');
    
                }
            }
    
            $ot = $request -> tipe.$request -> Ot;
    
            HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id) -> update([
                'fecha'          => $request -> Fecha,
                'hora_inicial'   => $request -> HoraInicial,
                'hora_final'     => $request -> HoraFinal,
                'cant_Horas'     => calcular_tiempo_trasnc2( $request ->HoraFinal, $request ->HoraInicial ), 
                'ot'             => $ot,
            ]);
            return redirect() -> route('home') -> with('status', 'Hora Editada');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('status', 'Problema Editando Hora');
        }
    }
}
