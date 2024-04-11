import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierAttahesComponent } from './fichier-attahes.component';

describe('FichierAttahesComponent', () => {
  let component: FichierAttahesComponent;
  let fixture: ComponentFixture<FichierAttahesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichierAttahesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FichierAttahesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
