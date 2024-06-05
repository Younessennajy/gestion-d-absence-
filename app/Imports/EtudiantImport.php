<?php

namespace App\Imports;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Collection;
use App\Models\Etudiant;
use Maatwebsite\Excel\Concerns\ToModel;

class EtudiantImport implements ToCollection,ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    private $current=0;

    public function collection(Collection $collection)
    {
        
    }
    public function model(array $rows)
    {
        $this->current++;
        if($this->current>1){
            $user = new Etudiant;
            $user->Groupe=$rows[0];
            $user->CEF=$rows[1];
            $user->Nom=$rows[2];
            $user->Prenom=$rows[3];
            $user->Absence=$rows[4];
            $user->save();
        }
    }
}
