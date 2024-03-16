import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';
import {ProjectTasksComponent } from 'src/app/Projet/project-tasks/project-tasks.component';
import { MatDialog } from '@angular/material/dialog';
import { TachesFormComponent } from 'src/app/Component/taches-form/taches-form.component';
import {ReportFormComponent } from 'src/app/Projet/report-form/report-form.component';
import { ReportDetailComponent } from '../report-detail/report-detail.component';
import {ProjectReportsComponent } from '../project-reports/project-reports.component';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent {
  projectId!: number;
  project: any; // Remplacez 'any' par le type de votre projet si possible
  tasks: any;
  comptesRendus: any[] = [];
  valeurSelectionnee!: string ;
  loading: boolean = false;
  tacheId!: number;
  compteRenduId!: number;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: ModalService,
    private dialog: MatDialog
  ) { }

 generateUniqueReference(): string {
    const prefix = 'PAC-'; // Préfixe de la référence
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Génère un nombre aléatoire de 5 chiffres

    return `${prefix}${randomNumber}`;
  };

  openModalF() {
    const dialogRef = this.dialog.open(TachesFormComponent, {
      data: { projetId: this.projectId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.projetMisAJour) {
        // Mettez à jour les données dans la vue ici, par exemple, en rechargeant les données du projet depuis le service
        this.fetchProjects();
      }
    });
  }

  openModalC() {
    const dialogRef = this.dialog.open(ProjectReportsComponent, {
      data: { projetId: this.projectId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.reportMisAJour) {
        // Mettez à jour les données dans la vue ici, par exemple, en rechargeant les données du projet depuis le service
        this.fetchProjects();
      }
    });
  }

  // openModalC() {
  //   this.modalService.openModalC();
  // }

  openModalUpdateTache(tache: any) {
    const dialogRef = this.dialog.open(ProjectTasksComponent, {
      data: { tache , projetId: this.projectId} // Passez les données de la tâche au composant modal
      });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.tacheMisAJour) {
        // Mettez à jour les données dans la vue ici, par exemple, en rechargeant les données du projet depuis le service
        this.fetchProjects();
      }
    });
  }

  openModalUpdateReport(report: any) {
    const dialogRef = this.dialog.open(ReportFormComponent, {
      data: { report, projetId: this.projectId } // Passez les données de la tâche au composant modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.reportMisAJour) {
        // Mettez à jour les données dans la vue ici, par exemple, en rechargeant les données du projet depuis le service
        this.fetchProjects();
      }
    });
  }

  openReportDetails(report: any) {
    const dialogRef = this.dialog.open(ReportDetailComponent, {
      data: { report }, // Passez les données du compte rendu au composant modal
    });
  }

  deleteCompteRendu(compteRenduId: number) {
    this.dataService.deleteCompteRendu(compteRenduId).subscribe(
      () => {
        console.log("Compte rendu supprimé avec succès");
        // Réexécutez la méthode fetchProjects ou toute autre logique de mise à jour nécessaire
        this.fetchProjects();
      },
      (error) => {
        console.error('Erreur lors de la suppression du compte rendu :', error);
      }
    );
  }


  fetchProjects() {
    this.loading = true;
    this.dataService.getProjectById(this.projectId).subscribe((data) => {
      this.project = data;
      this.loading = false;
    });
    this.dataService.getTasksByProjectId(this.projectId).subscribe((tasks) => {
      this.tasks = tasks;
      this.loading = false;
    });
    this.dataService
    .getComptesRendusByProjetId(this.projectId)
    .subscribe((comptesRendus) => {
      this.comptesRendus = comptesRendus;
      this.loading =false;
    });
  }

  ngOnInit(): void {
    // Obtenez l'ID du projet à partir de la route active
    this.route.params.subscribe((params) => {
      this.projectId = +params['id']; // Convertissez l'ID en nombre
    this.fetchProjects();

    });
  }
  deleteTache(tacheId :number) {
    console.log(tacheId);
    // Appelez le service pour supprimer la tâche par ID
    this.dataService.deleteTache(tacheId).subscribe(
      () => {
        console.log("tache supprimé");
        this.fetchProjects();
      },
      (error) => {
        // Gérez les erreurs de suppression ici
        console.error('Erreur lors de la suppression de la tâche :', error);
      }
    );
  }
}
