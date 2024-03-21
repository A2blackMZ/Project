import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/users.service';


interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  projetId?: string;
}


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  form!: FormGroup;
  userData: UserData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<UserUpdateComponent>
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
      this.usersService.updateUser(this.userData.id, formData).subscribe(
        (response) => {
          console.log('Utilisateur mis à jour avec succès :', response);
          this.dialogRef.close({ userUpdated: true });
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        }
      );
    } else {
      console.error('Le formulaire n\'est pas valide');
    }
  }
}
