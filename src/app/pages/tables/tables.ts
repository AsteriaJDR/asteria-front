import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Campaign {
  id: number;
  title: string;
  status: string;
  players: string;
  image: string;
}

interface Story {
  id: number;
  title: string;
}

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tables.html',
  styleUrls: ['./tables.css']
})

export class Tables {
  campaigns: Campaign[] = [
    { id: 1, title: 'Campagne n°1', status: 'Ouverte', players: '2/6', image: '/table1.png' },
    { id: 2, title: 'Campagne n°2', status: 'En cours', players: '4/6', image: '/table2.png' },
    { id: 3, title: 'Campagne n°3', status: 'Fermée', players: '6/6', image: '/table3.png' },
    { id: 4, title: 'Campagne n°4', status: 'Ouverte', players: '1/6', image: '/table4.png' }
  ];

  stories: Story[] = [
    { id: 1, title: 'Histoire N°1' }
  ];

  selectedCampaign: Campaign | null = null;
  isModalOpen: boolean = false;
  isCreateTableModalOpen: boolean = false;
  tableName: string = '';
  selectedStory: Story | null = null;

  createTable(): void {
    this.isCreateTableModalOpen = true;
  }

  closeCreateTableModal(): void {
    this.isCreateTableModalOpen = false;
    this.tableName = '';
  }

  submitCreateTable(): void {
    this.closeCreateTableModal();
  }

  joinTable(): void {
    console.log('Rejoindre une table');
  }

  openCampaign(c: Campaign): void {
    this.selectedCampaign = c;
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCampaign = null;
  }
}
