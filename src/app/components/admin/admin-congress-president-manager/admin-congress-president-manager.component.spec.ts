import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCongressPresidentManagerComponent } from './admin-congress-president-manager.component';

describe('AdminCongressPresidentManagerComponent', () => {
  let component: AdminCongressPresidentManagerComponent;
  let fixture: ComponentFixture<AdminCongressPresidentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCongressPresidentManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCongressPresidentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
