<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\WorkerController;
use App\Http\Controllers\ExcelController;
use App\Http\Controllers\PermisosController;
use App\Http\Controllers\BonosController;
use App\Http\Controllers\HorasController;
use App\Http\Controllers\AnexosController;

Route::get('/', function () {
    return  redirect('identy');
});

Route::controller(AuthController::class) -> group(function () {
    Route::get('/home', 'Home')       -> name ('home')     -> middleware('auth'); 
    Route::post('/register','store')  -> name ('store')    -> middleware('auth'); 
    Route::post('/change','update')   -> name ('update')   -> middleware('auth'); 
    Route::get('/identy','Identy')    -> name ('identy'); 
    Route::get('/login','login')      -> name ('login');  
    Route::post('/token','token')     -> name ('token');  
    Route::get('/logout','logout')    -> name ('logout'); 
});

Route::controller(WorkerController::class) -> group(function () {
    Route::post('/worker/store','store') -> name ('worker.store') -> middleware('auth');
    Route::get('/dashboard/{cc}','Home') -> name ('dashboard'); 
});

Route::controller(BonosController::class) -> group(function () {
    Route::post('/bonos/store','store')             -> name ('bonos.store');
    Route::post('/bono/autorizacion','auth')        -> name ('bono.autorizacion')     -> middleware('auth'); 
    Route::post('/bono/desautorizacion','desauth')  -> name ('bono.desautorizacion')  -> middleware('auth'); 
    Route::post('/bono/aprobada','aprobada')        -> name ('horas.aprobada')        -> middleware('auth'); 
    Route::post('/bono/desaprobada','desaprobada')  -> name ('horas.desaprobada')     -> middleware('auth');
    Route::post('/bonos/update','update')           -> name ('bonos.updates')         -> middleware('auth');
});

Route::controller(HorasController::class) -> group(function () {
    Route::post('/horas/autorizacion','auth')       -> name ('horas.autorizacion')    -> middleware('auth');
    Route::post('/horas/desautorizacion','desauth') -> name ('horas.disautorizacion') -> middleware('auth');
    Route::post('/horas/aprobada','aprobada')       -> name ('horas.aprobada')        -> middleware('auth'); 
    Route::post('/horas/desaprobada','desaprobada') -> name ('horas.aprobada')        -> middleware('auth'); 
    Route::post('/horas/update','update')           -> name ('horas.updates')         -> middleware('auth'); 
    Route::post('/horas/store/','store')            -> name ('horas.store');
});

Route::controller(PermisosController::class) -> group(function () {
    Route::post('/permisos/store','store')          -> name ('permiso.store')     -> middleware('auth');
    Route::patch('/permisos/update','update')       -> name ('permiso.update')    -> middleware('auth');
    Route::patch('/permisos/aprobe','aprobe')       -> name ('permiso.disaprobe') -> middleware('auth');
    Route::patch('/permisos/disaprobe','disaprobe') -> name ('permiso.aprobe')    -> middleware('auth');
}); 

Route::controller(AnexosController::class) -> group(function () {
    Route::post('/anexo/store','store')    -> name ('anexo.store')  -> middleware('auth');
    Route::patch('/anexo/delete','delete') -> name ('anexo.delete') -> middleware('auth'); 
});

Route::controller(ExcelController::class)->group(function () {
    Route::get('/getReportePermisos/{Fecha_inicio}/{Fecha_corte}', 'get_documentPermiss') -> name('get_documentPermiss') -> middleware('auth');
    Route::get('/getReporteHoras/{Fecha_inicio}/{Fecha_corte}', 'get_documentHoras')      -> name('get_documentHoras')   -> middleware('auth');
    Route::get('/getReporteBonos/{Fecha_inicio}/{Fecha_corte}', 'get_documentBonos')      -> name('get_documentBonos')   -> middleware('auth');
});