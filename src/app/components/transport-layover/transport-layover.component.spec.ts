import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportLayoverComponent } from './transport-layover.component';

describe('TransportLayoverComponent', () => {
  let component: TransportLayoverComponent;
  let fixture: ComponentFixture<TransportLayoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportLayoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportLayoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
