import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizerListComponent } from './utilizer-list.component';

describe('UtilizerListComponent', () => {
  let component: UtilizerListComponent;
  let fixture: ComponentFixture<UtilizerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilizerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilizerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
