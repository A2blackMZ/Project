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
        Schema::create('membre_projets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('utilisateur_id'); // Colonne pour la clé étrangère vers les utilisateurs
            $table->unsignedBigInteger('projet_id'); // Colonne pour la clé étrangère vers les projets
            $table->unsignedBigInteger('role_id'); // Colonne pour la clé étrangère vers les rôles
            // Ajoutez d'autres colonnes selon vos besoins
            $table->timestamps();

            // Définir les clés étrangères
            $table->foreign('utilisateur_id')->references('id')->on('utilisateurs');
            $table->foreign('projet_id')->references('id')->on('projets');
            $table->foreign('role_id')->references('id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membre_projets');
    }
};