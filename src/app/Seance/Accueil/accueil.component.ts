import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
//import * as jsPDF from 'jspdf';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  @Input() rapport: any;
    [x: string]: any;
		seances: any[] = [];
    projets: any[] = [];
    seanceId!: number;
    projetId!: number;
    loading:boolean =false;
    rapports: any[] = [];
    project: any = {};


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


  generatePdf(seanceId: number) {
    this.dataService.generatePdf(seanceId).subscribe(
      (pdfBlob: Blob) => {
        // Crée un objet blob URL pour le PDF généré
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Ouvrir le PDF dans un nouvel onglet
        window.open(pdfUrl);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la génération du PDF :', error);
      }
    );
  }

  getTitleTooltip(statut: string): string {
    if (statut === 'valide') {
      return 'Les comptes rendus de cette séance ont été lus et validés par le chef projet.';
    } else {
      return 'Les comptes rendus de cette séance n\'ont pas encore été lus et validés par le chef projet.';
    }
  }


  

}
