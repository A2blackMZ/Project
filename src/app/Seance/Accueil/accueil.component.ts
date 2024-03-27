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

genererRapport(projetId: number) {
  this.dataService.genererRapport(projetId).subscribe(
    (response) => {
      console.log(projetId);
      console.log('Données récupérées avec succès:', response);

      // Créer un nouveau document PDF
      const doc = new jsPDF();

      // Générer le contenu HTML du rapport
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Rapport de Séance de Supervision</title>
          <style>
            .data{
              font-size:4px
            }
          </style>
        </head>
        <body>
          <h5>Rapport de Séance de Supervision</h4>
          <p class="data">Événement: ${response.evenement}</p>
          <p class="data">Difficultés: ${response.difficultes}</p>
          <p class="data">Commentaires: ${response.commentaires}</p>
          <p class="data">Date du compte rendu: ${response.date}</p>
          <p class="data">Approches de solution: ${response.approche_solution}</p>
          <p class="data">Actions retenues: ${response.action_retenu}</p>
        </body>
        </html>
      `;

      // Ajouter le contenu HTML au PDF
      doc.html(htmlContent, {
        callback: () => {
          // Sauvegarder le document PDF localement
          doc.save('rapport.pdf');
          console.log('Rapport généré avec succès!');
        }
      });
    },
    (error) => {
      console.error('Une erreur s\'est produite lors de la génération du rapport :', error);
    }
  );
}



}
