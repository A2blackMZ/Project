import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: any; // Considérez d'utiliser un modèle pour un typage fort
  userId!: number;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('userId');
    if (id) {
      this.userId = +id;
      this.loadUser();
    } else {
      // Gérer le cas où 'userId' est null
      console.error('User ID is missing');
      this.router.navigate(['/some-error-route']); // Redirigez vers une page d'erreur ou d'accueil
    }
  }

  loadUser(): void {
    this.usersService.getUser(this.userId).subscribe(
      (userData) => {
        this.user = userData;
      },
      (error) => {
        console.error('Erreur lors du chargement des détails de l\'utilisateur:', error);
      }
    );
  }
}
