import { Component } from '@angular/core';
import { MultiSelectOption } from './multi-select/multi-select-option';
import { MultiSelectSettings } from './multi-select/multi-select-settings';

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
    { id: '1', label: 'Ford Galaxy', isSelected: false },
    { id: '2', label: 'VW MicroBus', isSelected: false },
    { id: '3', label: 'Mercury Tracer', isSelected: false },
    { id: '5', label: 'Honda Accord', isSelected: false },
    { id: '4', label: 'Isuzu Trooper', isSelected: false },
    { id: '6', label: 'Ford Freestar', isSelected: false },
    { id: '7', label: 'Nissan Frontier', isSelected: false },
    { id: '8', label: 'Nissan Rogue', isSelected: false },
    { id: '9', label: 'Scion xB', isSelected: false },
    { id: '10', label: 'Fiat X19', isSelected: false },
    { id: '11', label: 'BMW 2002', isSelected: false }
  ];
  sampleSettings: MultiSelectSettings = {
    closeOnSelect: true,
    showSearch: true,
    maxScrollHeight: 200,
    selectMax: 1
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
