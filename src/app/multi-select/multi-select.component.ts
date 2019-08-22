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
    if (this.settings && this.settings.maxScrollHeight) {
      const parentElement = this.optionContainer.nativeElement as HTMLElement;
      const scrollElement = parentElement.querySelector('ul') as HTMLElement;
      scrollElement.style.maxHeight = this.settings.maxScrollHeight + 'px';
    }
  }

  contentClick() {
    this.showOptions = !this.showOptions;
  }

  toggleAll() {}

  updateSelection(option: MultiSelectOption) {
    if (option.isSelected !== true && this.settings.selectMax === 1) {
      this.options.forEach(thisOpt => {
        thisOpt.isSelected = false;
      });
    }
    option.isSelected = !option.isSelected;
    const selected = this.options.filter(opt => opt.isSelected);
    this.selectionChange.emit(selected);
    if (this.settings && this.settings.closeOnSelect === true) {
      this.showOptions = false;
    }
  }

  clearSearch() {
    this.searchControl.setValue('');
  }
}
