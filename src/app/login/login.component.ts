import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  nom = '';
  loginError = '';
  constructor(private dataService: DataService, private router: Router, private authService: AuthService,) { }

  onSubmit(): void {
    this.loginError = ''; // Réinitialisez l'erreur avant de soumettre

    this.dataService.login(this.credentials).subscribe(
      (response) => {
        // Gérer la réponse en cas de succès
        // this.nom = response.utilisateur.name;

        console.log(response);

         // Enregistrez l'utilisateur comme connecté
        //  this.authService.login();

         const token = response.access_token;
         console.log(token);

         this.dataService.storeToken(token);

         // Redirigez vers une page appropriée (par exemple, le tableau de bord)
         this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Gérer les erreurs
        console.error(error);
        this.loginError = 'Identifiants incorrects';
      }
    );
}
}
