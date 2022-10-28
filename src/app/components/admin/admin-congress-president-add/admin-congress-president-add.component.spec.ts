import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCongressPresidentAddComponent } from './admin-congress-president-add.component';

describe('AdminCongressPresidentAddComponent', () => {
  let component: AdminCongressPresidentAddComponent;
  let fixture: ComponentFixture<AdminCongressPresidentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCongressPresidentAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCongressPresidentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
