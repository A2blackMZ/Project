import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilizersService } from 'src/app/utilizers.service';


interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  projetId?: string;
}


@Component({
  selector: 'app-utilizer-update',
  templateUrl: './utilizer-update.component.html',
  styleUrls: ['./utilizer-update.component.css']
})
export class UtilizerUpdateComponent implements OnInit {
  form!: FormGroup;
  userData: UserData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private utilizersService: UtilizersService,
    private dialogRef: MatDialogRef<UtilizerUpdateComponent>
  ) {
    this.userData = data.userData; // Assurez-vous que userData est passé correctement
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required],
  role: ['', Validators.required]
});

  }

  updateUser() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.utilizersService.updateUtilizer(this.userData.id, formData).subscribe(
        (response: any) => {
          console.log('Utilisateur mis à jour avec succès :', response);
          this.dialogRef.close({ userUpdated: true });
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        }
      );
    } else {
      console.error('Le formulaire n\'est pas valide');
    }
  }
}
