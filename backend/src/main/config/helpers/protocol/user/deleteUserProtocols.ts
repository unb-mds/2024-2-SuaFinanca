export interface DeleteUserReturn {
  user: {
    name: string;
    email: string;
  };
}

export interface DeleteUserResponse {
  message: string;
  user: {
    name: string;
    email: string;
  };
}
