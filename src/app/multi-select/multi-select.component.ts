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
  /* MultiSelectSettings is piping for later use, potentially to help inject the component with a few options */
  @Input()
  settings: MultiSelectSettings = {};

  @Input()
  options: MultiSelectOption[] = [];

  @Output()
  searchChange = new EventEmitter<string>();

  @ViewChild('optionContainer') optionContainer: ElementRef;

  searchControl: FormControl = new FormControl();

  showOptions = false;
  showSearch = false;
  selectedItems: MultiSelectOption[] = [];
  selectedItemsString: string = '';
  overflow = false;
  selectAllToggle = false;

  /* will be imported in */
  inputNameDefault = "Select"
  inputName = '';
  
  
  /* To adjust max number of chips */
  maxCount = 4;

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
    this.inputName = this.inputNameDefault;
    this.searchControl.setValue('');
    this.showSearch = this.settings && this.settings.showSearch === true;

    if (this.selectedItems.length === this.options.length ) {
      this.selectAllToggle = true; 
    }
    const debounceNumber = this.settings && this.settings.searchDelay ? this.settings.searchDelay : 0;
    this.searchControl.valueChanges.pipe(debounceTime(debounceNumber)).subscribe(value => {
      this.searchChange.emit(value);
    });
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

    this.chipEmpty(); 
    this.chipOverflow()
  }

  isSelected(option:any) {
    return this.selectedItems.findIndex((item) => item.id === option.id) > -1 ? true : false;
   }

  selectOption(option) {
    this.selectedItems.find((item) => item.id === option.id) ? 
    this.selectedItems = this.selectedItems.filter((item) => item.id !== option.id) :
    this.selectedItems.push(option);
    console.log(this.selectedItems);
    this.chipEmpty(); 
    this.chipOverflow()
  }


  deleteSelects(option) {
    this.selectedItems = this.selectedItems.filter((item) => item.id !== option.id);

    

    if (this.selectedItems.length > 1) {
      this.inputName = this.inputNameDefault;
    }
    this.chipEmpty();
    this.chipOverflow()
  }

  clearSearch() {
    
    this.searchControl.setValue('');

  }

  chipEmpty() {
    if (this.selectedItems.length === 0) {  
      this.inputName = this.inputNameDefault;
    } 
    if (this.selectedItems.length !== 0) {
        this.inputName = '';
      }
  }

  chipOverflow() {
    if (this.selectedItems.length >= this.maxCount) {
      this.overflow = true;
    }
    if (this.selectedItems.length < this.maxCount) {
      this.overflow = false;
    }
  }
}
