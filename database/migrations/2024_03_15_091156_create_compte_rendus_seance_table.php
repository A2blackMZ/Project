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
        Schema::create('compte_rendus_seance', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('compte_rendu_id');
            $table->unsignedBigInteger('seance_id');
            $table->timestamps();

            // Foreign Keys
            $table->foreign('compte_rendu_id')->references('id')->on('compte_rendus')->onDelete('cascade');
            $table->foreign('seance_id')->references('id')->on('seances')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compte_rendus_seance');
    }
};
