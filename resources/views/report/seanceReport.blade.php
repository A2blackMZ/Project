<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Report de Séance</title>
    <style>
        table {
            width: 90%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 3px;
            text-align: center;
        }
        th {
            background-color: #a2f4e2;
        }
        h1 {
            text-align: center;
            color: #101110;
        }
    </style>
</head>
<body>
    <h1>PORT AUTONOME DE COTONOU</h1>
    <table>
        <tr>
            <td>Projet SI</td>
        </tr>
        <tr>
            <td>Compte rendu de supervision de projet</td>
        </tr>
    </table>

<p></p>
    <table>
        <tr>
            <th>Date de Création</th>
            <th>Date de Supervision</th>
            <th>Référence</th>
        </tr>
        <tr>
            <td>{{ $seance->date_creation }}</td>
            <td>{{ $seance->date_supervision }}</td>
            <td>{{ $seance->reference }}</td>
        </tr>
    </table>

    <h2>Compte Rendu</h2>
    <table>
        <thead>
            <tr>
                <th>Réf.</th>
                <th>Intitulé</th>
                <th>Resp.</th>
                <th>Événements importants depuis la dernièrebréunion de supervision</th>
                <th>Difficultés</th>
                <th>Approches de Solutions</th>
                <th>Actions Retenues</th>
                <th>Date d'Échéance</th>
            </tr>
        </thead>
        <tbody>
            @foreach($compteRendus as $compteRendu)
            @foreach($projets as $projet)
                <tr>
                    <td>{{ $seance->reference }}</td>
                    <td>{{ $projet->nom }}</td>
                    <td>{{ $seance->nom_chef_projet }}</td>
                    <td>{{ $compteRendu->evenement }}</td>
                    <td>{{ $compteRendu->difficultes }}</td>
                    <td>{{ $compteRendu->commentaires }}</td>
                    <td>{{ $compteRendu->approche_solution }}</td>
                    <td>{{ $compteRendu->action_retenu }}</td>
                    <td>{{ $compteRendu->date }}</td>
                </tr>
            @endforeach
            @endforeach
        </tbody>
    </table>
</body>
</html>
