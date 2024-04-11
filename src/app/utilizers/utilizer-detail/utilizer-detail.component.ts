import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilizersService } from 'src/app/utilizers.service';

@Component({
  selector: 'app-utilizer-detail',
  templateUrl: './utilizer-detail.component.html',
  styleUrls: ['./utilizer-detail.component.css']
})
export class UtilizerDetailComponent implements OnInit {
  utilizer: any; // Considérez d'utiliser un modèle pour un typage fort
  utilizerId!: number;

  constructor(
    private UtilizersService: UtilizersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('utilizerId');
    if (id) {
      this.utilizerId = +id;
      this.loadUtilizer();
    } else {
      // Gérer le cas où 'userId' est null
      console.error('User ID is missing');
      this.router.navigate(['/some-error-route']); // Redirigez vers une page d'erreur ou d'accueil
    }
  }

  loadUtilizer(): void {
    this.UtilizersService.getUtilizer(this.utilizerId).subscribe(
      (utilizerData: any) => {
        this.utilizer = utilizerData;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des détails de l\'utilisateur:', error);
      }
    );
  }
}
