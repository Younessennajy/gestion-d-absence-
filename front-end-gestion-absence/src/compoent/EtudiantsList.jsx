import React, { useState, useEffect } from 'react';
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import axios from 'axios';
import { saveAs } from 'file-saver';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from './Calendar';

function EtudiantsList() {
  const [etudiants, setEtudiants] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGroupe, setSelectedGroupe] = useState('');

  useEffect(() => {
    if (selectedGroupe) {
      axios.get(`http://127.0.0.1:8000/api/etudiants/filter/groupe/${selectedGroupe}`)
        .then(response => {
          setEtudiants(response.data);
        })
        .catch(error => {
          console.error('Error fetching filtered students:', error);
        });
    } 

    axios.get('http://127.0.0.1:8000/api/etudiants/groupes')
      .then(response => {
        setGroupes(response.data);
      })
      .catch(error => {
        console.error('Error fetching groups:', error);
      });
  }, [selectedGroupe]);

  const updateAbsence = (id, absenceValue) => {
    axios.patch(`http://127.0.0.1:8000/api/etudiants/${id}/updateAbsence`, {
      absence: absenceValue,
      date_absence: selectedDate
    })
      .then(response => {
        console.log(response.data);
        setEtudiants(prevEtudiants => {
          return prevEtudiants.map(etudiant => {
            if (etudiant.id === id) {
              const updatedAbsences = etudiant.absences.map(abs => 
                abs.date_absence === selectedDate ? { ...abs, absence: absenceValue } : abs
              );
              return { ...etudiant, absences: updatedAbsences };
            }
            return etudiant;
          });
        });
      })
      .catch(error => {
        console.error('Error updating absence:', error);
      });
  };

  const exportFile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/etudiants/export', { responseType: 'blob' });
      saveAs(response.data, 'Etudiant.xlsx');
      toast.success('Fichier exporté avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'exportation du fichier :', error);
      toast.error('Erreur lors de l\'exportation du fichier.');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();ç
    formData.append('excel_file', file);
  
    axios.post('http://localhost:8000/api/etudiants/import', formData)
      .then(response => {
        console.log('Importation réussie :', response.data);
        toast.success('Importation des données réussie !');
      })
      .catch(error => {
        console.error('Erreur lors de l\'importation des données :', error);
        toast.error('Erreur lors de l\'importation des données.');
      });
  };

  const handleGroupeSelect = (event) => {
    setSelectedGroupe(event.target.value);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // const confirmSupprimerAll = () => {
  //   const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer toutes les lignes ?');
  //   if (confirmDelete) {
  //     handleSupprimerAll(); 
  //   }
  // };

  const handleSupprimerAll = () => {
    axios.get('http://127.0.0.1:8000/api/etudiants/deleteall')
      .then(response => {
        console.log(response.data.message); 
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de toutes les lignes :', error);
      });
  };
  return (
    <div className="container">
      <h1 className="text-center my-4">Liste des Étudiants</h1>
      <div className="d-flex justify-between ">
        <ToastContainer />
        <div className="mr-md-4">
          <div className='btn_contenair'>
            <div className='d-flex'>
                <div className="input-group custom-file-button">
                    <label className="input-group-text" htmlFor="inputGroupFile">Choose a file</label>
                    <input 
                      type="file" 
                      className="form-control"
                      name='excel_file'
                      id="inputGroupFile" 
                      onChange={handleFileUpload}
                      accept=".xlsx, .xls"
                    />
                </div>
            </div>
            <button onClick={exportFile} className='btn btn-success'>Export</button>
          </div>

          <div className="mb-3">
            <label htmlFor="groupeSelect" className="form-label">Choisir un groupe :</label>
            <select
              id="groupeSelect"
              value={selectedGroupe}
              onChange={handleGroupeSelect} 
              className="form-select"
              style={{ backgroundColor: '#f8f9fa', color: '#495057' }}
            >
              <option value="">Choisir un groupe</option>
              {groupes.length > 0 ? (
                groupes.map((groupe, index) => (
                  <option key={index} value={groupe}>
                    {groupe}
                  </option>
                ))
              ) : (
                <option value="">Aucun groupe disponible</option>
              )}
            </select>
              
          </div>

          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Groupe</th>
                <th>CEF</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>ABSENCE</th>
                <th>Actions</th>
              </tr>
              </thead>
            <tbody>
              {etudiants.length > 0 ? (
                etudiants.map(etudiant => (
                  <tr key={etudiant.id}>
                    <td>{etudiant.id}</td>
                    <td>{etudiant.Groupe}</td>
                    <td>{etudiant.CEF}</td>
                    <td>{etudiant.Nom}</td>
                    <td>{etudiant.Prenom}</td>
                    <td>
                      {/* Render radio inputs for absence */}
                      <>
                        <label className="mr-2">
                          <input
                            type="radio"
                            value="A"
                            checked={etudiant.absences && etudiant.absences.some(abs => abs.date_absence === selectedDate && abs.absence === 'A')}
                            onChange={() => updateAbsence(etudiant.id, 'A')}
                          /> A
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="AJ"
                            checked={etudiant.absences && etudiant.absences.some(abs => abs.date_absence === selectedDate && abs.absence === 'AJ')}
                            onChange={() => updateAbsence(etudiant.id, 'AJ')}
                          /> AJ
                        </label>
                      </>
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => deleteAbsence(etudiant.id)}
                        disabled={!selectedDate}
                      >
                        <TbAdjustmentsHorizontal />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">Aucun étudiant trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="calendar-container">
          <h2 className='text-center '>date</h2>
          <Calendar onDateSelect={handleDateSelect} />
          {/* <button onClick={confirmSupprimerAll} className='btn btn-danger'>supprimer All</button> */}
        </div>
      </div>
    </div>
  );
}

export default EtudiantsList;
   
