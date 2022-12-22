import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KongreImageComponent } from './kongre-image.component';

describe('KongreImageComponent', () => {
  let component: KongreImageComponent;
  let fixture: ComponentFixture<KongreImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KongreImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KongreImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
