export interface IAreaItem {
  code: string;
  name: string;
  children?: IAreaItem[] | undefined;
}

export interface IEmitData {
  name: string;
  code: string;
}
