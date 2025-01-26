export interface UpdateUserReturn {
  user: {
    name: string;
    email: string;
  };
}

export interface UpdateUserResponse {
  message: string;
  user: {
    name: string;
    email: string;
  };
}
