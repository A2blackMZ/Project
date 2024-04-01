import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FichierAttache } from '../fichier-attache.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-fichier-attahes',
  standalone: true,
  imports: [],
  templateUrl: './fichier-attahes.component.html',
  styleUrl: './fichier-attahes.component.css'
})
export class FichierAttahesComponent {

		constructor(private router: Router, private dataService: DataService, private toastr: ToastrService) {}

    


}
