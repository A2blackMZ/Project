import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizerDetailComponent } from './utilizer-detail.component';

describe('UtilizerDetailComponent', () => {
  let component: UtilizerDetailComponent;
  let fixture: ComponentFixture<UtilizerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilizerDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilizerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
