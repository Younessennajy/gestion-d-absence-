<?php
// app/Models/Etudiant.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $fillable = ['Groupe', 'CEF', 'Nom', 'Prenom', 'date_absence', 'absence'];
    public static function getGroupes()
    {
        return self::select('Groupe')->distinct()->pluck('Groupe');
    }
}
