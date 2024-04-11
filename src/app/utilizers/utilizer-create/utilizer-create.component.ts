import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first, forkJoin } from 'rxjs';
import { UsersService } from 'src/app/users.service';
import { UserCreateComponent } from 'src/app/users/user-create/user-create.component';
import { UserUpdateComponent } from 'src/app/users/user-update/user-update.component';

interface UserData {
blocked: any;
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-utilizer-create',
  templateUrl: './utilizer-create.component.html',
  styleUrls: ['./utilizer-create.component.css']
})
export class UtilizerCreateComponent {
  userId!: number;
  users: UserData[] = [];
  loading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService
  ) { }

  openModalU() {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: { userCreated: any; }) => {
      if (result && result.userCreated) {
        this.fetchUsers();
        dialogRef.close();
      }
    });
  }

  openModalUpdateUser(user: UserData) {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      data: { user, userId: this.userId },
      width: '600px',
    });
  }

  destroyUser(userId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.usersService.destroyUser(userId).pipe(first()).subscribe(
        () => {
          console.log("Utilisateur supprimé");
          this.fetchUsers();
        },
        (error: any) => {
          console.error('Erreur lors de la suppression de l\'utilisateur:', error);
          alert('Une erreur est survenue lors de la suppression de l\'utilisateur.');
        }
      );
    }
  }

  blockUser(userId: number): void {
    if (confirm('Êtes-vous sûr de vouloir bloquer cet utilisateur ?')) {
      this.usersService.blockUser(userId).pipe(first()).subscribe(
        () => {
          console.log("Utilisateur bloqué");
          this.fetchUsers();
        },
        (error: any) => {
          console.error('Erreur lors du blocage de l\'utilisateur:', error);
          alert('Une erreur est survenue lors du blocage de l\'utilisateur.');
        }
      );
    }
  }

  fetchUsers(): void {
    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (users: UserData[]) => {
        this.users = users;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        this.loading = false;
      }
    });
  }

  unblockUser(userId: number): void {
    if (confirm('Êtes-vous sûr de vouloir débloquer cet utilisateur ?')) {
      this.usersService.unblockUser(userId).pipe(first()).subscribe(
        () => {
          console.log("Utilisateur débloqué");
          this.fetchUsers();
        },
        (error: any) => {
          console.error('Erreur lors du déblocage de l\'utilisateur:', error);
          alert('Une erreur est survenue lors du déblocage de l\'utilisateur.');
        }
      );
    }
  }
}
