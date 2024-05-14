import { Component, OnInit , Inject} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent{

  date_debut!: Date;
  date_fin_prevue!: Date;
  // Méthode pour afficher le modal
  showModal(): void {
    this.isVisible = true;
  }

  // Méthode pour cacher le modal lors de l'annulation
  handleCancel(): void {
    this.isVisible = false;
  }
  projectId!: number; // Récupérez l'ID du projet à partir de la route
  projet: any = {}; // Définissez votre modèle de données de projet
  form!: FormGroup; 
  isVisible = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { projet: any },private fb: FormBuilder, private route: ActivatedRoute, private dataService: DataService,  private dialogRef: MatDialogRef<ProjectInfoComponent>) {
    if (data.projet) {
      // Remplissez le modèle du formulaire avec les informations du projet
      this.projet = data.projet;
    }
  }
  ngOnInit() {
    // Initialisez le formulaire avec les informations du projet
    this.initForm();
  }

  initForm() {
    // Utilisez les informations du projet pour remplir le formulaire
    this.form = this.fb.group({
      nom: [this.projet.nom || '', Validators.required],
      budget_alloue: [this.projet.budget_alloue || '', Validators.required],
      budget_depense: [this.projet.budget_depense || '', Validators.required],
      date_debut: [this.projet.date_debut || '', Validators.required],
      date_fin_prevue: [this.projet.date_fin_prevue || '', Validators.required],
      objectif: [this.projet.objectif || '', Validators.required],
      risques: [this.projet.risques || '', Validators.required],
    });
  }

  modifierProjet() {
    // Récupérez les valeurs du formulaire
    const formData = this.form.value;
  
    // Appelez le service de données pour mettre à jour le projet
    this.dataService.updateProject(this.projet.id, formData).subscribe(
      (response) => {
        // Gérez la réponse de la mise à jour ici, par exemple, mettez à jour les informations du projet affichées
        console.log('Projet mis à jour avec succès', response);
  
        // Fermez le modal avec un résultat (si nécessaire)
        this.dialogRef.close({ projetMisAJour: true });
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du projet', error);
      }
    );
    this.isVisible = false;
  }
  
}


  // ngOnInit() {
  //   const idParam = this.route.snapshot.paramMap.get('id');
  //   if (idParam !== null) {
  //     this.projectId = +idParam; // Obtenez l'ID du projet depuis la route
  //     console.log(this.projectId);
  //     this.dataService.getProjectById(this.projectId).subscribe((data) => {
  //     this.projet = data; // Récupérez les données du projet à partir du service
  //     console.log(this.projet);
  //   });
  //   }
  // }

  // closeModal() {
  //   // Utilisez la méthode close() pour fermer la fenêtre modale
  //   this.dialogRef.close();
  // }

 

  // Ajoutez des méthodes pour gérer la soumission du formulaire de modification


