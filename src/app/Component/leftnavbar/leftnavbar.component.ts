import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-leftnavbar',
  templateUrl: './leftnavbar.component.html',
  styleUrls: ['./leftnavbar.component.css']
})
export class LeftnavbarComponent implements OnInit {
  userRole: string = '';

  constructor(private dataService: DataService) { }

  /*ngOnInit(): void {
    this.getUserInfo();
  }*/

  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole(): void {
    this.dataService.getUserRole().subscribe(
      (role: string) => {
        this.userRole = role;
        console.log('User role:', this.userRole); // Affichage du rôle dans la console
        // Continuer avec d'autres actions ici, si nécessaire
      },
      (error) => {
        console.error('Error fetching user role:', error);
      }
    );
  }

}
