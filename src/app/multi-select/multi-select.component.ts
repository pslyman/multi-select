import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MultiSelectSettings } from './multi-select-settings';
import { MultiSelectOption } from './multi-select-option';

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

  @ViewChild('optionContainer') optionContainer: ElementRef;

  showOptions = false;
  showSearch = false;
  selectedItems = [];
  selectedItemsString = '';
  inputName = 'Select from options';
  selectAllToggle = false;

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
    this.showSearch = this.settings && this.settings.showSearch === true;

    if (this.selectedItems.length === this.options.length ) {
      this.selectAllToggle = true; 
    }
  }

  contentClick() {
    this.showOptions = !this.showOptions;

  }

  selectAll() {

    if (this.selectedItems.length == this.options.length) {
      this.selectedItems = [];
    } 
    if (!this.selectAllToggle) {
      this.selectedItems = this.options;
    }
  }

  isSelected(option:any) {
    return this.selectedItems.findIndex((item) => item.id === option.id) > -1 ? true : false;
   }

  selectOption(option) {
    this.selectedItems.find((item) => item.id === option.id) ? 
    this.selectedItems = this.selectedItems.filter((item) => item.id !== option.id) :
    this.selectedItems.push(option);
    console.log(this.selectedItems);
    this.clearNgModel(); 
  }

  clearNgModel() {
    this.inputName = '';

  }

  deleteSelects(option) {
    this.selectedItems = this.selectedItems.filter((item) => item.id !== option.id);
    this.clearNgModel();
  }
    
  updateSelection(option: MultiSelectOption) {
    // need multi-select logic here

    // this is the single select logic
    this.selectionChange.emit([option]);
    if (this.settings && this.settings.closeOnSelect === true) {
      this.showOptions = false;
    }
  }
}
