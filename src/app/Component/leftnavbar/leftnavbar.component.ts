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

  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole(): void {
    this.dataService.getUserRole().subscribe(
      (role: string) => {
        this.userRole = role.toLowerCase(); // Conversion en min¤
        console.log('User role:', this.userRole); // Affichage du rôle dans la console (debug)
      },
      (error) => {
        console.error('Error fetching user role:', error);
      }
    );
  }


}
