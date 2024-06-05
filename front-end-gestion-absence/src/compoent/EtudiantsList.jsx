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
    axios.get('http://127.0.0.1:8000/api/etudiants/groupes')
      .then(response => {
        setGroupes(response.data);
      })
      .catch(error => {
        console.error('Error fetching groups:', error);
      });
      
  }, []);

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
  }, [selectedGroupe]);

  useEffect(() => {
    if (selectedDate) {
      axios.get(`http://127.0.0.1:8000/api/etudiants/filter/date/${selectedDate}`)
        .then(response => {
          setEtudiants(response.data);
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    }
  }, [selectedDate]);

  const updateAbsence = (id, absenceValue) => {
    axios.patch(`http://127.0.0.1:8000/api/etudiants/${id}/updateAbsence`, {
      absence: absenceValue,
      date_absence: selectedDate
    })
      .then(response => {
        console.log(response.data);
        const updatedEtudiants = etudiants.map(etudiant => {
          if (etudiant.id === id) {
            return { ...etudiant, Absence: absenceValue, date_absence: selectedDate };
          }
          return etudiant;
        });
        setEtudiants(updatedEtudiants);
      })
      .catch(error => {
        console.error('Error updating absence:', error);
      });
  };

  const deleteAbsence = (id) => {
    axios.patch(`http://127.0.0.1:8000/api/etudiants/${id}/deleteAbsence`)
      .then(response => {
        console.log(response.data);
        const updatedEtudiants = etudiants.map(etudiant => {
          if (etudiant.id === id) {
            return { ...etudiant, Absence: null, date_absence: null };
          }
          return etudiant;
        });
        setEtudiants(updatedEtudiants);
      })
      .catch(error => {
        console.error('Error deleting absence:', error);
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
      const formData = new FormData();
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



  return (
    <div className="container">
      <h1 className="text-center my-4">Liste des Étudiants</h1>
        <div className="d-flex flex-column flex-md-row">
        <ToastContainer />
        <div className="mr-md-4">
          <div className='btn_contenair'>
            <div className=''>
                <div class="input-group custom-file-button">
                    <label class="input-group-text"
                      for="inputGroupFile">Choose a file
                    </label>
                    <input type="file" class="form-control"
                      name='excel_file'
                        id="inputGroupFile" 
                          onChange={handleFileUpload}
                            accept=".xlsx, .xls"
                    />
                </div>
            </div>
          <button onClick={exportFile} >Export</button>
        </div>

          <div className="mb-3">
            <label htmlFor="groupeSelect" className="form-label">Choisir un groupe :</label>
            <select
              id="groupeSelect"
              value={selectedGroupe}
              onChange={(e) => setSelectedGroupe(e.target.value)}
              className="form-select"
              style={{ backgroundColor: '#f8f9fa', color: '#495057' }}
            >
              <option value="">Choisir un groupe</option>
              {groupes.map((groupe) => (
                <option key={groupe} value={groupe}>
                  {groupe}
                </option>
              ))}
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
                      {selectedDate ? (
                        <>
                          <label className="mr-2">
                            <input
                              type="radio"
                              value="A"
                              checked={etudiant.absence === 'A'}
                              onChange={() => updateAbsence(etudiant.id, 'A')}
                            /> A
                          </label>
                          <label>
                            <input
                              type="radio"
                              value="AJ"
                              checked={etudiant.absence === 'AJ'}
                              onChange={() => updateAbsence(etudiant.id, 'AJ')}
                            /> AJ
                          </label>
                        </>
                      ) : (
                        <span>Veuillez sélectionner une date</span>
                      )}
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
                  <td colSpan="7" className="text-center">
                    <h2>Aucun élément à afficher</h2>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div>
          <Calendar onDateSelect={setSelectedDate} />
        </div>
      </div>
    </div>
  );
}

export default EtudiantsList;
