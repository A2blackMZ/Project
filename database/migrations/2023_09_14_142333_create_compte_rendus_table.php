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
        Schema::create('compte_rendus', function (Blueprint $table) {
            $table->id();
            $table->text('evenement');
            $table->text('difficultes');
            $table->text('commentaires');
            $table->date('date');
            $table->text('approche_solution')->nullable(true);
            $table->text('action_retenu')->nullable(true);
            $table->unsignedBigInteger('projet_id'); // Colonne pour la clé étrangère vers les projets
            // $table->unsignedBigInteger('utilisateur_id'); // Colonne pour la clé étrangère vers les utilisateurs
            $table->timestamps();

            $table->foreign('projet_id')->references('id')->on('projets');
            // $table->foreign('utilisateur_id')->references('id')->on('utilisateurs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compte_rendus');
    }
};
