import { Component, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-reports',
  templateUrl: './project-reports.component.html',
  styleUrls: ['./project-reports.component.css']
})
export class ProjectReportsComponent {
  compteRendus:any;
  compteRendu: any = {
    evenement: '',
    difficultes: '',
    date: '',
    commentaires: '',
    projet_id: ''
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: { projetId: string },private router: Router, private dataService: DataService, private dialogRef: MatDialogRef<ProjectReportsComponent>) {
    if (data.projetId) {
      this.compteRendu.projet_id = data.projetId; // Utilisez l'ID de la page principale
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

  ngOnInit(): void {
    this.dataService.getReports().subscribe((data) => {
      this.compteRendus = data;
    });
  }

  closeModal() {
    // Utilisez la méthode close() pour fermer la fenêtre modale
    this.dialogRef.close();
  }

  createReport(): void {
    this.dataService.createReport(this.compteRendu).subscribe((data) => {
      this.compteRendus.push(data); // Ajoutez la tâche créé à la liste
      this.compteRendu = {}; // Réinitialisez le formulaire
      this.dialogRef.close({ reportMisAJour: true });
      });

    }
}
