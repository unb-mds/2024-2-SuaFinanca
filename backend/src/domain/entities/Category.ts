export interface ICategory {
  name: string;
  userId: number;
}

export interface ICategoryWithId extends ICategory {
  id: number;
}

export class Category {
  constructor(
    public readonly name: string,
    private readonly userId: number,
  ) {}
}
