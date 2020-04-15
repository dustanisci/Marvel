import { GalleryResponse } from '../../list/model/list-response';

export interface SuperHero {
  id: number;
  galleries: { [key: number]: GalleryResponse };
  name: string;
  codename: string;
  earth: string;
  job: string;
  genealogy: string;
  race: string;
  team: string;
  firstShow: string;
}

export interface ResponseSuperHero {
  result: SuperHero;
}