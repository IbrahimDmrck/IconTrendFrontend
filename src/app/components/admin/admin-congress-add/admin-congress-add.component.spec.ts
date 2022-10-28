import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCongressAddComponent } from './admin-congress-add.component';

describe('AdminCongressAddComponent', () => {
  let component: AdminCongressAddComponent;
  let fixture: ComponentFixture<AdminCongressAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCongressAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCongressAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
