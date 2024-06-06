<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    use HasFactory;

    protected $fillable = [
        'etudiant_id', 'absence', 'date_absence',
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}
