import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';
import {ProjectTasksComponent } from 'src/app/Projet/project-tasks/project-tasks.component';
import { MatDialog } from '@angular/material/dialog';
import { TachesFormComponent } from 'src/app/Component/taches-form/taches-form.component';
import {ReportFormComponent } from 'src/app/Projet/report-form/report-form.component';
import { ReportDetailComponent } from '../report-detail/report-detail.component';
import {ProjectReportsComponent } from '../project-reports/project-reports.component';
import { UsersService } from 'src/app/users.service';
import { UserCreateComponent } from 'src/app/users/user-create/user-create.component';
import { UserUpdateComponent } from 'src/app/users/user-update/user-update.component';
import { first, forkJoin } from 'rxjs';
import { MemberCreateComponent } from 'src/app/member-create-component/member-create-component.component';


interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  projetId?: string;
}

interface Fichier {
  id: number;
  chemin: string;
  created_at: string;
  projetId?: string;
}




@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent {
  getBadgeStatus(etat: string): string {
    switch (etat) {
      case 'Enregistré':
        return 'processing';
      case 'En cours':
        return 'warning';
      case 'Terminé':
        return 'success';
      case 'Annulé':
        return 'error';
      default:
        return '';
    }
  }
  
  userId!: number;
  projectId!: number;
  project: any; // Remplacez 'any' par le type de votre projet si possible
  tasks: any;
  users: any;
  comptesRendus: any[] = [];
  valeurSelectionnee!: string ;
  loading: boolean = false;
  tacheId!: number;
  compteRenduId!: number;
  fichierId!: number;


  selectedFile: File | null = null;

  fichiersImportes: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: ModalService,
    private dialog: MatDialog,
    private usersService: UsersService,
    private router: Router
  ) { }

  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image code a11ychecker advlist advcode advtable autolink checklist export lists link image charmap preview anchor searchreplace visualblocks powerpaste fullscreen formatpainter insertdatetime media table help wordcount',
    menubar: true,
    toolbar: true,
    min_height: 10
  }

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
        this.fetchProjects();
      }
    });
  }

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
  forkJoin({
    project: this.dataService.getProjectById(this.projectId),
    tasks: this.dataService.getTasksByProjectId(this.projectId),
    comptesRendus: this.dataService.getComptesRendusByProjetId(this.projectId),
    users: this.usersService.getMembers(this.projectId),
  }).subscribe({
    next: ({ project, tasks, comptesRendus, users }) => {
      this.project = project;
      this.tasks = tasks;
      this.comptesRendus = comptesRendus;
      this.users = users;
      this.loading = false;
    },
    error: (error) => {
      console.error('Erreur lors de la récupération des données:', error);
      this.loading = false;
    }
  });
}


  ngOnInit(): void {
    // Obtenez l'ID du projet à partir de la route active
    this.route.params.subscribe((params) => {
      this.projectId = +params['id']; // Convertissez l'ID en nombre
    this.fetchProjects();
    });
    this.userId = this.route.snapshot.params['userId'];

    this.fichierId = this.route.snapshot.params['fichierId'];

    this.recupererFichiers();
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
  openModalU() {
  const dialogRef = this.dialog.open(MemberCreateComponent, {
    data: { projetId: this.projectId },
    width: '600px',
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result && result.MemberAdd) {
      this.fetchProjects();
    }
  });
}

openModalUpdateUser(user: UserData) {
  const dialogRef = this.dialog.open(UserUpdateComponent, {
    data: { user, projetId: this.projectId, userId: this.userId},
    width: '600px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result && result.userUpdated) {
      this.fetchProjects();
    }
  });
}


blockUser(userId: number): void {
  if (confirm('Êtes-vous sûr de vouloir bloquer cet utilisateur ?')) {
    this.usersService.blockUser(userId).pipe(first()).subscribe(
      () => {
        console.log("utilisateur bloqué");
        this.fetchProjects();
      },
      (error) => {
        console.error('Erreur lors du blocage de l\'utilisateur:', error);
        alert('Une erreur est survenue lors du blocage de l\'utilisateur.');
      }
    );
  }
}


unblockUser(userId: number): void {
  if (confirm('Êtes-vous sûr de vouloir débloquer cet utilisateur ?')) {
    this.usersService.unblockUser(userId).pipe(first()).subscribe(
      () => {
        console.log("utilisateur débloqué");
        this.fetchProjects();
      },
      (error) => {
        console.error('Erreur lors du déblocage de l\'utilisateur:', error);
        alert('Une erreur est survenue lors du déblocage de l\'utilisateur.');
      }
    );
  }
}

destroyUser(userId: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    this.usersService.destroyUser(userId).pipe(first()).subscribe(
      () => {
        console.log("utilisateur supprimé");
        this.fetchProjects();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        alert('Une erreur est survenue lors de la suppression de l\'utilisateur.');
      }
    );
  }
}

destroyFile(fichierId: number): void {
  if (fichierId == null || fichierId === undefined) {
    console.error('L\'ID du fichier est undefined.');
    return;
  }

  if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
    this.dataService.destroyFile(fichierId).pipe(first()).subscribe(
      () => {
        console.log("fichier supprimé");
        this.ngOnInit(); // On force une actualisation de la page pour afficher le changement
      },
      (error) => {
        console.error('Erreur lors de la suppression du fichier:', error);
        alert('Une erreur est survenue lors de la suppression du fichier.');
      }
    );
  }
}



// Add these properties to your ProjectDetailsComponent


// Add these methods to your ProjectDetailsComponent

onFileSelected(event: Event): void {
  const element = event.currentTarget as HTMLInputElement;
  let fileList: FileList | null = element.files;
  if (fileList) {
    this.selectedFile = fileList[0];
  }
}

uploadFile(): void {
  if (this.selectedFile) {
    this.dataService.importerFichier(this.selectedFile, this.projectId).subscribe(
      (response) => {
        console.log('File uploaded successfully', response);
        this.recupererFichiers();
      },
      (error) => {
        console.error('Error uploading file', error);
      }
    );
  }
}



recupererFichiers(): void {
  this.dataService.recupererFichiers(this.projectId).subscribe(
    (fichiers) => {
      this.fichiersImportes = fichiers.map((fichier: Fichier) => ({
        lien: fichier.chemin,
        dateImportation: new Date(fichier.created_at).toLocaleDateString(),
        id: fichier.id,
      }));
      console.log('Files retrieved successfully', this.fichiersImportes);
    },
    (error) => {
      console.error('Error retrieving files', error);
    }
  );
}



}
