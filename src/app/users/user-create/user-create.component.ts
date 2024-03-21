import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/users.service';

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  projectId?: number;
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  userData: UserData = {
    name: '',
    email: '',
    password: '',
    role: ''
  };
  users: UserData[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number },
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<UserCreateComponent>
  ) {
    if (this.data.projectId) {
      this.userData.projectId = this.data.projectId;
    }
  }

  ngOnInit(): void {
    if (this.data.projectId) {
      this.usersService.getUsers(this.data.projectId).subscribe(
        (data: UserData[]) => {
          this.users = data;
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  createUser(): void {
    if (this.userData.projectId) {
      this.usersService.storeUser(this.userData.projectId, this.userData).subscribe(
        (data: UserData) => {
          this.users.push(data);
          this.userData = { name: '', email: '', password: '', role: '' }; // Reset form
          console.log('User created successfully:', data);
          this.dialogRef.close({ userCreated: true });
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    } else {
      console.error('Project ID is not available');
    }
  }
}
