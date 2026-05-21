import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Campaign {
  id: number;
  title: string;
  status: string;
  players: string;
  image: string;
  description: string;
}

interface Story {
  id: number;
  title: string;
  description: string;
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
    {
      id: 1,
      title: 'Légende Steampunk',
      status: 'Ouverte',
      players: '2/6',
      image: '/table1.png',
      description: "Aétheris, continent de métal et de vapeur, s'est effondré le jour où Valérius Kane activa la Foreuse Solaire pour puiser l'énergie du Cœur de gravité. Le Château de Kalausi, arraché à la terre par l'explosion, dérive depuis dans les tourbillons d'Asteria."
    },
    {
      id: 2,
      title: 'Le Phare des Profondeurs',
      status: 'En cours',
      players: '4/6',
      image: '/table2.png',
      description: "Au plus profond des abysses brille « L'Étoile d'En-Bas », le marteau d'un Paladin Nain qui se serait sacrifié pour repousser une invasion de monstres. Derrière la légende se cache en réalité un ancien réacteur géothermique d'une cité steampunk engloutie."
    },
    {
      id: 3,
      title: 'Le Bastion de Cuivre',
      status: 'Fermée',
      players: '6/6',
      image: '/table3.png',
      description: "Un Nain Paladin en armure à vapeur soutint pendant sept jours la voûte d'acier d'une cité-usine effondrée pour laisser fuir son peuple, devenant une statue de métal et de roc. Retrouvez ses vestiges pour récupérer les plaques de son armure réputée impénétrable."
    },
    {
      id: 4,
      title: "L'Ombre du Smog",
      status: 'Ouverte',
      players: '1/6',
      image: '/table4.png',
      description: "Croquemitaine des bas-fonds, un Thérianthrope Moine se bat à mains nues parmi les cheminées et les tuyaux d'une métropole noyée dans le smog. Son monastère est caché tout en haut des plus hautes cheminées, là où l'air redevient pur."
    }
  ];

  stories: Story[] = [
    {
      id: 1,
      title: 'Légende Steampunk',
      description: "Aétheris, continent de métal et de vapeur, s'est effondré le jour où Valérius Kane activa la Foreuse Solaire pour puiser l'énergie du Cœur de gravité. Le Château de Kalausi, arraché à la terre par l'explosion, dérive depuis dans les tourbillons d'Asteria."
    },
    {
      id: 2,
      title: 'Le Phare des Profondeurs',
      description: "Au plus profond des abysses brille « L'Étoile d'En-Bas », le marteau d'un Paladin Nain qui se serait sacrifié pour repousser une invasion de monstres. Derrière la légende se cache en réalité un ancien réacteur géothermique d'une cité steampunk engloutie."
    },
    {
      id: 3,
      title: 'Le Bastion de Cuivre',
      description: "Un Nain Paladin en armure à vapeur soutint pendant sept jours la voûte d'acier d'une cité-usine effondrée pour laisser fuir son peuple, devenant une statue de métal et de roc. Retrouvez ses vestiges pour récupérer les plaques de son armure réputée impénétrable."
    },
    {
      id: 4,
      title: "L'Ombre du Smog",
      description: "Croquemitaine des bas-fonds, un Thérianthrope Moine se bat à mains nues parmi les cheminées et les tuyaux d'une métropole noyée dans le smog. Son monastère est caché tout en haut des plus hautes cheminées, là où l'air redevient pur."
    }
  ];

  selectedCampaign: Campaign | null = null;
  isModalOpen: boolean = false;
  isCreateTableModalOpen: boolean = false;
  isJoinTableModalOpen: boolean = false;
  createTableStep: 'selectStory' | 'fillForm' = 'selectStory'; // Nouvelle propriété
  tableName: string = '';
  selectedStory: Story | null = null;
  joinTableCode: string = '';

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
        image: this.newTable.image || '/table1.png',
        description: this.newTable.description || this.selectedStory.description
      };
      this.campaigns.push(newCampaign);
      this.closeCreateTableModal();
    }
  }

  joinTable(): void {
    this.isJoinTableModalOpen = true;
    this.joinTableCode = '';
  }

  closeJoinTableModal(): void {
    this.isJoinTableModalOpen = false;
    this.joinTableCode = '';
  }

  onJoinCodeInput(event: any): void {
    // Accepter uniquement les chiffres
    const input = event.target.value;
    this.joinTableCode = input.replace(/[^0-9]/g, '').slice(0, 6);
  }

  submitJoinTable(): void {
    if (this.joinTableCode.length === 6) {
      console.log('Rejoindre la table avec le code:', this.joinTableCode);
      // Ajouter la logique pour rejoindre la table avec le code
      this.closeJoinTableModal();
    }
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
