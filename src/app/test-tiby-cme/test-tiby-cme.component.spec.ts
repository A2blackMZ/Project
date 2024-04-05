import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTibyCMEComponent } from './test-tiby-cme.component';

describe('TestTibyCMEComponent', () => {
  let component: TestTibyCMEComponent;
  let fixture: ComponentFixture<TestTibyCMEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTibyCMEComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestTibyCMEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
