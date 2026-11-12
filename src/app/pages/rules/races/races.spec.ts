import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { Races } from './races';

describe('Races', () => {
  let component: Races;
  let fixture: ComponentFixture<Races>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Races],
      providers: [provideHttpClient(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Races);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
