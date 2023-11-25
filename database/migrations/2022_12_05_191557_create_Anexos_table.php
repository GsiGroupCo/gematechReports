<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnexosTable extends Migration
{
 
    public function up()
    {
        Schema::create('anexos', function (Blueprint $table) {
            $table->string('anexo_id')->unique();
            $table->string('permiso_id');
            $table->string('nombre_documento');
            $table->string('url');
            $table->timestamps();
        });
        Schema::table('anexos', function (Blueprint $table) {
            $table->foreign('permiso_id')->references('permiso_id')->on('permisos'); 
        });
    }
 
    public function down()
    {
        Schema::dropIfExists('anexos');
    }
}
