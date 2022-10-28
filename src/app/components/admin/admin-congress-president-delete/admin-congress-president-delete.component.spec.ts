import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCongressPresidentDeleteComponent } from './admin-congress-president-delete.component';

describe('AdminCongressPresidentDeleteComponent', () => {
  let component: AdminCongressPresidentDeleteComponent;
  let fixture: ComponentFixture<AdminCongressPresidentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCongressPresidentDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCongressPresidentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
