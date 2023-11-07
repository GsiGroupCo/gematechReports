<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermisosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permisos', function (Blueprint $table) {
            $table->id();
            $table->string('permiso_id')->unique();
            $table->string('empleado_id');
            $table->string('motivo');
            $table->date('fecha_inicio');
            $table->date('fecha_terminacion');
            $table->string('jornada');
            $table->time('hora_inicio');
            $table->time('hora_fin');
            $table->string('cant_horas');
            $table->string('observaciones');
            $table->string('estado');
            $table->timestamps();
        });

        Schema::table('permisos', function (Blueprint $table) {
            $table->foreign('empleado_id')->references('empleado_id')->on('empleados');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permisos');
    }
}
