import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MultiSelectSettings } from './multi-select-settings';
import { MultiSelectOption } from './multi-select-option';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  @Input()
  settings: MultiSelectSettings = {};

  @Input()
  options: MultiSelectOption[] = [];

  @Output()
  selectionChange = new EventEmitter<MultiSelectOption[]>();

  @Output()
  searchChange = new EventEmitter<string>();

  @ViewChild('optionContainer') optionContainer: ElementRef;

  searchControl: FormControl = new FormControl();

  showOptions = false;
  showSearch = false;

  constructor() {}

  @HostListener('document:click', ['$event', 'optionContainer'])
  onClick(event: MouseEvent, container) {
    if (container) {
      const containerElement = container.nativeElement as HTMLElement;
      const clickElement = event.target as HTMLElement;
      if (clickElement.contains(containerElement)) {
        this.showOptions = false;
      }
    }
  }

  ngOnInit() {
    this.searchControl.setValue('');
    this.showSearch = this.settings && this.settings.showSearch === true;
    const debounceNumber = this.settings && this.settings.searchDelay ? this.settings.searchDelay : 0;
    this.searchControl.valueChanges.pipe(debounceTime(debounceNumber)).subscribe(value => {
      this.searchChange.emit(value);
    });
  }

  contentClick() {
    this.showOptions = !this.showOptions;
  }

  selectAll() {
    console.log(this.options) 

  }
    
  updateSelection(option: MultiSelectOption) {
    // need multi-select logic here

    // this is the single select logic
    this.selectionChange.emit([option]);
    if (this.settings && this.settings.closeOnSelect === true) {
      this.showOptions = false;
    }
  }

  clearSearch() {
    this.searchControl.setValue('');
  }
}
