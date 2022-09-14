import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourStoreComponent } from './your-store.component';

describe('YourStoreComponent', () => {
  let component: YourStoreComponent;
  let fixture: ComponentFixture<YourStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
