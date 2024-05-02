export interface Field {
  type: string;
  typeField: string;
  fieldName: string;
  value: string | File;
  required: boolean;
  placeholder: string;
}

export interface IPage {
  nameComponent: string;
  content: { [key: string]: string | File };
}

export interface CreatePage {
  name: string;
  url: string;
  blocks: IPage[];
}

export interface OnePageResponse {
  _id: string;
  name: string;
  components: [{ [key: string]: string }];
  componentType: string[];
}