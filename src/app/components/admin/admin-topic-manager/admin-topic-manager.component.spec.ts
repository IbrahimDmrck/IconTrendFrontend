import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopicManagerComponent } from './admin-topic-manager.component';

describe('AdminTopicManagerComponent', () => {
  let component: AdminTopicManagerComponent;
  let fixture: ComponentFixture<AdminTopicManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTopicManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTopicManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
