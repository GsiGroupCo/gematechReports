<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermisosAproveHistoryTable extends Migration
{
 
    public function up()
    {
        Schema::create('permisos_history', function (Blueprint $table) {
            $table->string('permisos_history_id')->unique();
            $table->string('permiso_id');
            $table->string('user_id');
            $table->string('state');
            $table->timestamps();
        });
        Schema::table('permisos_history', function (Blueprint $table) {
            $table->foreign('permiso_id')->references('permiso_id')->on('permisos');
            $table->foreign('user_id')->references('user_id')->on('users'); 
        });
    }
 
    public function down()
    {
        Schema::dropIfExists('permisos_history');
    }
}
