export interface GetCategoryByUserIdReturn {
  categories: {
    name: string;
  }[];
}

export interface GetCategoryByUserIdResponse {
  message: string;
  category: {
    name: string;
  }[];
}
