import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizerShowComponent } from './utilizer-show.component';

describe('UtilizerShowComponent', () => {
  let component: UtilizerShowComponent;
  let fixture: ComponentFixture<UtilizerShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilizerShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilizerShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
