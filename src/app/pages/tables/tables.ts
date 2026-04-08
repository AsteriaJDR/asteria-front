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
    {id: 1, title: 'Campagne n°1', status: 'Ouverte', players: '2/6', image: '/table1.png'},
    {id: 2, title: 'Campagne n°2', status: 'En cours', players: '4/6', image: '/table2.png'},
    {id: 3, title: 'Campagne n°3', status: 'Fermée', players: '6/6', image: '/table3.png'},
    {id: 4, title: 'Campagne n°4', status: 'Ouverte', players: '1/6', image: '/table4.png'}
  ];

  stories: Story[] = [
    {id: 1, title: 'Histoire N°1'}
  ];

  selectedCampaign: Campaign | null = null;
  isModalOpen: boolean = false;
  isCreateTableModalOpen: boolean = false;
  createTableStep: 'selectStory' | 'fillForm' = 'selectStory'; // Nouvelle propriété
  tableName: string = '';
  selectedStory: Story | null = null;

  // Propriétés pour le formulaire de création de table
  newTable = {
    title: '',
    maxPlayers: 6,
    description: '',
    image: ''
  };

  createTable(): void {
    this.isCreateTableModalOpen = true;
    this.createTableStep = 'selectStory'; // Commencer par la sélection d'histoire
    this.resetForm();
  }

  closeCreateTableModal(): void {
    this.isCreateTableModalOpen = false;
    this.createTableStep = 'selectStory';
    this.resetForm();
  }

  resetForm(): void {
    this.tableName = '';
    this.selectedStory = null;
    this.newTable = {
      title: '',
      maxPlayers: 6,
      description: '',
      image: ''
    };
  }

  // Passer à l'étape du formulaire après sélection d'histoire
  proceedToFormStep(): void {
    if (this.selectedStory) {
      this.createTableStep = 'fillForm';
    }
  }

  // Retourner à la sélection d'histoire
  backToStorySelection(): void {
    this.createTableStep = 'selectStory';
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newTable.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitCreateTable(): void {
    if (this.newTable.title && this.newTable.description && this.selectedStory) {
      console.log('Création de la table:', {
        ...this.newTable,
        story: this.selectedStory
      });
      // Ajouter la table aux campagnes
      const newCampaign: Campaign = {
        id: Math.max(...this.campaigns.map(c => c.id), 0) + 1,
        title: this.newTable.title,
        status: 'Ouverte',
        players: `0/${this.newTable.maxPlayers}`,
        image: this.newTable.image || '/table1.png'
      };
      this.campaigns.push(newCampaign);
      this.closeCreateTableModal();
    }
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

  toggleStorySelection(story: Story): void {
    if (this.selectedStory?.id === story.id) {
      this.selectedStory = null;
    } else {
      this.selectedStory = story;
    }
  }
}
