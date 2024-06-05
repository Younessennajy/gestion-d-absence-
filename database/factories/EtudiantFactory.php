<?php

namespace Database\Factories;

use App\Models\Etudiant;
use Illuminate\Database\Eloquent\Factories\Factory;

class EtudiantFactory extends Factory
{
    protected $model = Etudiant::class;

    public function definition()
    {
        return [
            'Groupe' => $this->faker->randomElement(['dd','id']),
            'CEF' => $this->faker->randomNumber(6),
            'Nom' => $this->faker->lastName,
            'Prenom' => $this->faker->firstName,
            'date_absence' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'absence' => $this->faker->randomElement(['A', 'AJ', null]),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}