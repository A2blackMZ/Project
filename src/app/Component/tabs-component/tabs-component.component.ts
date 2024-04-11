import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Si vous utilisez le routeur Angular
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-tabs-component',
  templateUrl: './tabs-component.component.html',
  styleUrls: ['./tabs-component.component.css']
})


export class TabsComponentComponent {
  projetsSelectionnes: any[] = [];
  activeTab: number = 0;
  seanceId!: number; // Récupérez l'ID de la séance, par exemple depuis les paramètres de l'URL
  projetForm!: FormGroup;
  report: any = {};
  derniersCompteRendus: any[] = [];
  loading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute // Si vous utilisez le routeur Angular
  ) {}

    editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image code a11ychecker advlist advcode advtable autolink checklist export lists link image charmap preview anchor searchreplace visualblocks powerpaste fullscreen formatpainter insertdatetime media table help wordcount',
    menubar: true,
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    min_height: 10
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.seanceId = +params['seanceId']; // Convertissez la valeur en nombre si nécessaire
      // Utilisez this.seanceId pour effectuer des opérations liées à la séance
    });

    this.dataService.getProjetsForSeance(this.seanceId).subscribe((data) => {
      this.projetsSelectionnes = data;

      // Utilisez forkJoin pour attendre que toutes les requêtes de récupération des derniers comptes rendus soient terminées
      const observables = this.projetsSelectionnes.map((projet) =>
        this.dataService.getLatestCompteRenduByProject(projet.id)
      );

      forkJoin(observables).subscribe((compteRendus) => {
        this.derniersCompteRendus = compteRendus;
        console.log(this.derniersCompteRendus);

        this.loading = false;
        // Une fois que les données sont disponibles, initialisez le formulaire avec le premier compte rendu
        if (this.derniersCompteRendus.length > 0) {
          this.selectTab(this.projetsSelectionnes[0].id);
        }
      });
    });

    this.projetForm = this.formBuilder.group({
      evenement: [this.report.evenement || '', Validators.required],
      difficultes: [this.report.difficultes || '', Validators.required],
      commentaires: [this.report.commentaires || '', Validators.required],
      date: [this.report.date || '', Validators.required],
      approche_solution: [this.report.approche_solution !== null ? this.report.approche_solution : 'RAS'],
      action_retenu: [this.report.approche_solution !== null ? this.report.approche_solution : 'RAS'],
      projet_id: [this.report.projet_id || '', Validators.required],
      // Définissez ici les champs du formulaire spécifiques au projet
    });
  }

  selectTab(projetId: number) {
    this.activeTab = projetId;
    const compteRendu = this.derniersCompteRendus.find((cr) => cr.projet_id === projetId);
    if (compteRendu) {
    this.report = compteRendu;
    this.projetForm.patchValue({
      evenement: compteRendu.evenement || '',
      difficultes: compteRendu.difficultes || '',
      commentaires: compteRendu.commentaires || '',
      date: compteRendu.date || '',
      approche_solution: compteRendu.approche_solution || "RAS",
      action_retenu: compteRendu.action_retenu ||"RAS",
      projet_id: compteRendu.projet_id || '',
      // Remplissez les autres champs du formulaire ici
    });
  }
  }

  submitForm() {
    this.loading = true; // Activez l'indicateur de chargement

    this.dataService.updateReport(this.report.id, this.projetForm.value).subscribe(
      (response) => {
        // Gérez la réponse de la mise à jour ici, par exemple, mettez à jour les informations du projet affichées
        console.log('Compte rendu du Projet mis à jour avec succès', response);
        this.loading = false; // Désactivez l'indicateur de chargement en cas de succès
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du compte rendu du projet', error);
        this.loading = false; // Désactivez l'indicateur de chargement en cas d'erreur
      }
    );
  }


}
