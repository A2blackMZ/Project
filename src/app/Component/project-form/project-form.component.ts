import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {
  projects:any;
  newProject: any = {
    nom: '',
    budget_alloue: '',
    budget_depense: '',
    date_debut: '',
    date_fin_prevue: '',
    objectif: '',
    risques: '',
    user_id: ''
  };

  constructor(private router: Router, private dataService: DataService, private dialogRef: MatDialogRef<ProjectFormComponent>) {}

ngOnInit(): void {
  this.dataService.getProjects().subscribe((data) => {
    this.projects = data;
  });
}

closeModal() {
  // Utilisez la méthode close() pour fermer la fenêtre modale
  this.dialogRef.close();
}

// Méthode pour créer un nouveau projet
createProject(): void {
  console.log(this.newProject);
  this.dataService.getUserInfo().subscribe((userInfo) => {
    this.newProject.user_id = userInfo.id;
    this.dataService.createProject(this.newProject).subscribe((data) => {
    this.projects.push(data); // Ajoutez le projet créé à la liste
    this.newProject = {}; // Réinitialisez le formulaire
    this.dialogRef.close({ projetMisAJour: true });
    });
  });
  }

  onDateDChange(date: Date): void {
    if (date) {
      const formattedDate = date.toISOString().slice(0, 10); // Exemple : "2015-02-15"
      this.newProject.date_debut = formattedDate;
    } else {
      this.newProject.date_debut = null;
    }
  }

  onDateFChange(date: Date): void {
    if (date) {
      const formattedDate = date.toISOString().slice(0, 10); // Exemple : "2015-02-15"
      this.newProject.date_fin_prevue = formattedDate;
    } else {
      this.newProject.date_fin_prevue = null;
    }
  }
}
