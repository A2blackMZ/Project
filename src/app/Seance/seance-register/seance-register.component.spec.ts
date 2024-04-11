import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceRegisterComponent } from './seance-register.component';

describe('SeanceRegisterComponent', () => {
  let component: SeanceRegisterComponent;
  let fixture: ComponentFixture<SeanceRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeanceRegisterComponent]
    });
    fixture = TestBed.createComponent(SeanceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
