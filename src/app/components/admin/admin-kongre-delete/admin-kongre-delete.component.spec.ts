import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKongreDeleteComponent } from './admin-kongre-delete.component';

describe('AdminKongreDeleteComponent', () => {
  let component: AdminKongreDeleteComponent;
  let fixture: ComponentFixture<AdminKongreDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKongreDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminKongreDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
