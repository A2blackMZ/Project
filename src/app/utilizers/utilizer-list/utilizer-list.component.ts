import { Component, OnInit } from '@angular/core';
import { UtilizersService } from 'src/app/utilizers.service';

@Component({
  selector: 'app-utilizer-list',
  templateUrl: './utilizer-list.component.html',
  styleUrls: ['./utilizer-list.component.css']
})
export class UtilizerListComponent implements OnInit {
  utilizers: any[] = []; // Considérez l'utilisation d'un modèle d'utilisateur pour un typage fort

  constructor(private utilizersService: UtilizersService) {}

  ngOnInit() {
    // Chargez les utilisateurs ici
    this.loadUtilizers();
  }

  loadUtilizers() {
    // Vous devez passer un identifiant d'utilisateur valide ici
    const userId = 1; // Par exemple, l'ID de l'utilisateur que vous souhaitez récupérer
    this.utilizersService.getUtilizer(userId).subscribe(
      (data: any) => {
        this.utilizers.push(data); // Ajoutez l'utilisateur récupéré à la liste
      },
      (error: any) => {
        console.error('Une erreur est survenue lors du chargement des utilisateurs :', error);
        // Implémentez une logique pour afficher un message d'erreur à l'utilisateur
      }
    );
  }

  blockUser(utilizerId: number): void {
    this.utilizersService.blockUtilizer(utilizerId).subscribe(/* ... */);
  }

  unblockUser(utilizerId: number): void {
    this.utilizersService.unblockUtilizer(utilizerId).subscribe(/* ... */);
  }

  destroyUser(utilizerId: number): void {
    this.utilizersService.destroyUtilizer(utilizerId).subscribe(/* ... */);
  }
}
