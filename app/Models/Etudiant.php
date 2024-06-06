<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $fillable = [
        'Groupe', 'CEF', 'Nom', 'Prenom',
    ];

    public function absences()
    {
        return $this->hasMany(Absence::class);
    }
    public static function getGroupes()
    {
        return self::distinct()->pluck('Groupe');
    }
}
