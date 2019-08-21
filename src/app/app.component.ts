import { Component } from '@angular/core';
import { MultiSelectOption } from './multi-select/multi-select-option';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  samplePrompt = 'My Cars';
  sampleSingleOption: MultiSelectOption;
  title = 'multi-select';
  sampleOptions: MultiSelectOption[] = [
    { id: '1', label: 'Ford Galaxy' },
    { id: '2', label: 'VW MicroBus' },
    { id: '3', label: 'Mercury Tracer' },
    { id: '5', label: 'Honda Accord' },
    { id: '4', label: 'Isuzu Trooper' },
    { id: '6', label: 'Ford Freestar' },
    { id: '7', label: 'Nissan Frontier' },
    { id: '8', label: 'Nissan Rogue' },
    { id: '9', label: 'Scion xB' },
    { id: '10', label: 'Fiat X19' },
    { id: '11', label: 'BMW 2002' },
    { id: '12', label: 'Acura ILX'},
    { id: '13', label: 'Alfa Romeo Geiulia'},
    { id: '14', label: 'BMW 2-Series'},
    { id: '15', label: 'BMW i3'},
    { id: '16', label: 'Buick Cascada'},
    { id: '17', label: 'Buick Regal'},
    { id: '18', label: 'Cadillac ATS'},
    { id: '19', label: 'Chevrolet Blazer'},
    { id: '20', label: 'Chevrolet Corvette'},
    { id: '21', label: 'Chevrolet Equinox'},
    { id: '22', label: 'Chrysler 300'},
    { id: '23', label: 'Dodge Journey'},
    { id: '24', label: 'Ford EcoSport'},
    { id: '25', label: 'Genesis G70'},
    { id: '26', label: 'GMC Canyon'},
    { id: '27', label: 'GMC Yukon'},
    { id: '28', label: 'Honda Oddysey'},
    { id: '29', label: 'Hyundai Accent'},
    { id: '30', label: 'Hyundai Ioniq'},
  ];
  sampleSettings = {
    closeOnSelect: true,
    showSearch: true
  };

  constructor() {}

  sampleSingleSelect(options: MultiSelectOption[]) {
    this.samplePrompt = options[0].label;
    this.sampleSingleOption = options[0];
  }

  sampleSearch(searchTerm: string) {
    console.log(searchTerm);
  }
}
