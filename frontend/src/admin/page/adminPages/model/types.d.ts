export interface Field {
  type: string;
  typeField: string;
  fieldName: string;
  value: string;
  required: boolean;
  placeholder: string;
}

export interface IPage {
  nameComponent: string;
  content: { [key: string]: string };
}

export interface CreateEditPage {
  name: string;
  url: string;
  blocks: IPage[];
}

export interface OnePageResponse {
  _id: string;
  name: string;
  url: string;
  components: [{ [key: string]: string }];
  componentType: string[];
}

export interface AllPagesCRM {
  _id: string;
  name: string;
  url: string;
}

export interface Fields {
  [key: string]: Field;
}

export interface IChooseComponent {
  name: string;
  url: string;
}

export interface IDeleteComponents {
  componentId: string;
  link: string;
  pageId: string;
  index: number;
}
