import { Component, OnInit } from '@angular/core';
import { RulesService } from '../../core/services/rules-service';

@Component({
  selector: 'app-rules',
  imports: [],
  templateUrl: './rules.html',
  styleUrl: './rules.css',
})
export class Rules implements OnInit {

  constructor(private rulesService: RulesService) { }

  ngOnInit() {
    this.rulesService.getRules().subscribe({
      next: (rules) => {
        console.log('Rules fetched successfully:', rules);
      },
      error: (err) => {
        console.error('Error fetching rules:', err);
      }
    });
  }

}
