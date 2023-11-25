<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHorasAproveHistoryTable extends Migration
{
 
    public function up()
    {
        Schema::create('horas_history', function (Blueprint $table) {
            $table->string('horas_history_id')->unique();
            $table->string('horasextras_id');
            $table->string('user_id');
            $table->string('state');
            $table->timestamps();
        });
        Schema::table('horas_history', function (Blueprint $table) {
            $table->foreign('horasextras_id')->references('horasextras_id')->on('horas_extras'); 
            $table->foreign('user_id')->references('user_id')->on('users'); 
        });
    }
 
    public function down()
    {
        Schema::dropIfExists('horas_history');
    }
}
