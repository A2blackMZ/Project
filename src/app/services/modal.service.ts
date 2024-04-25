import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjectFormComponent } from '../Component/project-form/project-form.component';
import { TachesFormComponent } from '../Component/taches-form/taches-form.component';
import { ProjectReportsComponent } from '../Projet/project-reports/project-reports.component';
import { ProjectInfoComponent } from '../Projet/project-info/project-info.component';
import { ReportFormComponent } from '../Projet/report-form/report-form.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  projectId!: number;
  constructor(private dialog: MatDialog) { }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // Empêche la fermeture en cliquant à l'extérieur
    dialogConfig.autoFocus = true; // Met le focus automatiquement sur la modal

    this.dialog.open(ProjectFormComponent, dialogConfig);
  }

  openModalF() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // Empêche la fermeture en cliquant à l'extérieur
    dialogConfig.autoFocus = true; // Met le focus automatiquement sur la modal

    this.dialog.open(TachesFormComponent, dialogConfig);
  }

  openModalC() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // Empêche la fermeture en cliquant à l'extérieur
    dialogConfig.autoFocus = true; // Met le focus automatiquement sur la modal

    this.dialog.open(ProjectReportsComponent, dialogConfig);
  }


  openModalUpdateReport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // Empêche la fermeture en cliquant à l'extérieur
    dialogConfig.autoFocus = true; // Met le focus automatiquement sur la modal

    this.dialog.open(ReportFormComponent, dialogConfig);
  }
}
