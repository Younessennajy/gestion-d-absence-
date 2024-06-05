<?php

use Illuminate\Database\Seeder;
use App\Models\Etudiant;

class EtudiantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 20; $i++) {
            Etudiant::create([
                'id_etudiant' => 'ID_' . $i,
                'Groupe' => 'Groupe_' . $i,
                'CEF' => 'CEF_' . $i,
                'Nom' => 'Nom_' . $i,
                'Prenom' => 'Prenom_' . $i,
                // Ajoutez d'autres colonnes avec des valeurs différentes
                'Absence' => $i % 2 == 0 ? 'A' : 'AJ', // Alternance entre 'A' et 'AJ' pour l'exemple
            ]);
        }
    }
}
