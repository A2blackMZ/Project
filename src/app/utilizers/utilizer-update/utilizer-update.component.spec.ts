import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizerUpdateComponent } from './utilizer-update.component';

describe('UtilizerUpdateComponent', () => {
  let component: UtilizerUpdateComponent;
  let fixture: ComponentFixture<UtilizerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilizerUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilizerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
