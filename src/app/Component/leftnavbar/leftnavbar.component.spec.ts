import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftnavbarComponent } from './leftnavbar.component';

describe('LeftnavbarComponent', () => {
  let component: LeftnavbarComponent;
  let fixture: ComponentFixture<LeftnavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftnavbarComponent]
    });
    fixture = TestBed.createComponent(LeftnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
