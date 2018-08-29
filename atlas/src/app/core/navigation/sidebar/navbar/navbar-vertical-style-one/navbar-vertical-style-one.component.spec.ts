import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarVerticalStyleOneComponent } from './navbar-vertical-style-one.component';

describe('NavbarVerticalStyleOneComponent', () => {
  let component: NavbarVerticalStyleOneComponent;
  let fixture: ComponentFixture<NavbarVerticalStyleOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarVerticalStyleOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarVerticalStyleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
