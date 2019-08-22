import { Component, OnInit } from '@angular/core';
import { MultiSelectOption } from './multi-select/multi-select-option';
import { MultiSelectSettings } from './multi-select/multi-select-settings';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  samplePrompt = 'My Cars';
  sampleSingleOption: MultiSelectOption;
  title = 'multi-select';
  sampleOptions: MultiSelectOption[] = [
    { id: '1', label: 'Ford Galaxy', isSelected: false },
    { id: '2', label: 'VW MicroBus', isSelected: false },
    { id: '3', label: 'Mercury Tracer', isSelected: false },
    { id: '5', label: 'Honda Civic', isSelected: false },
    { id: '4', label: 'Isuzu Trooper', isSelected: false },
    { id: '6', label: 'Ford Freestar', isSelected: false },
    { id: '7', label: 'Nissan Frontier', isSelected: false },
    { id: '8', label: 'Nissan Rogue', isSelected: false },
    { id: '9', label: 'Scion xB', isSelected: false },
    { id: '10', label: 'Fiat X19', isSelected: false },
    { id: '11', label: 'BMW 2002', isSelected: false }
  ];
  sampleRestApiOptions: MultiSelectOption[] = [];
  sampleSettings: MultiSelectSettings = {
    closeOnSelect: true,
    showSearch: false,
    maxScrollHeight: 200,
    selectMax: 1
  };
  multiSelectSettings: MultiSelectSettings = {
    closeOnSelect: false,
    showSearch: true,
    maxScrollHeight: 500,
    selectMax: 5
  };
  allProductInfo: any[] = [];
  compareProducts: any[] = [];
  carImageUrl = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getProducts('Samsung');
  }

  getProducts(query) {
    this.httpClient
      .get(
        'https://api.bestbuy.com/v1/products((search=' +
          query +
          ')&(categoryPath.id=abcat0101000))?' +
          'apiKey=sJqMdK9zu04g3cx39TvA0lW2' +
          '&pageSize=15&format=json'
      )
      .subscribe((data: any) => {
        const products = data.products;
        this.allProductInfo = products;
        const productOptions = products.map(prod => ({ id: prod.sku, label: prod.name, isSelected: false }));
        this.sampleRestApiOptions = productOptions;
      });
  }

  sampleSingleSelect(options: MultiSelectOption[]) {
    this.samplePrompt = options.length > 0 ? options[0].label : 'My Cars';
    this.sampleSingleOption = options.length > 0 ? options[0] : null;
    this.carImageUrl = options.length > 0 ? 'http://www.iamboo.com/misc/cars/' + options[0].id + 'a.jpg' : '';
  }

  sampleMultiSelect(options: MultiSelectOption[]) {
    const foundProducts = [];
    options.forEach(opt => {
      const found = this.allProductInfo.find(prod => prod.sku === opt.id);
      if (found) {
        foundProducts.push(found);
      }
    });
    if (foundProducts.length > 0) {
      this.compareProducts = foundProducts;
    }
  }

  sampleSearch(searchTerm: string) {
    this.getProducts(searchTerm ? searchTerm : 'Samsung');
  }
}
