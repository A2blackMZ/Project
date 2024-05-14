import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgChartsModule } from 'ng2-charts' ;
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';



import { AppComponent } from './app.component';
import { DataInterceptor } from './data.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { LeftnavbarComponent } from './Component/leftnavbar/leftnavbar.component';
import { TopnavbarComponent } from './Component/topnavbar/topnavbar.component';
import { DashboardOverviewComponent } from './Component/dashboard-overview/dashboard-overview.component';
import { ProjetsComponent } from './Component/projets/projets.component';
import { GraphComponent } from './Component/graph/graph.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
//import { NzMenuModule } from 'ng-zorro-antd/menu';
registerLocaleData(fr);

import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProjectFormComponent } from './Component/project-form/project-form.component';
import { TachesFormComponent } from './Component/taches-form/taches-form.component';
import { ProjectDetailsComponent } from './Projet/project-details/project-details.component';
import { ProjectInfoComponent } from './Projet/project-info/project-info.component';
import { ProjectReportsComponent } from './Projet/project-reports/project-reports.component';
import { ProjectTasksComponent } from './Projet/project-tasks/project-tasks.component';
import { ReportFormComponent } from './Projet/report-form/report-form.component';
import { ReportDetailComponent } from './Projet/report-detail/report-detail.component';
import { AccueilComponent } from './Seance/Accueil/accueil.component';
import { SeanceRegisterComponent } from './Seance/seance-register/seance-register.component';
import { TabsComponentComponent } from './Component/tabs-component/tabs-component.component';
//import { RapportComponent } from './rapport/rapport.component';
import { NotifComponent } from './notif/notif.component';


import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';


const appRoute: Routes = [{
  path: '',
  component : HomeComponent
}]
@NgModule({
  declarations: [
    SeanceRegisterComponent,
    ReportDetailComponent,
    TachesFormComponent,
    ProjectFormComponent,
    ProjetsComponent,
    AppComponent,
    HomeComponent,
    GraphComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    LeftnavbarComponent,
    TopnavbarComponent,
    DashboardOverviewComponent,
    ProjectDetailsComponent,
    ProjectInfoComponent,
    ProjectReportsComponent,
    ProjectTasksComponent,
    ReportFormComponent,
    AccueilComponent,
    TabsComponentComponent,
    //RapportComponent,
    UserUpdateComponent,
    UserCreateComponent,
    UserDetailComponent,
    UserListComponent,
    NotifComponent,
  ],
  imports: [
    DemoNgZorroAntdModule,
    MatPaginatorModule,
    MatDialogModule,
    DemoNgZorroAntdModule,
    FormsModule,
    BrowserModule,
    NgChartsModule,
    AppRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute),
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    EditorModule,
    MatSelectModule,
    MatOptionModule
    // NzIconModule.forRoot(),
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: DataInterceptor,
        multi: true
    },
    { provide: NZ_I18N, useValue: fr_FR },
    {
      provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce.min.js'
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
