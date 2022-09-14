import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontBageComponent } from './front-bage.component';

describe('FrontBageComponent', () => {
  let component: FrontBageComponent;
  let fixture: ComponentFixture<FrontBageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontBageComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontBageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
