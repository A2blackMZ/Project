import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {DashboardComponent } from './Component/dashboard/dashboard.component';
import { GraphComponent } from './Component/graph/graph.component'
import { ProjetsComponent } from './Component/projets/projets.component';
import { ProjectFormComponent } from './Component/project-form/project-form.component';
import { ProjectDetailsComponent } from './Projet/project-details/project-details.component';
import { ProjectInfoComponent } from './Projet/project-info/project-info.component';
import { ProjectReportsComponent } from './Projet/project-reports/project-reports.component';
import { ProjectTasksComponent } from './Projet/project-tasks/project-tasks.component';
import { AccueilComponent } from './Seance/Accueil/accueil.component';
import { SeanceRegisterComponent } from './Seance/seance-register/seance-register.component';
import { TabsComponentComponent } from './Component/tabs-component/tabs-component.component';

import { TestTibyCMEComponent } from './test-tiby-cme/test-tiby-cme.component';

import { ReportDetailComponent } from './Projet/report-detail/report-detail.component';

import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { FichierAttahesComponent } from './fichier-attahes/fichier-attahes.component';
import { NotifComponent } from './notif/notif.component';

const routes: Routes = [
  { path: '', component : HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'seance/gestion/:seanceId', component: TabsComponentComponent },
  { path: 'graph', component: GraphComponent },
  { path: 'seance', component: AccueilComponent },
  { path: 'seance/new', component: SeanceRegisterComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projets', component: ProjetsComponent },
  { path: 'users', component: UserListComponent },
  { path: 'form', component: ProjectFormComponent },
  { path: 'notif/:id', component: NotifComponent },
  { path: 'project-details/:id', component: ProjectDetailsComponent},
  //{ path: 'list', component: UserListComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'create', component: UserCreateComponent },
  { path: 'update/:id', component: UserUpdateComponent },
  { path: 'rapport/:id', component: ReportDetailComponent },
  { path: 'fichier_attaches', component: FichierAttahesComponent },
  { path: 'testTinyCME', component: TestTibyCMEComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }


