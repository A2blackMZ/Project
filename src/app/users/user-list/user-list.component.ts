import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Considérez l'utilisation d'un modèle d'utilisateur pour un typage fort
  projectId!: number;
  userId!: number;

  constructor(private UsersService: UsersService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Utilisez une approche plus sûre pour récupérer 'projectId'
    const projectIdParam = this.route.snapshot.paramMap.get('projectId');
    if (projectIdParam) {
      this.projectId = +projectIdParam;
      this.loadUsers();
    } else {
      console.error('Project ID is not available');
      // Gérer l'absence de projectId ici, par exemple rediriger l'utilisateur ou afficher un message
    }
  }

  loadUsers() {
    if (!Number.isNaN(this.projectId)) {
      this.UsersService.getUsers().subscribe(
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

    blockUser(userId: number): void {
    this.UsersService.blockUser(userId).subscribe(/* ... */);
  }

  unblockUser(userId: number): void {
    this.UsersService.unblockUser(userId).subscribe(/* ... */);
  }

  destroyUser(userId: number): void {
    this.UsersService.destroyUser(userId).subscribe(/* ... */);
  }
}

