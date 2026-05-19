import { Component } from '@angular/core';
import { Wip } from '../../components/wip/wip';

@Component({
  selector: 'app-home',
  imports: [Wip],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
