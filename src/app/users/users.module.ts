import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserShowComponent } from './user-show/user-show.component';
import { UserUpdateComponent } from './user-update/user-update.component';;
import { AppRoutingModule } from '../app-routing.module';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [UsersService],
})
export class UsersModule { }
