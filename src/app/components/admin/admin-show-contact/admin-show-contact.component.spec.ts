import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowContactComponent } from './admin-show-contact.component';

describe('AdminShowContactComponent', () => {
  let component: AdminShowContactComponent;
  let fixture: ComponentFixture<AdminShowContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShowContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
