import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
		seances: any[] = [];
    seanceId!: number;
    loading:boolean =false;
    rapports: any[] = [];
		constructor(private router: Router, private dataService: DataService) {}

  fetchSeance(){
    this.loading = true;
    this.dataService.getAllSeances().subscribe((data) => {
      this.seances = data;
      this.loading = false;
    });
  }

    ngOnInit() {
    this.fetchSeance();
    /*this.fetchRapportData(this.seanceId);*/
  }

  onGererClick(seanceId: number) {
    // Naviguez vers TabsComponent avec l'ID de la séance en tant que paramètre
    this.router.navigate(['seance/gestion', seanceId]);
  }

  /*fetchRapportData(seanceId: number): void {
    this.loading = true;
    this.dataService.generateRapportData(seanceId).subscribe(
      (data) => {
        this.rapports = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données du rapport : ', error);
        this.loading = false;
      }
    );
  }*/

  validateSeance(seanceId: number) {
	this.dataService.validateSeance(seanceId).subscribe(
    (response) => {
      // Traitez la réponse ici (rafraîchissement de la vue, etc.)
      console.log('Séance validée avec succès');
      this.fetchSeance();
    },
    (error) => {
      // Traitez les erreurs ici, si nécessaire
      console.error('Erreur lors de la validation de la séance', error);
    }
  );
}

generateReport(seanceId: number) {
  this.dataService.generateReport(seanceId).subscribe(
    (response) => {
      // Traitez le PDF généré ici (par exemple, l'afficher ou le télécharger)
      console.log('PDF généré avec succès', response);
      // Vous pouvez afficher le PDF dans une nouvelle fenêtre ou le télécharger en fonction de vos besoins
    },
    (error) => {
      console.error('Erreur lors de la génération du rapport', error);
      // Traitez les erreurs ici, si nécessaire
    }
  );
}


}
