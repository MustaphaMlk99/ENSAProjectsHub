<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Ajout des clés étrangères
        Schema::table('likes', function (Blueprint $table) {
            $table->foreign('projet_id')->references('id')->on('projets')->onDelete('cascade');
            $table->foreign('etudiant_id')->references('id')->on('etudiants')->onDelete('cascade');
        });
    }

    public function down()
    {
        // Suppression des clés étrangères en cas de rollback
        Schema::table('likes', function (Blueprint $table) {
            $table->dropForeign(['projet_id']);
            $table->dropForeign(['etudiant_id']);
        });
    }
};
