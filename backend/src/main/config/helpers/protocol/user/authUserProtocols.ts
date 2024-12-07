export interface CreateUserReturn {
  user: {
    name: string;
    email: string;
  };
}

export interface CreateUserResponse {
  message: string;
  user: {
    name: string;
    email: string;
  };
}

export interface LoginUserReturn {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export interface LoginUserResponse {
  message: string;
  token: string;
  user: {
    name: string;
    email: string;
  };
}
