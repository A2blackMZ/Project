import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
// import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {
  // userName: string | null = null;
  user: any;
  userInfo: any;
  id!:number;
  userName!:string;

  constructor(private dataService: DataService, private router: Router) {
  }

  logout() {
    this.dataService.logout().subscribe(() => {
      // Redirigez l'utilisateur vers la page de connexion ou une autre page appropriée
      this.router.navigate(['/login']);
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return Error;
    }
  }
  ngOnInit(): void {
    const token = localStorage.getItem('dataToken');

    this.dataService.getUserInfo().subscribe((userInfo) => {
      this.id = userInfo.id;
      this.userName = userInfo.name;
    });
  }
}

