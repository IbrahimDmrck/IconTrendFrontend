import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KongreComponent } from './kongre.component';

describe('KongreComponent', () => {
  let component: KongreComponent;
  let fixture: ComponentFixture<KongreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KongreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KongreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
