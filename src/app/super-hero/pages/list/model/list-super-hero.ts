export interface ListSuperHero {
  id: number;
  name: string;
  codename: string;
  urlCover: string;
  earth: string;
}

export interface ListResult {
  result: ListSuperHero[];
  totalPages: number;
  totalElements: number;
  numberOfElements:number;
}
