import { beforeEach, describe, expect, it, vi } from "vitest";

import { BcryptPassword } from "@/application/utils/hashUtils";
import { CreateUserController } from "@/main/controllers/user/createUserController";
import { CreateUserUseCase } from "@/application/useCases/createUseCases";
import { InMemoryAuthUserRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryAuthUserRepository";
import { UserFactory } from "@/domain/factories/userFactory";

describe("CreateUserController", () => {
  let bcryptPassword: BcryptPassword;
  let userFactory: UserFactory;
  let inMemoryAuthUserRepository: InMemoryAuthUserRepository;
  let createUserUseCase: CreateUserUseCase;
  let createUserController: CreateUserController;

  beforeEach(() => {
    bcryptPassword = new BcryptPassword();
    userFactory = new UserFactory(bcryptPassword);
    inMemoryAuthUserRepository = new InMemoryAuthUserRepository();
    createUserUseCase = new CreateUserUseCase(
      userFactory,
      inMemoryAuthUserRepository,
    );
    createUserController = new CreateUserController(createUserUseCase);
  });

  it("should create a user and return a created response", async () => {
    // Arrange
    const httpRequest = {
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "default",
      },
    };

    // Act
    const httpResponse = await createUserController.handle(httpRequest);

    const responseBody = {
      message: "User created successfully",
      user: {
        name: httpRequest.body.name,
        email: httpRequest.body.email,
      },
    };

    // Assert
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual(responseBody);
  });

  it("should return a bad request when validation fails", async () => {
    // Arrange
    const httpRequest = {
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "",
      },
    };
    // Act
    const httpResponse = await createUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual("Password cannot be empty");
  });

  it("should return an error if a user already exists", async () => {
    // Arrange
    const httpRequest = {
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "default",
      },
    };
    await createUserController.handle(httpRequest);

    // Act
    const httpResponse = await createUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual("User with this email already exists");
  });

  it("should return a server error if an error was thrown", async () => {
    // Arrange
    const httpRequest = {
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "default",
      },
    };
    vi.spyOn(createUserUseCase, "execute").mockRejectedValueOnce(new Error(""));

    // Act
    const httpResponse = await createUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual("Something went wrong.");
  });
});
