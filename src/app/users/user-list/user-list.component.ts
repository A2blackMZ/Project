import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import { UserCreateComponent } from '../user-create/user-create.component';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from 'src/app/services/modal.service';
import { first, forkJoin } from 'rxjs';
import { UserUpdateComponent } from '../user-update/user-update.component';


interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  projectId!: number;
  userId!: number;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: ModalService,
    private dialog: MatDialog,
    private usersService: UsersService,
    private router: Router
  ) { }

  fetchProjects() {
    this.loading = true;
    forkJoin({
      users: this.usersService.getUsers()
    }).subscribe({
      next: ({ users }) => {
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
      this.fetchProjects();
      };
    

  loadUsers() {
    if (!Number.isNaN(this.projectId)) {
      this.usersService.getUsers().subscribe(
        (data: any[]) => {
          this.users = data;
        },
        (error) => {
          console.error('Une erreur est survenue lors du chargement des utilisateurs :', error);
          // Implémentez une logique pour afficher un message d'erreur à l'utilisateur
        }
      );
    } else {
      console.error('Invalid Project ID');
      // Afficher un message d'erreur ou rediriger l'utilisateur
    }
  }

  
  openModalU() {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      data: { projectId: this.projectId },
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.userCreated) {
        this.fetchProjects();
      }
    });
  }
  
  openModalUpdateUser(user: UserData) {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      data: { user, userId: this.userId},
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
}

