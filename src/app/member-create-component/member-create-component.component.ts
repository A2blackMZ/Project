import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UsersService } from 'src/app/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DataService } from '../services/data.service';
import { NzFormModule } from 'ng-zorro-antd/form';

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-member-create-component',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    NzSelectModule,
    NzFormModule
  ],
  templateUrl: './member-create-component.component.html',
  styleUrl: './member-create-component.component.css'
})
export class MemberCreateComponent implements OnInit {

  selectedRoles: string[] = [];
  roles: string[] = ['Admin', 'User', 'Créateur', 'Modificateur'];



  userData = {
    name: '',
    email: '',
    password: '',
    role: '',
    projet_id: '',
    selectedUserId: null // Ajoutez une propriété pour stocker l'ID de l'utilisateur sélectionné
  };
  users: any[] = []; // Initialisez la liste des utilisateurs
  projectId!: number;




  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: { projetId: number }, // Assurez-vous que 'projetId' est de type number
  private router: Router, 
  private usersService: UsersService, 
  private dialogRef: MatDialogRef<MemberCreateComponent>) {
    if (data.projetId) {
      this.projectId = data.projetId; // Utilisez 'projectID' au lieu de 'projet_id'
    }
}


  ngOnInit(): void {
    this.usersService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
    console.log(this.projectId);
  }



  addMember(): void {
    if (this.userData.selectedUserId && this.userData.role) {
      const userToAdd = {
        name: this.userData.name,
        email: this.userData.email,
        password: this.userData.password,
        role: this.userData.role
      };

      this.usersService.storeMember(this.projectId, this.userData.selectedUserId, userToAdd).subscribe(
        (data: any) => {
          console.log('User created successfully:', data);
          this.users.push(data.user);
          this.userData = {
            name: '',
            email: '',
            password: '',
            role: '',
            selectedUserId: null,
            projet_id: '',
          };
          this.dialogRef.close({ MemberAdd: true });
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    } else {
      console.error('Please select a user and provide a role.');
    }
  }




  closeModal(): void {
    this.dialogRef.close();
  }
  
}
