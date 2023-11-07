<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBonosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bonos', function (Blueprint $table) {
            $table->id();
            $table->string('bono_id')->unique();
            $table->string('ot_id');
            $table->string('empleado_id');
            $table->string('lugar_bono');
            $table->date('fecha_bono');
            $table->string('cliente');
            $table->string('estado');
            $table->string('detalles',500);
            $table->string('observaciones',500);
            $table->timestamps();
        });
        Schema::table('bonos', function (Blueprint $table) {
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
        Schema::dropIfExists('bonos');
    }
}
