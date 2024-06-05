<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

    @if(isset($etudiants))
        <table border="1">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>NOM</td>
                    <td>PRENOM</td>
                    <td>ABSENCE</td>
                    <td>reset</td>
                </tr>
            </thead>
            <tbody>
                @foreach ($etudiants as $etudiant)
                <tr>
                    <td>{{ $etudiant->id }}</td>
                    <td>{{ $etudiant->Nom }}</td>
                    <td>{{ $etudiant->Prenom }}</td>
                    <td>
                        <form id="updateAbsenceForm_{{ $etudiant->id }}" method="POST" action='{{ route('update_absence', $etudiant->id) }}'>
                            @csrf
                            @method('PATCH')
                            <label for="absence_a_{{ $etudiant->id }}">A</label>
                            <input type="radio" id="absence_a_{{ $etudiant->id }}" name="absence" value="A" {{ $etudiant->Absence === 'A' ? 'checked' : '' }} onchange="submitForm('{{ $etudiant->id }}')">
                            <label for="absence_aj_{{ $etudiant->id }}">AJ</label>
                            <input type="radio" id="absence_aj_{{ $etudiant->id }}" name="absence" value="AJ" {{ $etudiant->Absence === 'AJ' ? 'checked' : '' }} onchange="submitForm('{{ $etudiant->id }}')">
                        </form>
                    </td>
                        <td>
                            <form action="{{ route('delete_absence', $etudiant->id) }}" method="POST">
                                @csrf
                                @method('PATCH')
                                <input type="hidden" name="absence" value="null">
                                <button type="submit">Réset</button>
                            </form>
                        </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    @endif


    <script>
        function submitForm(id) {
            document.getElementById('updateAbsenceForm_' + id).submit();
        }
    </script>
</body>
</html>
