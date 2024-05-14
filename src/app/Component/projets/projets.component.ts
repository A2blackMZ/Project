import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {ProjectInfoComponent } from 'src/app/Projet/project-info/project-info.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from 'src/app/Component/project-form/project-form.component';
@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatPaginator) paginator: MatPaginator;

  donne = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

  projects: any[] = [];
  displayedProjects: any[] = []; // Tableau pour stocker les projets affichés actuellement
  loading: boolean = false;
  projectId!: number;
  userId!: number;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];


  pageIndex = 1;
  //pageSize = 10;
  //pageSizeOptions = [5, 10, 25];
  total = this.displayedProjects.length; // Calculez le nombre total de projets

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    // Logique pour récupérer les projets de la nouvelle page
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    // Logique pour récupérer les projets avec la nouvelle taille de page
  }

  constructor(private dialog: MatDialog,private route: ActivatedRoute,private dataService: DataService, private modalService: ModalService) {

  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) => {
      const startIndex = event.pageIndex * event.pageSize;
      const endIndex = startIndex + event.pageSize;
      this.displayedProjects = this.projects.slice(startIndex, endIndex);
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(ProjectFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.projetMisAJour) {
        // Mettez à jour les données dans la vue ici, par exemple, en rechargeant les données du projet depuis le service
        this.fetchProjects();
      }
    });
  }

  openModalF(){
    this.modalService.openModalF();
    this.fetchProjects();
  }

  openModalUpdateProjet(projet : any) {
    const dialogRef = this.dialog.open(ProjectInfoComponent, {
      // width: '400px',
      data: { projet } // Passez l'ID du projet au composant modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.projetMisAJour) {
        console.log(result);
        // Mettez à jour les données dans la vue ici, par exemple, en rechargeant les données du projet depuis le service
        this.fetchProjects();
      }
    });
  }


  ngOnInit(): void {
    this.fetchProjects();
    this.route.params.subscribe((params) => {
      this.projectId = +params['id']; // Convertissez l'ID en nombre
      console.log(this.projectId);
    });
  }

  deleteProjet(projectId: number) {
    // Utilisez l'ID du projet passé en paramètre
    console.log('Deleting project with ID:', projectId);
    this.dataService.deleteProjet(projectId).subscribe(
      () => {
        console.log("Projet supprimé");
        this.fetchProjects();
      },
      (error) => {
        // Gérez les erreurs de suppression ici
        console.error('Erreur lors de la suppression du projet :', error);
      }
    );
  }

  fetchProjects() {
    this.loading = true;
    console.log(this.loading);
    this.dataService.getUserInfo().subscribe((userInfo) => {
      this.userId = userInfo.id;
      console.log(this.userId);
      this.dataService.getProjectsByUserId(this.userId).subscribe((data) => {
        console.log(data);
        this.projects = data;
        console.log(this.projects);
        this.paginator.length = this.projects.length;
        // Chargez les projets initiaux lors du chargement de la page
        this.displayedProjects = this.projects.slice(0, this.pageSize);
       console.log(this.loading);
        this.loading = false;
      });
    });
  }
}
