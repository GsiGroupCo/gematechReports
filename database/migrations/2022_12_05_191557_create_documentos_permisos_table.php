<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentosPermisosTable extends Migration
{

    public function up()
    {
        Schema::create('documentos_permisos', function (Blueprint $table) {
            $table->id();
            $table->string('document_id') -> unique();
            $table->string('permiso_id');
            $table->string('user_id');
            $table->string('nombre');
            $table->string('urlDocument');
            $table->timestamps();
        });

        Schema::table('documentos_permisos', function (Blueprint $table) {
            $table->foreign('permiso_id')->references('permiso_id')->on('permisos');
        });
    }

    public function down()
    {
        Schema::dropIfExists('documentos_permisos');
    }
}
