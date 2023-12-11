<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\permisos;
use App\Models\HorasExtra;
use App\Models\Bono;
use App\Models\Empleado;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image; 

class WorkerController extends Controller
{

    public function Home(Request $request, $cc)
    {        
        $empleados_id = Empleado::where( 'cc', 'LIKE', $cc) -> get() ;
        $exist = $empleados_id -> count();

        if($exist<=0){ 
            return redirect() -> route('identy') -> with('error', 'Ups. Tenemos un problema iniciando tu secion, Por favor confirma tu documento');
        }

        if ($request->route()->getName() === 'login') {
            Session::put('welcome', 'Bienvenido'.' '. $empleados_id[0]['nombre']);
        }else{
            Session::put('welcome', '');
        }
        
        return Inertia::render('Dashboard',[
            'cc'       => $cc,  
            'Permisos' => permisos::with('Responsable')->where('empleado_id','LIKE', $empleados_id[0]['empleado_id']) -> get(), 
            'Horas'    => HorasExtra::with('Responsable')->where('empleado_id','LIKE', $empleados_id[0]['empleado_id']) -> get(), 
            'Bonos'    => Bono::with('Responsable')->where('empleado_id','LIKE', $empleados_id[0]['empleado_id']) -> get(),
            'status'   => session('status'),
            'welcome'  => session('welcome'),
            'error'    => session('error'),
        ]);
    }

    public function store(Request $request)
    {       
        $empleado_id = uniqid(TRUE);
        $exist = Empleado::where('cc','LIKE',$request -> cc)->get()->count();
        if($exist > 0){ 
            return redirect() -> route('home') -> with('error', 'Ya existe un trabajador con esta cedula');
        }else{ 
            Empleado::create([
                'empleado_id' => $empleado_id,
                'nombre'      => $request -> nombre,
                'cargo'       => $request -> cargo,
                'cc'          => $request -> cc,
                'estado'      => 'VIGENTE'
            ]);
            return redirect() -> route('home') -> with('status', 'Trabajador Registrado');
        }
    }

}
