<?php

namespace App\Console\Commands;

use App\Models\CompteRendu;
use App\Models\Projet;
use Illuminate\Console\Command;

use App\Models\Seance;
use App\Models\User;
use App\Notifications\NotifyUser;
use Carbon\Carbon;

class SeanceNotifyCommand extends Command

{
    protected $signature = 'compte_rendu:notify';

    protected $description = 'Send notifications for compte_rendu due tomorrow';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
{
    // Récupérer les comptes rendus pour demain
    $comptesRendus = CompteRendu::whereDate('date', Carbon::tomorrow())->get();

    foreach ($comptesRendus as $compteRendu) {
        // Récupérer le projet associé au compte rendu
        $projet = $compteRendu->projet;

        if ($projet) {
            // Récupérer l'ID de l'utilisateur associé au projet
            $userId = $projet->user_id;

            // Trouver l'utilisateur correspondant à l'ID
            $user = User::find($userId);

            if ($user) {
                // Notifier l'utilisateur avec le compte rendu
                $user->notify(new NotifyUser($compteRendu));
            } else {
                // Gérer le cas où l'utilisateur n'est pas trouvé
                // (peut-être enregistrer une trace de journalisation)
            }
        } else {
            // Gérer le cas où le projet n'est pas trouvé pour le compte rendu
            // (peut-être enregistrer une trace de journalisation)
        }
    }
}

}
