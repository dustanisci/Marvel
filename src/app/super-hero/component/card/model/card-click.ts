export interface CardClick {
  id: number;
  typeClick: TypeClick;
}

export enum TypeClick {
  VIEW,
  DELETE
}