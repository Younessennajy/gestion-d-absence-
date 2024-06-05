<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Etudiant;

class EtudiantsTableSeeder extends Seeder
{
    public function run()
    {
        Etudiant::factory()->count(100)->create();
    }
}
