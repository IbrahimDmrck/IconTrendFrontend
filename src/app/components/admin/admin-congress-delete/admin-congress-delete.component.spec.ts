import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCongressDeleteComponent } from './admin-congress-delete.component';

describe('AdminCongressDeleteComponent', () => {
  let component: AdminCongressDeleteComponent;
  let fixture: ComponentFixture<AdminCongressDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCongressDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCongressDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
