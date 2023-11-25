<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBonosAproveHistoryTable extends Migration
{
 
    public function up()
    {
        Schema::create('bonos_history', function (Blueprint $table) {
            $table->string('bono_history_id')->unique();
            $table->string('bono_id');
            $table->string('user_id');
            $table->string('state');
            $table->timestamps();
        });
        Schema::table('bonos_history', function (Blueprint $table) {
            $table->foreign('bono_id')->references('bono_id')->on('bonos');
            $table->foreign('user_id')->references('user_id')->on('users');
        });
    }
 
    public function down()
    {
        Schema::dropIfExists('bonos_history');
    }
}
