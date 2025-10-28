export interface FilterMeta {
  fieldName: string;
  value: any;
  matchMode: string; // 'contains', 'equals', 'startsWith', etc.
}

export interface FilterDictionary {
  [key: string]: FilterMeta | FilterMeta[];
}