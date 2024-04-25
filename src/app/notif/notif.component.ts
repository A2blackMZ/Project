import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';
import {ProjectTasksComponent } from 'src/app/Projet/project-tasks/project-tasks.component';
import { MatDialog } from '@angular/material/dialog';
import { TachesFormComponent } from 'src/app/Component/taches-form/taches-form.component';
import {ReportFormComponent } from 'src/app/Projet/report-form/report-form.component';
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

interface Notification {
  id: number;
  title: string;
  message: string;
}


interface Fichier {
  id: number;
  chemin: string;
  created_at: string;
  projetId?: string;
}


@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.css'],
})

export class NotifComponent {


  userId!: number;
  projectId!: number;
  project: any; // Remplacez 'any' par le type de votre projet si possible
  tasks: any;
  users: any;
  notifications: any[] = [];
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



  fetchNotifications() {
    this.loading = true;
    this.usersService.getNotifications(this.userId).subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        console.log(notifications);
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
      this.userId = +params['id']; // Convertissez l'ID en nombre
    this.fetchNotifications();
    });
    //this.userId = this.route.snapshot.params['userId'];
  }




  deleteNotif(notificationId :number) {
    console.log(notificationId);
    // Appelez le service pour supprimer la tâche par ID
    this.usersService.deleteNotification(notificationId, this.userId).subscribe(
      () => {
        console.log("notification supprimée");
        this.fetchNotifications();
      },
      (error) => {
        // Gérez les erreurs de suppression ici
        console.error('Erreur lors de la suppression de la notif :', error);
      }
    );
  }
}

