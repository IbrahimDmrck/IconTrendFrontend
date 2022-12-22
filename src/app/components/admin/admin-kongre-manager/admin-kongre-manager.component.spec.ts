import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKongreManagerComponent } from './admin-kongre-manager.component';

describe('AdminKongreManagerComponent', () => {
  let component: AdminKongreManagerComponent;
  let fixture: ComponentFixture<AdminKongreManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKongreManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminKongreManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
