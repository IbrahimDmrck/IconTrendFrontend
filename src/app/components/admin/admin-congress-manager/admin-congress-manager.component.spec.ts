import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCongressManagerComponent } from './admin-congress-manager.component';

describe('AdminCongressManagerComponent', () => {
  let component: AdminCongressManagerComponent;
  let fixture: ComponentFixture<AdminCongressManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCongressManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCongressManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
