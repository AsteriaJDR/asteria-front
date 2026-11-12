import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait fermer le menu mobile par défaut', () => {
    expect(component.isMobileMenuOpen()).toBeFalse();
  });

  it('devrait basculer l\'état du menu mobile', () => {
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBeTrue();
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBeFalse();
  });
});