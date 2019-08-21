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
}
