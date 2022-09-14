import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SroteSettingComponent } from './srote-setting.component';

describe('SroteSettingComponent', () => {
  let component: SroteSettingComponent;
  let fixture: ComponentFixture<SroteSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SroteSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SroteSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
