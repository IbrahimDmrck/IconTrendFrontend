import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactManagerComponent } from './admin-contact-manager.component';

describe('AdminContactManagerComponent', () => {
  let component: AdminContactManagerComponent;
  let fixture: ComponentFixture<AdminContactManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContactManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContactManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
