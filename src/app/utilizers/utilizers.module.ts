import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilizerCreateComponent } from './utilizer-create/utilizer-create.component';
/*import { LeftnavbarComponent } from '../Component/leftnavbar/leftnavbar.component';
import { TopnavbarComponent } from '../Component/topnavbar/topnavbar.component';
import { UtilizerListComponent } from './utilizer-list/utilizer-list.component';
import { UtilizerDetailComponent } from './utilizer-detail/utilizer-detail.component';
import { UtilizerUpdateComponent } from './utilizer-update/utilizer-update.component';*/
import { UtilizersService } from '../utilizers.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    /*UtilizerCreateComponent,
    LeftnavbarComponent,
    TopnavbarComponent,*/
    /*UtilizerListComponent,
    UtilizerDetailComponent,
    UtilizerUpdateComponent*/
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UtilizersService],
})
export class UtilizersModule { }
