# Projet de Gestion d'Absence

## Description

Ce projet est une application de gestion d'absences développée en utilisant **React.js** pour le frontend et **Laravel** pour le backend. L'application utilise une API REST pour la communication entre le frontend et le backend. Le style de l'application est assuré par **Bootstrap**.

## Fonctionnalités

1. **Importation de Fichiers :**
   - Bouton "Choose a file" permettant l'importation de fichiers pour ajouter ou mettre à jour des données d'étudiants ou d'absences.

2. **Exportation de Données :**
   - Bouton "Export" pour exporter les données en format compatible (CSV, Excel, etc.).

3. **Sélection de Groupe :**
   - Menu déroulant "Choisir un groupe" pour filtrer les étudiants par groupe.

4. **Affichage de la Liste des Étudiants :**
   - Une table affichant les détails des étudiants avec les colonnes : ID, Groupe, CEF, Nom, Prénom, Absence, et Actions.
   - Message "Aucun étudiant trouvé" s'affiche si la liste est vide.

5. **Calendrier :**
   - Un calendrier intégré pour sélectionner les dates, permettant de visualiser ou ajouter des absences.

## Workflow

1. **Importation de Données :**
   - L'utilisateur peut importer un fichier contenant les données des étudiants.

2. **Affichage et Filtrage :**
   - Les étudiants sont affichés dans une table. L'utilisateur peut filtrer les étudiants en sélectionnant un groupe spécifique dans le menu déroulant.

3. **Gestion des Absences :**
   - L'utilisateur peut visualiser, ajouter ou modifier les absences des étudiants. Le calendrier permet de sélectionner des dates spécifiques.

4. **Exportation de Données :**
   - L'utilisateur peut exporter les données affichées, facilitant ainsi le partage ou la sauvegarde des informations.

## Intégration Frontend-Backend

- **API REST :**
  - Les données des étudiants et les informations d'absence sont gérées par Laravel et exposées via une API REST.
  - React.js consomme cette API pour afficher et manipuler les données sur le frontend.

## Style et Design

- **Bootstrap :**
  - Utilisation de Bootstrap pour créer une interface utilisateur réactive et élégante.
  - Les composants tels que les boutons, les formulaires et la table sont stylés avec Bootstrap pour assurer une bonne expérience utilisateur.

## Installation

### Prérequis

- Node.js
- Composer
- PHP
- MySQL

### Étapes

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/Younessennajy/gestion-d-absence-.git
   cd gestion-d-absence-


