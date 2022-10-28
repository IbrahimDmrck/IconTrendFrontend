import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCongressUpdateComponent } from './admin-congress-update.component';

describe('AdminCongressUpdateComponent', () => {
  let component: AdminCongressUpdateComponent;
  let fixture: ComponentFixture<AdminCongressUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCongressUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCongressUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
