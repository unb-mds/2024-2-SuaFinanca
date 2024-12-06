export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserWithId {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    private readonly password: string,
  ) {}

  getPassword(): string {
    return this.password;
  }
}
