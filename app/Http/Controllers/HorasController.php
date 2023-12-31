<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Empleado;
use App\Models\HoraHistory;
use App\Models\HorasExtra;

use Illuminate\Support\Facades\Auth;

class HorasController extends Controller
{
    public function aprobada(Request $request)
    {         
        try {
            $user = Auth::user();
            $exist = HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id)->get()->count();
            if($exist){
                HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id) -> update([
                    'estado' => 'Aprobado'
                ]);
                HoraHistory::create([
                    'horas_history_id' => uniqid(TRUE),
                    'horasextras_id'  => $request -> horasextras_id,
                    'user_id'         => $user -> user_id,
                    'state'           => 'Aprobado'
                ]);
                return redirect() -> route('home') -> with('status', 'Hora Aprobada');
            }else{ 
                return redirect() -> route('home') -> with('error', 'Hora no encontrada');
            }
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('status', 'Problema Aprobando Hora');
        }
    }

    public function aprobada_all(){
        try {
            $user = Auth::user();
            $exist = HorasExtra::where('estado', 'LIKE',`Pendiente`)-> count();
            $Pendiente = HorasExtra::where('estado','LIKE','Pendiente')->get();
            if($exist === 1){
                HorasExtra::where('estado', 'LIKE',`Aprobado`) -> update([
                    'estado' => 'Aprobado'
                ]); 
                for($i = 0; $i < $exist; $i++){
                    HoraHistory::create([
                        'bono_history_id' => uniqid(TRUE),
                        'bono_id'         => $Pendiente[$i]['horasextras_id'],
                        'user_id'         => $user -> user_id,
                        'state'           => 'Aprobado'
                    ]);
                }
            }            
            return redirect() -> route('home') -> with('status', 'Horas Extras Aprobadas');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('error', 'Problema Aprobando Horas Extras');
        }
    }

    public function desaprobada(Request $request)
    {         
        try {
            $user = Auth::user();
            $exist = HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id)->get()->count();
            if($exist){
                HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id) -> update([
                    'estado'   => 'Desaprobado',
                    'detalles' => $request -> descripcion
                ]);
                HoraHistory::create([
                    'horas_history_id' => uniqid(TRUE),
                    'horasextras_id'  => $request -> horasextras_id,
                    'user_id'         => $user -> user_id,
                    'state'           => 'Desaprobado'
                ]);
            }else{
                return redirect() -> route('home') -> with('error', 'Hora no encontrada');
            }
            return redirect() -> route('home') -> with('status', 'Hora desaprobada');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('error', 'Problema desaprobando hora');
        }
    }
    

    public function auth(Request $request)
    {       
        try {
            $user = Auth::user();
            $exist = HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id)->get()->count();
            if($exist){
                HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id) -> update([
                    'estado' => 'Autorizado'
                ]);
                HoraHistory::create([
                    'horas_history_id' => uniqid(TRUE),
                    'horasextras_id'  => $request -> horasextras_id,
                    'user_id'         => $user -> user_id,
                    'state'           => 'Autorizado'
                ]);
                return redirect() -> route('home') -> with('status', 'Hora Autorizada');
            }else{
                return redirect() -> route('home') -> with('status', 'Hora no encontrada');
            }
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('error', 'Problema Autorizando hora');
        }
    }

    public function desauth(Request $request)
    {        
        try {
            $user = Auth::user();
            $exist =  HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id) -> count();
            if($exist > 0){
                HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id) -> update([
                    'estado'   => 'Desautorizado',
                    'detalles' => $request -> descripcion
                ]);
                HoraHistory::create([
                    'horas_history_id' => uniqid(TRUE),
                    'horasextras_id'  => $request -> horasextras_id,
                    'user_id'         => $user -> user_id,
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

    public function auth_all(){
        try {
            $user = Auth::user();
            $exist = HorasExtra::where('estado', 'LIKE',`Aprobado`)-> count();
            $Aprobados = HorasExtra::where('estado','LIKE','Aprobado')->get();
            if($exist === 1){
                HorasExtra::where('estado', 'LIKE',`Aprobado`) -> update([
                    'estado' => 'Autorizado'
                ]); 
                for($i = 0; $i < $exist; $i++){
                    HoraHistory::create([
                        'bono_history_id' => uniqid(TRUE),
                        'bono_id'         => $Aprobados[$i]['horasextras_id'],
                        'user_id'         => $user -> user_id,
                        'state'           => 'Autorizado'
                    ]);
                }
            }            
            return redirect() -> route('home') -> with('status', 'Horas Extras Autorizadas');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('error', 'Problema Autorizado Horas Extras');
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
            $exist = HorasExtra::where([
                ['fecha', 'LIKE', $request->Fecha],
                ['empleado_id', 'LIKE', $empleado[0]['empleado_id']]
            ])->exists();
            if(!$exist){
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
            }else{
                return redirect() -> route('dashboard',['cc' => $request -> cc]) -> with('error', 'Ya existe un reporte de Horas extra con esta fecha.');
            } 
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
            $exist =  HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id) -> count();
            if($exist){
                HorasExtra::where('horasextras_id', 'LIKE', $request -> horasextras_id) -> update([
                    'fecha'          => $request -> Fecha,
                    'hora_inicial'   => $request -> HoraInicial,
                    'hora_final'     => $request -> HoraFinal,
                    'cant_Horas'     => calcular_tiempo_trasnc2( $request ->HoraFinal, $request ->HoraInicial ), 
                    'ot'             => $ot,
                ]);
            }else{ 
                return redirect() -> route('home') -> with('error', 'Hora Extra no encontrada');
            }
            return redirect() -> route('home') -> with('status', 'Hora Editada');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('status', 'Problema Editando Hora');
        }
    }
}
