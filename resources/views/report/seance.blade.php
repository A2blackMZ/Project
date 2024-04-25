<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport de Séance de Supervision</title>
    <style>
        /* CSS */
    </style>
</head>
<body>
    <h1>Rapport de Séance de Supervision</h1>
    <p>Date de la séance : {{ $seance->date_supervision }}</p>

    <h2>Comptes Rendus</h2>
    @foreach($seance->comptesRendus as $compteRendu)
        <h3>Compte Rendu {{ $loop->iteration }}</h3>
        <p>Événement : {{ $compteRenduData->evenement }}</p>
        <p>Difficultés : {{ $compteRenduData->difficultes }}</p>
        <p>Commentaires : {{ $compteRenduData->commentaires }}</p>
        <p>Date : {{ $compteRenduData->date }}</p>
        <p>Approche Solution : {{ $compteRenduDate->approche_solution }}</p>
        <p>Action Retenu : {{ $compteRenduData->action_retenu }}</p>
    @endforeach
</body>
</html>
