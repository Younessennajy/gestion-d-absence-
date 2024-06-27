<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use App\Models\Absence;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    public function index()
    {
        $etudiants = Etudiant::with('absences')->get();
        return response()->json($etudiants);
    }

    public function filterByDate($date)
    {
        $etudiants = Etudiant::with(['absences' => function($query) use ($date) {
            $query->where('date_absence', $date);
        }])->get();
    
        return response()->json($etudiants);
    }
    

    public function filterByGroupe($groupe)
    {
        $etudiants = Etudiant::where('Groupe', $groupe)->with('absences')->get();
        return response()->json($etudiants);
    }

    public function filterByGroupeAndDate($groupe, $date)
{
    $etudiants = Etudiant::where('Groupe', $groupe)
                         ->with(['absences' => function($query) use ($date) {
                             $query->where('date_absence', $date);
                         }])
                         ->get();
    return response()->json($etudiants);
}

    public function updateAbsence(Request $request, $id)
    {
        $etudiant = Etudiant::findOrFail($id);
        $absence = Absence::updateOrCreate(
            ['etudiant_id' => $etudiant->id, 'date_absence' => $request->input('date_absence')],
            ['absence' => $request->input('absence')]
        );

        return response()->json(['message' => 'Absence updated successfully']);
    }

    public function deleteAbsence(Request $request, $id)
    {
        $etudiant = Etudiant::findOrFail($id);
        $etudiant->absences()->where('date_absence', $request->input('date_absence'))->delete();

        return response()->json(['message' => 'Absence deleted successfully']);
    }

    public function listgroupe()
    {
        $groupes = Etudiant::distinct()->pluck('Groupe');
        return response()->json($groupes);
    }
    }
    
    // public function deleteall(){
    //     try {
    //         Etudiant::truncate();
    //         Absence::truncate();
    
    //         return response()->json(['message' => 'Toutes les lignes ont été supprimées avec succès'], 200);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'Une erreur s\'est produite lors de la suppression des lignes'], 500);
    //     }
    // }