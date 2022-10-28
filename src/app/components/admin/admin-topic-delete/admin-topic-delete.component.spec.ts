import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopicDeleteComponent } from './admin-topic-delete.component';

describe('AdminTopicDeleteComponent', () => {
  let component: AdminTopicDeleteComponent;
  let fixture: ComponentFixture<AdminTopicDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTopicDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTopicDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
