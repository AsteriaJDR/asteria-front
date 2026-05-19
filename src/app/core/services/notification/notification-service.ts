import { Injectable, signal, computed } from '@angular/core';
import { Notification } from '../../interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications = signal<Notification[]>([
    {
      id: '1',
      message: 'Bienvenue sur Asteria !',
      date: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false,
      type: 'success',
    },
    {
      id: '2',
      message: 'Vous avez été invité à rejoindre une table.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: false,
      type: 'info',
    },
    {
      id: '3',
      message: 'La session de ce soir a été annulée.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 48),
      read: true,
      type: 'warning',
    },
  ]);

  readonly all = this.notifications.asReadonly();
  readonly unreadCount = computed(() => this.notifications().filter(n => !n.read).length);

  markAllAsRead(): void {
    this.notifications.update(list => list.map(n => ({ ...n, read: true })));
  }

  markAsRead(id: string): void {
    this.notifications.update(list =>
      list.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }
}
