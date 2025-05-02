<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('etudiants', function (Blueprint $table) {
        $table->id();
        $table->string('nom', 100);
        $table->string('prenom', 100);
        $table->string('email', 150);
        $table->string('filiere', 100);
        $table->integer('annee');
        $table->string('mot_de_passe', 255);
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etudiants');
    }
};
