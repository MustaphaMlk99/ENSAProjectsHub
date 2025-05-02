<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('livrables', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 100);
            $table->string('type', 50);
            $table->unsignedBigInteger('projet_id');
            $table->string('fichier', 255);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('livrables');
    }
};
