import { Component } from '@angular/core';
import { RulesService } from '../../../core/services/rules/rules-service';
import { Class } from '../../../core/interfaces/class';

@Component({
  selector: 'app-classes',
  imports: [],
  templateUrl: './classes.html',
  styleUrl: './classes.css',
})
export class Classes {

  protected classes: Class[] = [];

  protected selectedClassIndex = 0;

  constructor(private rulesService: RulesService) { }

  ngOnInit() {
    this.rulesService.getClasses().subscribe({
      next: (classes) => {
        console.log('Classes fetched successfully:', classes);
        this.classes = classes;
      },
      error: (err) => {
        console.error('Error fetching classes:', err);
      }
    });
  }

}