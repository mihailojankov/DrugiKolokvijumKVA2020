import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodaciOKorisnikuComponent } from './podaci-okorisniku.component';

describe('PodaciOKorisnikuComponent', () => {
  let component: PodaciOKorisnikuComponent;
  let fixture: ComponentFixture<PodaciOKorisnikuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodaciOKorisnikuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodaciOKorisnikuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
