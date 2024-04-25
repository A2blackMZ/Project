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
        Schema::create('historique_modifications', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->unsignedBigInteger('element_id');
            $table->unsignedBigInteger('utilisateur_id');
            $table->timestamp('date_modification');
            $table->timestamps();

            $table->foreign('utilisateur_id')->references('id')->on('utilisateurs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historique_modifications');
    }
};