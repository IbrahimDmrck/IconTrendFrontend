import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKongreAddComponent } from './admin-kongre-add.component';

describe('AdminKongreAddComponent', () => {
  let component: AdminKongreAddComponent;
  let fixture: ComponentFixture<AdminKongreAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKongreAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminKongreAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
