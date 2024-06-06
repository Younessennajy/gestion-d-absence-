<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\EtudiantExportImport;

Route::get('/etudiants', [EtudiantController::class, 'index']);
Route::get('/etudiants/filter/date/{date}', [EtudiantController::class, 'filterByDate']);
Route::get('/etudiants/filter/groupe/{groupe}', [EtudiantController::class, 'filterByGroupe']);
Route::patch('/etudiants/{id}/updateAbsence', [EtudiantController::class, 'updateAbsence']);
Route::patch('/etudiants/{id}/deleteAbsence', [EtudiantController::class, 'deleteAbsence']);
Route::get('/etudiants/groupes', [EtudiantController::class, 'listgroupe']);

Route::get('etudiants/export', [EtudiantExportImport::class, 'exportexcel']);
Route::post('etudiants/import', [EtudiantExportImport::class, 'importExcel']);
?>
