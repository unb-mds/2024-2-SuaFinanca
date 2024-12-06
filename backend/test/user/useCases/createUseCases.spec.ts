import { beforeEach, describe, expect, it } from "vitest";

import { BcryptPassword } from "@/application/utils/hashUtils";
import { CreateUserUseCase } from "@/application/useCases/createUseCases";
import { InMemoryAuthUserRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryAuthUserRepository";
import { UserFactory } from "@/domain/factories/userFactory";

describe("CreateUserUseCase", () => {
  let bcryptPassword: BcryptPassword;
  let userFactory: UserFactory;
  let inMemoryAuthUserRepository: InMemoryAuthUserRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    bcryptPassword = new BcryptPassword();
    userFactory = new UserFactory(bcryptPassword);
    inMemoryAuthUserRepository = new InMemoryAuthUserRepository();
    createUserUseCase = new CreateUserUseCase(
      userFactory,
      inMemoryAuthUserRepository,
    );
  });

  it("should create a new user if email does not exist", async () => {
    // Arrange
    const userParams = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "default",
    };

    // Act
    const result = await createUserUseCase.execute(userParams);

    // Assert
    expect(result).toEqual({
      user: {
        name: userParams.name,
        email: userParams.email,
      },
    });
  });

  it("should return null if user already exists", async () => {
    // Arrange
    const userParams = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "default",
    };
    await createUserUseCase.execute(userParams);

    // Act
    const result = await createUserUseCase.execute(userParams);

    // Assert
    expect(result).toBe("User with this email already exists");
  });
});
