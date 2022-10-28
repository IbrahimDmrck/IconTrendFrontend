import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopicUpdateComponent } from './admin-topic-update.component';

describe('AdminTopicUpdateComponent', () => {
  let component: AdminTopicUpdateComponent;
  let fixture: ComponentFixture<AdminTopicUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTopicUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTopicUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
