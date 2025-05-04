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
        Schema::table('livrables', function (Blueprint $table) {
            $table->binary('rapport')->nullable();
            $table->binary('presentation')->nullable();
            $table->binary('code_source')->nullable();
    
            $table->string('rapport_nom')->nullable();
            $table->string('presentation_nom')->nullable();
            $table->string('code_source_nom')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('livrables', function (Blueprint $table) {
            $table->dropColumn([
                'rapport', 'presentation', 'code_source',
                'rapport_nom', 'presentation_nom', 'code_source_nom'
            ]);
        });
    }
};
