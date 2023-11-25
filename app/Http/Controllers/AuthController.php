<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\permisos;
use App\Models\HorasExtra;
use App\Models\Bono;
use App\Models\Empleado;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash; 

class AuthController extends Controller
{

    public function Home()
    {       
        
        $year = now()->year;
        $user = Auth::user();
        
        return Inertia::render('Auth/Dashboard',[
            'Admin'        => $user -> cargo,
            'Personal'     => Empleado::all(),
            'PermisosData' => permisos::with('Responsable','Anexos')->whereHas('Responsable', function ($query) {
                                $query->where('estado', 'LIKE', 'VIGENTE');
                              }) -> whereYear('created_at', '>=', $year) ->orderBy('updated_at', 'desc') -> get(),  
            'HorasData'    => HorasExtra::with('Responsable')->whereHas('Responsable', function ($query) {
                                $query->where('estado', 'LIKE', 'VIGENTE');
                              }) -> whereYear('created_at', '>=', $year) ->orderBy('updated_at', 'desc') -> get(),
            'BonosData'    => Bono::with('Responsable') -> whereHas('Responsable', function ($query) {
                                $query->where('estado', 'LIKE', 'VIGENTE');
                              }) -> whereYear('created_at', '>=', $year) ->orderBy('updated_at', 'desc') -> get(),
            'status'       => session('status'),
            'error'        => session('error'),
        ]);
    }

    public function store(Request $request)
    {       
        $exist   = User::where( 'email', 'LIKE', $request -> email ) -> get() -> count();

        if($exist){
            return redirect() -> route('home') -> with('error', 'El email ya se encuentra registrado');
        }

        $user_id = uniqid(TRUE);
        User::create([
            'user_id'   => $user_id,
            'nombre'    => $request -> nombre,
            'email'    => $request -> email,
            'password'  => Hash::make($request -> password),
            'cargo'     => $request -> cargo,
        ]);

        return redirect() -> route('home') -> with('status', 'Usuario registrado');
    }

    public function update(Request $request)
    {       

        $exist = User::where( 'email', 'LIKE', $request -> email ) -> get() -> count();
        $userData = User::where( 'email', 'LIKE', $request -> email ) -> get();
        
        if($exist < 1){
            return redirect() -> route('home') -> with('error', 'No existe un usuario registrado con ese correo');
        }

        $password = $userData[0]['password'];

        if(Hash::check($request -> old_password, $password)) {
            if($request -> new_password != $request -> confirm_new_password){
                return redirect() -> route('home') -> with('error', 'La contraseña vieja y su confirmacion no coinciden ');
            }
            User::where('email', 'LIKE', $request -> email)->update([
                'password'  => Hash::make($request -> new_password)
            ]);
            return redirect() -> route('home') -> with('status', 'Contraseña Cambiada');
        }else{
            return redirect() -> route('home') -> with('error', 'La Contraseña no coinciden');
        }
    }

    public function login()
    {
        return Inertia::render('Auth/Login',[
            'status' => session('status'),
            'error'  => session('error'),
        ]);
    }

    public function Identy()
    {
        return Inertia::render('Auth/Identy',[
            'status' => session('status'),
            'error'  => session('error'),
        ]);
    }

    public function token(Request $request)
    {
        $credentials = $request -> validate([
            'email' => ['required','email'],
            'password' => ['required']
        ]);
        if(Auth::attempt($credentials)) {
            $request -> session() -> regenerate();
            return redirect() -> route('home') -> with('status', 'Bienvenido'.' '. Auth::user()-> nombre);
        }        
        return redirect() -> route('login') -> with('error', 'Ups. Tenemos un problema iniciando tu secion, Por favor confirma tu usuario y contraseña');
    }

    public function logout(Request $request)
    {
        auth()->logout();
        return redirect()->to('/identy');
    }

}
