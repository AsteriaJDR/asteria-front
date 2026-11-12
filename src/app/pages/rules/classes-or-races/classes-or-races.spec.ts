import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ClassesOrRaces } from './classes-or-races';

describe('ClassesOrRaces', () => {
  let component: ClassesOrRaces;
  let fixture: ComponentFixture<ClassesOrRaces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesOrRaces],
      providers: [provideHttpClient()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesOrRaces);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
