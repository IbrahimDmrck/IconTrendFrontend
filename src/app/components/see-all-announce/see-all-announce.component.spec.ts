import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllAnnounceComponent } from './see-all-announce.component';

describe('SeeAllAnnounceComponent', () => {
  let component: SeeAllAnnounceComponent;
  let fixture: ComponentFixture<SeeAllAnnounceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeAllAnnounceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAllAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
