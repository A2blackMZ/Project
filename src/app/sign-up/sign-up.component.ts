import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  userData = {
    name: '',
    email: '',
    password: ''
  };

  registrationError = '';

  constructor(private dataService: DataService) {}

  onSubmit(): void {
    this.registrationError = '';

    this.dataService.register(this.userData).subscribe(
      (response) => {
        console.log(response);
        // Gérer la réponse du backend après l'enregistrement réussi
      },
      (error) => {
        console.error(error);
        this.registrationError = 'Erreur lors de l\'enregistrement';
      }
    );
  }

  // Function to toggle password visibility
  togglePasswordVisibility(fieldName: string): void {
    const inputField = document.getElementsByName(fieldName)[0] as HTMLInputElement;
    if (inputField.type === 'password') {
      inputField.type = 'text';
    } else {
      inputField.type = 'password';
    }
  }
}
