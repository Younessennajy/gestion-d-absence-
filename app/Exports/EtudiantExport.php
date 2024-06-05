<?php

namespace App\Exports;

use App\Models\Etudiant;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;

class EtudiantExport implements FromCollection, WithMapping, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Etudiant::all();
    }

    /**
    * Map the given user model to the desired array format for export
    *
    * @param mixed $user
    * @return array
    */
    public function map($Etudiant): array
    {
        return [
            $Etudiant->Groupe,
            $Etudiant->CEF,
            $Etudiant->Nom,
            $Etudiant->Prenom,
            $Etudiant->absence,
            $Etudiant->date_absence,
        ];
    }

    /**
    * Define the headings for the exported file
    *
    * @return array
    */
    public function headings(): array
    {
        return [
            'Groupe',
            'CEF',
            'Nom',
            'Prenom',
            'absence',
            'date_absence',
        ];
    }
}
