<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('remarques', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('livrable_id');
            $table->string('contenu', 2000);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('remarques');
    }
};
