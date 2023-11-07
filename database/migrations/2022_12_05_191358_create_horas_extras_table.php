<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHorasExtrasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('horas_extras', function (Blueprint $table) {
            $table->id();
            $table->string('horasextras_id')->unique();
            $table->string('empleado_id');
            $table->string('fecha');
            $table->time('hora_inicial');
            $table->time('hora_final');
            $table->string('cant_Horas');
            $table->string('estado');
            $table->string('ot');
            $table->string('detalles',500);
            $table->string('observaciones',500);
            $table->timestamps();
        });
        Schema::table('horas_extras', function (Blueprint $table) {
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
        Schema::dropIfExists('horas_extras');
    }
}
