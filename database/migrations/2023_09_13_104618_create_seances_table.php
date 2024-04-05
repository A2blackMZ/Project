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
        Schema::create('seances', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique(); // Ajoutez la colonne "reference"
            $table->date('date_supervision')->nullable()->default(null);
            $table->date('date_creation'); // Ajoutez la colonne "date_creation"
            $table->string('nom_chef_projet'); // Ajoutez la colonne "nom_chef_projet"
            $table->string('statut')->default('Non valide'); // Ajoutez la colonne "statut" avec une valeur par défaut
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seances');
    }
};
