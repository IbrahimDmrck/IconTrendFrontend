import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressDetailsComponent } from './congress-details.component';

describe('CongressDetailsComponent', () => {
  let component: CongressDetailsComponent;
  let fixture: ComponentFixture<CongressDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongressDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
