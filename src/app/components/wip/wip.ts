import { Component, Input } from '@angular/core';
import { LucideAngularModule, Hammer, Clock } from 'lucide-angular';

@Component({
  selector: 'app-wip',
  templateUrl: './wip.html',
  styleUrl: './wip.css',
  imports: [LucideAngularModule],
})
export class Wip {
  @Input() pageName = '';
  readonly Hammer = Hammer;
  readonly Clock = Clock;
}
