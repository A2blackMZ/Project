import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

interface Report {
  id: number;
  file_path: string;
  created_at: string;
  seanceId?: string;
}

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  seanceReports: Report[] = []; // Typage fort avec l'interface Report
  seanceId!: number;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => { // Destructuration pour obtenir l'id
      this.seanceId = +id;
      this.getSeanceReports();
    });
  }

  getSeanceReports(): void {
  this.dataService.getSeanceReports(this.seanceId).subscribe(
    (response) => {
      // Assurez-vous d'accéder à la propriété 'rapports' de la réponse
      this.seanceReports = response.rapports.map((report: Report) => ({
        id: report.id,
        created_at: new Date(report.created_at).toLocaleDateString(),
        file_path: report.file_path,
      }));
      console.log('Files retrieved successfully', this.seanceReports);
    },
    (error) => {
      console.error('Error lors du chargement des fichiers', error);
    }  
  );
}

}
