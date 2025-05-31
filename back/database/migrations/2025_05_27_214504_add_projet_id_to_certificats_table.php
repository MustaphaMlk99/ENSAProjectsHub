<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('certificats', function (Blueprint $table) {
            $table->unsignedBigInteger('projet_id')->after('etudiant_id');

            // Optionnel : ajouter la clé étrangère si tu veux lier à la table projets
            $table->foreign('projet_id')->references('id')->on('projets')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::table('certificats', function (Blueprint $table) {
            $table->dropForeign(['projet_id']);
            $table->dropColumn('projet_id');
        });
    }
};
