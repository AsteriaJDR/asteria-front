import { Component, Input } from '@angular/core';
import { Class } from '../../../core/interfaces/class';
import { Race } from '../../../core/interfaces/race';
import { RulesService } from '../../../core/services/rules/rules-service';

@Component({
  selector: 'app-classes-or-races',
  imports: [],
  templateUrl: './classes-or-races.html',
  styleUrl: './classes-or-races.css',
})
export class ClassesOrRaces {
  @Input() isClasses: boolean = true;

  protected classesOrRaces: Class[] | Race[] = [];

  protected selectedClassIndex = 0;
  
    constructor(private rulesService: RulesService) { }
  
    ngOnInit() {
      if (this.isClasses) {
        this.fillClasses();
      } else {
        this.fillRaces();
      }
    }

    fillClasses(): void {
      this.rulesService.getClasses().subscribe({
        next: (classes) => {
          this.classesOrRaces = classes;
        },
        error: (err) => {
          console.error('Error fetching classes:', err);
        }
      });
    }

    fillRaces(): void {
      this.rulesService.getRaces().subscribe({
        next: (races) => {
          this.classesOrRaces = races;
        },
        error: (err) => {
          console.error('Error fetching races:', err);
        }
      });
    }

}