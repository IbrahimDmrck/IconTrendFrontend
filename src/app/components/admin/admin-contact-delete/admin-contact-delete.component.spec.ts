import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactDeleteComponent } from './admin-contact-delete.component';

describe('AdminContactDeleteComponent', () => {
  let component: AdminContactDeleteComponent;
  let fixture: ComponentFixture<AdminContactDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContactDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContactDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
