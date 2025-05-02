<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('projets', function (Blueprint $table) {
            $table->id();
            $table->string('titre', 150);
            $table->string('description', 2000);
            $table->unsignedBigInteger('etudiant_id');
            $table->unsignedBigInteger('encadrant_id');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('projets');
    }
};
