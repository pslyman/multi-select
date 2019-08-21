import { Component } from '@angular/core';
import { MultiSelectOption } from './multi-select/multi-select-option';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
    { id: '11', label: 'BMW 2002' }
  ];
}
