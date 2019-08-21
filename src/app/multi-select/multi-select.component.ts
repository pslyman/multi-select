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
  inputName = 'select';

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
  }

  contentClick() {
    this.showOptions = !this.showOptions;
  }

  selectAll() {
    console.log(this.options) 

  }

  isSelected(s:any) {
    return this.selectedItems.findIndex((item) => item.id === s.id) > -1 ? true : false;
   }

  selectSuggestion(s) {
    this.selectedItems.find((item) => item.id === s.id) ? 
    this.selectedItems = this.selectedItems.filter((item) => item.id !== s.id) :
    this.selectedItems.push(s);

    // this.assignToNgModel();
  }

  assignToNgModel() {
    this.selectedItemsString = '';
    this.selectedItems.map((item) => this.selectedItemsString += item.label + ' ');
  }

  deleteSelects(s) {
    this.selectedItems = this.selectedItems.filter((item) => item.id !== s.id);
    // this.assignToNgModel();
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
