import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  positions = signal({ left: 0, center: 1, right: 2 });

  cycling = signal<'left' | 'right' | 'rotate' | null>(null);

  leftImg = computed(() => this.cards[this.positions().left]);
  centerImg = computed(() => this.cards[this.positions().center]);
  rightImg = computed(() => this.cards[this.positions().right]);

  clickLeft(): void {
    if (this.cycling()) return;
    this.cycling.set('left');
    setTimeout(() => {
      const p = this.positions();
      this.positions.set({ left: p.center, center: p.left, right: p.right });
    }, 250);
    setTimeout(() => this.cycling.set(null), 500);
  }

  clickRight(): void {
    if (this.cycling()) return;
    this.cycling.set('right');
    setTimeout(() => {
      const p = this.positions();
      this.positions.set({ left: p.left, center: p.right, right: p.center });
    }, 250);
    setTimeout(() => this.cycling.set(null), 500);
  }

  clickCenter(): void {
    if (this.cycling()) return;
    this.cycling.set('rotate');
    setTimeout(() => {
      const p = this.positions();
      this.positions.set({ left: p.right, center: p.left, right: p.center });
    }, 300);
    setTimeout(() => this.cycling.set(null), 600);
  }
}
