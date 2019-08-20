interface SearchParam {
  key: string;
  value: string;
}

export class MultiSelectSettings {
  showSearch?: boolean;
  searchURL?: string;
  searchParams?: SearchParam[];
  selectMax?: number;
  selectMin?: number;
  closeOnSelect?: boolean;
}
