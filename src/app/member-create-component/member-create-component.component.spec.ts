import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCreateComponentComponent } from './member-create-component.component';

describe('MemberCreateComponentComponent', () => {
  let component: MemberCreateComponentComponent;
  let fixture: ComponentFixture<MemberCreateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberCreateComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberCreateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
