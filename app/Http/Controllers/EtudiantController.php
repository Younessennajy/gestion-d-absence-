<?php
namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    public function index()
    {
        $etudiants = Etudiant::all();
        return response()->json($etudiants);
    }

    public function filterByDate($date)
    {
        $etudiants = Etudiant::where('date_absence', $date)->get();
        return response()->json($etudiants);
    }

    public function filterByGroupe($groupe)
    {
        $etudiants = Etudiant::where('Groupe', $groupe)->get();
        return response()->json($etudiants);
    }

    public function updateAbsence(Request $request, $id)
    {
        $etudiant = Etudiant::findOrFail($id);
        $etudiant->absence = $request->input('absence');
        $etudiant->date_absence = $request->input('date_absence');
        $etudiant->save();

        return response()->json(['message' => 'Absence updated successfully']);
    }

    public function deleteAbsence($id)
    {
        $etudiant = Etudiant::findOrFail($id);
        $etudiant->absence = null;
        $etudiant->date_absence = null;
        $etudiant->save();

        return response()->json(['message' => 'Absence deleted successfully']);
    }

    public function listgroupe(){
        $groupes = Etudiant::getGroupes();
        return response()->json($groupes);
    }
}