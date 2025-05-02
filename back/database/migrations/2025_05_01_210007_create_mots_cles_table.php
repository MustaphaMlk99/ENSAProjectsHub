<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('mots_cles', function (Blueprint $table) {
            $table->id();
            $table->string('mot', 100);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('mots_cles');
    }
};
