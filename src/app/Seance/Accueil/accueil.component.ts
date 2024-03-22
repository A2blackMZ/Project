import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
//import * as jsPDF from 'jspdf';
import { jsPDF } from 'jspdf';
import { error } from 'jquery';

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

      //Positionnement vertical
      let verticalPosition = 10;

      //Ajout de données récupérées dans le PDF

      `<h1>Rapport de Seance de supervision</h1>`

      doc.text('Evènement:'+response.evenement, 10, verticalPosition);
      verticalPosition += 10;

      doc.text('Difficultés:'+response.difficultes, 10, verticalPosition);
      verticalPosition += 10;

      doc.text('Commentaires:'+response.commentaires, 10, verticalPosition);
      verticalPosition += 10;

      doc.text('Date de la séance de supervision:'+response.date, 10, verticalPosition);
      verticalPosition += 10;

      doc.text('Approches de solutions:'+response.approche_solution, 10, verticalPosition);
      verticalPosition += 10;

      doc.text('Actions retenues:'+response.action_retenu, 10, verticalPosition);
      verticalPosition += 10;

      doc.save('rapport.pdf');

      console.log('Rapport généré avec succès');
    }
    ,(error) => {
      console.error('Une erreur s\'est produite lors de la génération du rapport:', error);
    }
  );
  }
}