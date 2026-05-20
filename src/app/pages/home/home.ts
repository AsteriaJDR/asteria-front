import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type Direction = 'forward' | 'backward';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly cards = [
    '/assets/home/sunset-temple.png',
    '/assets/home/dragon-castle.png',
    '/assets/home/warrior-valley.png',
  ];

  private static readonly CYCLE_MS = 700;

  positions = signal({ left: 0, center: 1, right: 2 });

  cycling = signal<Direction | null>(null);

  leftImg = computed(() => this.cards[this.positions().left]);
  centerImg = computed(() => this.cards[this.positions().center]);
  rightImg = computed(() => this.cards[this.positions().right]);

  stepForward(): void {
    this.step('forward');
  }

  stepBackward(): void {
    this.step('backward');
  }

  private step(direction: Direction): void {
    if (this.cycling()) return;
    this.cycling.set(direction);
    setTimeout(() => {
      const p = this.positions();
      this.positions.set(
        direction === 'forward'
          ? { left: p.center, center: p.right, right: p.left }
          : { left: p.right, center: p.left, right: p.center },
      );
      this.cycling.set(null);
    }, Home.CYCLE_MS);
  }
}
