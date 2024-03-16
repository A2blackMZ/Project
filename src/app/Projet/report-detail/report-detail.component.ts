import { Component,Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { report: any }, private dialogRef: MatDialogRef<ReportDetailComponent>) {
  }

  closeModal(): void {
    // Utilisez la méthode close() du MatDialogRef pour fermer le modal
    this.dialogRef.close();
  }
}
