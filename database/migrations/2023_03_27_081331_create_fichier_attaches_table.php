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
        Schema::create('fichier_attaches', function (Blueprint $table) {
            $table->id();
            $table->string('chemin');
            $table->unsignedBigInteger('projet_id')->nullable();
            $table->timestamps();

            $table->foreign('projet_id')->references('id')->on('projets');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fichier_attaches');
    }
};
