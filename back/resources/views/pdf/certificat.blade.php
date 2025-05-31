<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Certificat</title>
    <style>
        @page { margin: 50px; }

        body {
            font-family: DejaVu Sans, sans-serif;
            text-align: center;
            background: #fff;
            color: #333;
        }

        .container {
            border: 4px solid #1976d2;
            border-radius: 15px;
            padding: 40px;
        }

        h1 {
            color: #1976d2;
            font-size: 28px;
            margin-bottom: 10px;
        }

        h2 {
            margin-top: 20px;
            font-size: 22px;
        }

        .text {
            margin-top: 30px;
            font-size: 16px;
            line-height: 1.6;
        }

        .signature {
            margin-top: 60px;
            text-align: right;
            margin-right: 40px;
            font-size: 14px;
        }

        .date {
            margin-top: 30px;
            font-style: italic;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Certificat de Réussite</h1>

        <div class="text">
            <p>Nous certifions que</p>
            <h2>{{ $etudiant->prenom }} {{ $etudiant->nom }}</h2>

            <p>a validé avec succès le projet du module :</p>
            <p><strong>{{ $projet->module->nom}}</strong></p>

            <p>sous le titre :</p>
            <p><strong>{{ $projet->titre }}</strong></p>

            <p>avec la note de <strong>{{ $note }}/20</strong></p>
        </div>

        <p class="date">Délivré le {{ \Carbon\Carbon::now()->format('d/m/Y') }}</p>
    </div>
</body>
</html>
