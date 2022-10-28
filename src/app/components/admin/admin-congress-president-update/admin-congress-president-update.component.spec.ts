import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCongressPresidentUpdateComponent } from './admin-congress-president-update.component';

describe('AdminCongressPresidentUpdateComponent', () => {
  let component: AdminCongressPresidentUpdateComponent;
  let fixture: ComponentFixture<AdminCongressPresidentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCongressPresidentUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCongressPresidentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
