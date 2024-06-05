<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;

use App\Exports\EtudiantExport;
use App\Imports\EtudiantImport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;


class EtudiantExportImport extends Controller
{
    public function exportexcel()
    {
        return Excel::download(new EtudiantExport(), 'Etudiants.xlsx');
    }
    public function importExcel(Request $request)
{
    $request->validate([
        'excel_file' => 'required|file|mimes:xlsx,csv' 
    ]);

    // Debugging statement
    Log::info('File uploaded:', ['file' => $request->file('excel_file')]);

    try {
        Excel::import(new EtudiantImport(), $request->file('excel_file'));
        return response()->json(['message' => 'Import successful']);
    } catch (\Exception $e) {
        Log::error('Import failed:', ['error' => $e->getMessage()]);
        return response()->json(['error' => 'Import failed'], 500);
    }
}

}
