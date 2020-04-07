export interface ListReponse {
  content: ListSuperHeroResponse[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}

export interface ListSuperHeroResponse {
  id: number;
  name: string;
  codename: string;
  galleries: { [key: number]: GalleryResponse };
  earth: string;
}

export interface GalleryResponse {
  id: number;
  url: string;
}