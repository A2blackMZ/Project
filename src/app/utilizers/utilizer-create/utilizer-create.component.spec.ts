import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizerCreateComponent } from './utilizer-create.component';

describe('UtilizerCreateComponent', () => {
  let component: UtilizerCreateComponent;
  let fixture: ComponentFixture<UtilizerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilizerCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilizerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
