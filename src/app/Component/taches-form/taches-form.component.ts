import { Component,Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-taches-form',
  templateUrl: './taches-form.component.html',
  styleUrls: ['./taches-form.component.css']
})
export class TachesFormComponent {
  taches:any;
  newTache: any = {
    nom: '',
    description: '',
    date_echeance: '',
    etat: '',
    projet_id: ''
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: { projetId: string },private route: ActivatedRoute, private router: Router, private dataService: DataService, private dialogRef: MatDialogRef<TachesFormComponent>) {
    this.taches = [];
    if (data.projetId) {
      this.newTache.projet_id = data.projetId; // Utilisez l'ID de la page principale
    }
  }

ngOnInit(): void {
  this.dataService.getTaches().subscribe((data) => {
    this.taches = data;
  });

}

closeModal() {
  // Utilisez la méthode close() pour fermer la fenêtre modale
  this.dialogRef.close();
}

// Méthode pour créer un nouveau projet
createTaches(): void {
  console.log(this.newTache);
  console.log(this.taches);
  this.dataService.createTache(this.newTache).subscribe((data) => {
    this.taches.push(data); // Ajoutez la tâche créé à la liste
    this.newTache = {}; // Réinitialisez le formulaire
    this.dialogRef.close({ projetMisAJour: true });
    });

  }
}
