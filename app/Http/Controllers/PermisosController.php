<?php

namespace App\Http\Controllers;

use App\Models\Anexos;
use Illuminate\Http\Request;

use App\Models\permisos;
use App\Models\PermisosHistory;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image; 

class PermisosController extends Controller
{
    public function store(Request $request)
    {        
        try { 
             // Convertir las cadenas de hora a objetos DateTime
            $datetimeA = \DateTime::createFromFormat('H:i', $request -> HoraInicio);
            $datetimeB = \DateTime::createFromFormat('H:i', $request -> HoraTerminacion);

            // Verificar si la conversión fue exitosa
            if ($datetimeA === false || $datetimeB === false) {
                return "Error en el formato de hora.";
            }

            // Calcular la diferencia entre las dos horas
            $diferencia = $datetimeA->diff($datetimeB);

            // Obtener la diferencia en horas y minutos
            $horas = $diferencia->format('%H');
            $minutos = $diferencia->format('%I');
            
            $permiso_id = uniqid(TRUE);
            permisos::create([
                'permiso_id'        => $permiso_id,
                'empleado_id'       => $request -> Solicitante,
                'motivo'            => $request -> Motivo,
                'fecha_inicio'      => $request -> FechaInicio,
                'fecha_terminacion' => $request -> FechaTerminacion,
                'jornada'           => $request -> Jornada,
                'hora_inicio'       => $request -> HoraInicio,
                'hora_fin'          => $request -> HoraTerminacion,
                'cant_horas'        => $horas.':'.$minutos,
                'remuneracion'      => $request -> NotRec ? 'sin remuneracion' : 'con remuneracion',
                'observaciones'     => $request -> Observaciones,
                'estado'            => 'Pendiente',
            ]);

            for ($i = 1; $i <= $request -> CantDocs; $i++) {
                $documento = $request -> file('Docs_'.$i);
                $filename = $documento->getClientOriginalName();  
                $compressedImage = Image::make($documento)->encode('jpg', 80);
                $compressedImage->move(public_path() . "/Permisos", $filename);
                Anexos::create([
                    'anexo_id'         => uniqid(TRUE),
                    'permiso_id'       => $permiso_id,
                    'nombre_documento' => $filename,
                    'url'              => `/storage/Permisos/`.$filename,
                ]);
            } 
            return redirect() -> route('home') -> with('status', 'Permiso Registrado'); 
        } catch (\Throwable $th) { 
            return redirect() -> route('home') -> with('error', 'Problema registrnado permiso');
        }
    }

    public function update(Request $request)
    {   
        try { 
            $datetimeA = \DateTime::createFromFormat('H:i', $request -> HoraInicio);
            $datetimeB = \DateTime::createFromFormat('H:i', $request -> HoraTerminacion);
            $diferencia = $datetimeA->diff($datetimeB);
            $horas = $diferencia->format('%H');
            $minutos = $diferencia->format('%I');
            $exist = count(permisos::where('permiso_id','LIKE',$request -> permiso_id) -> get());
            if($exist === 1){
                permisos::where( 'permiso_id' , 'LIKE' , $request -> permiso_id )->update([
                    'empleado_id'       => $request -> Solicitante,
                    'motivo'            => $request -> Motivo,
                    'fecha_inicio'      => $request -> FechaInicio,
                    'fecha_terminacion' => $request -> FechaTerminacion,
                    'jornada'           => $request -> Jornada,
                    'hora_inicio'       => $request -> HoraInicio,
                    'hora_fin'          => $request -> HoraTerminacion,
                    'cant_horas'        => $horas.':'.$minutos,
                    'observaciones'     => $request -> Observaciones
                ]);
            }else{
                return redirect() -> route('home') -> with('status', 'Permiso No encontrado'); 
            }
            return redirect() -> route('home') -> with('status', 'Permiso Actualizado'); 
        } catch (\Throwable $th) { 
            return redirect() -> route('home') -> with('error', 'Problema Actualizando permiso');
        }
    }
    
    public function aprobe(Request $request)
    {        
        try {
            $user = Auth::user();
            $exist = permisos::where('permiso_id', 'LIKE', $request -> permiso_id) -> count(); 
            if($exist === 1){
                permisos::where('permiso_id', 'LIKE', $request -> permiso_id) -> update([
                    'estado' => 'Aprobado'
                ]); 
                PermisosHistory::create([
                    'permisos_history_id' => uniqid(TRUE),
                    'permiso_id'          => $request -> permiso_id,
                    'user_id'             => $user -> user_id,
                    'state'               => 'Aprobado'
                ]);
                return redirect() -> route('home') -> with('status', 'Permiso Aprobado');
            }else{
                return redirect() -> route('home') -> with('status', 'Permiso No encontrado');
            }
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('error', 'Problema Aprobando Permiso');
        }
    }


    public function aprobe_all(){
        try {
            $user = Auth::user();
            $exist = permisos::where('estado', 'LIKE',`Pendiente`)-> count();
            $pendientes = permisos::where('estado','LIKE','Pendiente')->get();
            if($exist === 1){
                permisos::where('estado', 'LIKE',`Pendiente`) -> update([
                    'estado' => 'Aprobado'
                ]); 
                for($i = 0; $i < $exist; $i++){
                    PermisosHistory::create([
                        'permisos_history_id' => uniqid(TRUE),
                        'permiso_id'          => $pendientes[$i]['permiso_id'],
                        'user_id'             => $user -> user_id,
                        'state'               => 'Aprobado'
                    ]);
                }
            }            
            return redirect() -> route('home') -> with('status', 'Permiso Aprobado');
        } catch (\Throwable $th) {
            return redirect() -> route('home') -> with('error', 'Problema Aprobando Permiso');
        }
    }

    public function disaprobe(Request $request)
    {        
        try {
            $exist = permisos::where('permiso_id', 'LIKE', $request -> permiso_id) -> count();
            if($exist === 1){
                permisos::where('permiso_id', 'LIKE', $request -> permiso_id) -> update([
                    'estado'   => 'Desaprobado',
                    'detalles' => $request -> descripcion
                ]);
                PermisosHistory::create([
                    'permisos_history_id' => uniqid(TRUE),
                    'permiso_id'          => $request -> permiso_id,
                    'user_id'             => $request -> user_id,
                    'state'               => 'Desaprobado'
                ]);
                return redirect() -> route('home') -> with('status', 'Permiso desaprobado');
            }else{
                return redirect() -> route('home') -> with('status', 'Upss.. Permiso No encontrado');
            }
        } catch (\Throwable $th) { 
            return redirect() -> route('home') -> with('status', 'Problema Desaprobando Permiso');
        }
    }
}
