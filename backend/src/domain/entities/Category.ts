export interface ICategory {
  name: string;
  userId: number;
}

export interface ICategoryWithId extends ICategory {
  id: number;
}
