import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MultiSelectSettings } from './multi-select-settings';
import { MultiSelectOption } from './multi-select-option';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit, AfterViewInit {
  @Input()
  settings: MultiSelectSettings = {};

  @Input()
  options: MultiSelectOption[] = [];

  @Output()
  selectionChange = new EventEmitter<MultiSelectOption[]>();

  @ViewChild('optionContainer') optionContainer: ElementRef;

  showOptions = false;

  constructor() {}

  @HostListener('document:click', ['$event', 'optionContainer'])
  onClick(event: MouseEvent, container) {
    console.log(container);
    const clickElement = event.target as HTMLElement;
    if (!this.optionContainer) {
      this.showOptions = false;
      return;
    }
    // console.log(this.optionContainer);
    // const optionNode = this.optionContainer.nativeElement as HTMLElement;
    // const childClicked = clickElement.contains(optionNode);
    // console.log(childClicked);
    // if (!childClicked) {
    //   this.showOptions = false;
    // }
  }

  ngOnInit() {
    console.log(this.optionContainer);
  }

  ngAfterViewInit() {
    console.log(this.optionContainer);
  }

  contentClick() {
    this.showOptions = !this.showOptions;
  }
}
