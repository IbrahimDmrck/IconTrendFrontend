import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKongreUpdateComponent } from './admin-kongre-update.component';

describe('AdminKongreUpdateComponent', () => {
  let component: AdminKongreUpdateComponent;
  let fixture: ComponentFixture<AdminKongreUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKongreUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminKongreUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
