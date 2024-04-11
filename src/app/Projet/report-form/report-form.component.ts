import { Component, OnInit , Inject} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {
  projectId!: number; // Récupérez l'ID du projet à partir de la route
  report: any = {}; // Définissez votre modèle de données de projet
  form!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { report: any,projetId: string },private fb: FormBuilder, private route: ActivatedRoute, private dataService: DataService,  private dialogRef: MatDialogRef<ReportFormComponent>) {
    if (data.report) {
      // Remplissez le modèle du formulaire avec les informations du projet
      this.report = data.report;
    }
    if (data.projetId) {
      this.report.projet_id = data.projetId; // Utilisez l'ID de la page principale
    }
  }


  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image code a11ychecker advlist advcode advtable autolink checklist export lists link image charmap preview anchor searchreplace visualblocks powerpaste fullscreen formatpainter insertdatetime media table help wordcount',
    menubar: true,
    toolbar: true,
    min_height: 10
  }

  
  ngOnInit() {
    // Initialisez le formulaire avec les informations du projet
    this.initForm();
    // this.compteRendus = [];
  }

  initForm() {
    // Utilisez les informations du projet pour remplir le formulaire
    this.form = this.fb.group({
      evenement: [this.report.evenement || '', Validators.required],
      difficultes: [this.report.difficultes || '', Validators.required],
      commentaires: [this.report.commentaires || '', Validators.required],
      date: [this.report.date || '', Validators.required],
      projet_id: [this.report.projet_id || '', Validators.required],
    });
  }

  modifierProjet() {
    // Récupérez les valeurs du formulaire
    const formData = this.form.value;

    // Appelez le service de données pour mettre à jour le projet
    this.dataService.updateReport(this.report.id, formData).subscribe(
      (response) => {
        // Gérez la réponse de la mise à jour ici, par exemple, mettez à jour les informations du projet affichées
        console.log('Projet mis à jour avec succès', response);

        // Fermez le modal avec un résultat (si nécessaire)
        this.dialogRef.close({ reportMisAJour: true });
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du projet', error);
      }
    );
  }
}

