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
        Schema::create('projets', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('budget_alloue');
            $table->string('budget_depense');
            $table->string('objectif');
            $table->string('risques');
            $table->date('date_debut')->nullable();
            $table->date('date_fin_prevue')->nullable();
            $table->unsignedBigInteger('user_id'); // Colonne pour la clé étrangère vers la table "users"
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Suppression en cascade; // Clé étrangère vers la table "users"
            // $table->unsignedBigInteger('utilisateur_id'); // Colonne pour la clé étrangère
            // $table->foreign('utilisateur_id')
            // ->references('id')->on('utilisateurs'); // Clé étrangère vers la table "utilisateurs"
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projets');
    }
};
