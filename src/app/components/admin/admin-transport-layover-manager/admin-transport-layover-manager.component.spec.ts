import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransportLayoverManagerComponent } from './admin-transport-layover-manager.component';

describe('AdminTransportLayoverManagerComponent', () => {
  let component: AdminTransportLayoverManagerComponent;
  let fixture: ComponentFixture<AdminTransportLayoverManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTransportLayoverManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTransportLayoverManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
