import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/users.service';

interface UserData {
  userId?: number;
  name: string;
  email: string;
  password: string;
  role: string;
  /*projectId?: number;*/
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
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<UserCreateComponent>
  ) {
    /*if (this.data.userId) {
      this.userData.userId = this.data.userId;
    }*/
  }

  ngOnInit(): void {
      this.usersService.getUsers().subscribe(
        (data: UserData[]) => {
          this.users = data;
        },
        (error: any) => {
          console.error('Error fetching users:', error);
        }
      );
    }


  closeModal(): void {
    this.dialogRef.close();
  }

  createUser(): void {
      this.usersService.storeUser(this.userData).subscribe(
        (data: UserData) => {
          this.users.push(data);
          this.userData = { name: '', email: '', password: '', role: '' }; // Reset form
          console.log('User created successfully:', data);
          this.dialogRef.close({ userCreated: true });
        },
        (error: any) => {
          console.error('Error creating user:', error);
        }
      );
  }
}
