import { TabsComponentComponent } from './../../Component/tabs-component/tabs-component.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seance-register',
  templateUrl: './seance-register.component.html',
  styleUrls: ['./seance-register.component.css']
})
export class SeanceRegisterComponent implements OnInit{
  date_supervision!: null
  currentStep = 1;
  dateReunion: string = new Date().toISOString().slice(0, 10);
  // dateReunion!: string; // Stocke la date de réunion
  heureReunion!: string; // Stocke l'heure de réunion
  projects: any[] = [];
  userId!: number;
  derniersCompteRendus: any[] = [];
  projetsSelectionnes: any[] = []; // Liste des projets sélectionnés}
  seances: any[] = [];
  newSeance: any = {
    'reference': '',
    'date_supervision': '',
    'date_creation': '',
    'nom_chef_projet': '',
    'statut': '',
  };


  nextStep() {
    this.currentStep++;
  }
  constructor(private dataService: DataService , private router: Router) {}

  ngOnInit(){
    this.dataService.getUserInfo().subscribe((userInfo) => {
      this.userId = userInfo.id;
      this.newSeance.nom_chef_projet = userInfo.name;
      this.dataService.getProjectsByUserId(this.userId).subscribe((data) => {
        this.projects = data;
        this.projects.forEach((projet) => {
          projet.selectionne = true;
        });
      });
    });

    this.projetsSelectionnes.forEach((projet) => {
      this.dataService.getLatestCompteRenduByProject(projet.id).subscribe((compteRendu) => {
        this.derniersCompteRendus.push(compteRendu);
      });
    });

  }

  previousStep() {
    this.currentStep--;
  }

  saveSelections() {
    // Logique pour enregistrer les projets sélectionnés
    const projetsSelectionnes = this.projects.filter(projet => projet.selectionne);
    console.log('Projets sélectionnés :', projetsSelectionnes);
    // Vous pouvez ajouter ici le code pour envoyer les sélections au serveur, etc.
  }

  createSeance(): void {
      this.newSeance.projets = this.projects.filter(projet => projet.selectionne);
      this.newSeance.compteRendus = this.derniersCompteRendus;
      this.dataService.createSeance(this.newSeance).subscribe((data) => {
        console.log(data);
        this.seances.push(data); // Ajoutez le projet créé à la liste
      this.newSeance = {}; // Réinitialisez le formulaire
       this.projects.forEach((projet) => {
      projet.selectionne = true;
    });

    // Réinitialisez this.derniersCompteRendus
    this.derniersCompteRendus = [];

     this.router.navigate(['/seance']);
      });
    }

    onDateChange(date: Date): void {
      if (date) {
        const formattedDate = date.toISOString().slice(0, 10); // Exemple : "2015-02-15"
        this.newSeance.date_supervision = formattedDate;
      } else {
        this.newSeance.date_supervision = null;
      }
    }


}
