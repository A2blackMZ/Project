<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Report de Séance</title>
    <style>
        .title-page {
            margin: 0;
            font-size: 2em; /* Taille du titre */
            text-align: center;
            color: #101110;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            border: 1px solid black;
            text-align: center;
        }
        th {
            background-color: #e2ecfe;
            font-weight: bold;
        }
        h1 {
            text-align: center;
            color: #101110;
        }

        body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 375mm; /* Largeur A3 */
            height: 420mm; /* Hauteur A3 */
        }

        .card {
            width: 350px;
            padding: 30px;
            background-color: #ffffff;
            border: 2px solid #87CEFA;
            border-radius: 10px;
            margin-bottom: 350px;
            margin-top: 350px;
            margin-left: 20%;
        }


    </style>
</head>
<body>
    <div class="card">
        <div class="title-page">
            <p><em>COMPTE RENDU DE SUPERVISION DES PROJETS</em></p>
        </div>
    </div>

    <br><br>

    <h1>PORT AUTONOME DE COTONOU</h1>
    <br><br>
    <table>
        <tr color: #101110;>
            <td><strong>Projet SI</strong></td>
        </tr>
        <tr>
            <td><strong>Compte rendu de supervision de projet</strong></td>
        </tr>
    </table>

    <br><br>
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

    <br><br>
    <table>
        <thead>
            <tr>
                <th>Réf.</th>
                <th>Intitulé</th>
                <th>Resp.</th>
                <th>Événements importants depuis la dernière réunion de supervision</th>
                <th>Difficultés</th>
                <th>Commentaires</th>
                <th>Approches de Solutions</th>
                <th>Actions Retenues</th>
                <th>Date d'Échéance</th>
            </tr>
        </thead>
        <tbody>
            @foreach($compteRendus as $index => $compteRendu)
                <tr>
                    @if ($index === 0)
                        <td rowspan="{{ count($compteRendus) }}">{{ $seance->reference }}</td>
                    @endif
                    <td>{{ $projets[$index]->nom }}</td>
                    <td>{{ $seance->nom_chef_projet }}</td>
                    <td>{!! $compteRendu->evenement !!}</td>
                    <td>{!! $compteRendu->difficultes !!}</td>
                    <td>{!! $compteRendu->commentaires !!}</td>
                    <td>{!! $compteRendu->approche_solution !!}</td>
                    <td>{!! $compteRendu->action_retenu !!}</td>
                    <td>{{ $compteRendu->date }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
