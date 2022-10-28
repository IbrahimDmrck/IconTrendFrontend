import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransportLayoverUpdateComponent } from './admin-transport-layover-update.component';

describe('AdminTransportLayoverUpdateComponent', () => {
  let component: AdminTransportLayoverUpdateComponent;
  let fixture: ComponentFixture<AdminTransportLayoverUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTransportLayoverUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTransportLayoverUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
