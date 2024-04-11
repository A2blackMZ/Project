import { Component, OnInit , Inject} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css']
})
export class ProjectTasksComponent {
  tacheId!: number; // Récupérez l'ID du tache à partir de la route
  tache: any = {}; // Définissez votre modèle de données de tache
  form!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { tache: any , projetId: string},private fb: FormBuilder, private dataService: DataService,  private dialogRef: MatDialogRef<ProjectTasksComponent>) {
    if (data.tache) {
      console.log(this.tache)
      // Remplissez le modèle du formulaire avec les informations du tache
      this.tache = data.tache;
    }
    if (data.projetId) {
      this.tache.projet_id = data.projetId; // Utilisez l'ID de la page principale
    }
  }
  ngOnInit() {
    // Initialisez le formulaire avec les informations du tache
    this.initForm();
  }

  initForm() {
    // Utilisez les informations du tache pour remplir le formulaire
    this.form = this.fb.group({
      nom: [this.tache.nom || '', Validators.required],
      description: [this.tache.description || '', Validators.required],
      date_echeance: [this.tache.date_echeance || '', Validators.required],
      etat: [this.tache.etat || '', Validators.required],
      projet_id: [this.tache.projet_id || '', Validators.required],
    });
  }

  modifiertache() {
    // Récupérez les valeurs du formulaire
    const formData = this.form.value;

    // Appelez le service de données pour mettre à jour le tache
    this.dataService.updateTache(this.tache.id, formData).subscribe(
      (response) => {
        // Gérez la réponse de la mise à jour ici, par exemple, mettez à jour les informations du tache affichées
        console.log('tache mis à jour avec succès', response);

        // Fermez le modal avec un résultat (si nécessaire)
        this.dialogRef.close({ tacheMisAJour: true });
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du tache', error);
      }
    );
  }


}
