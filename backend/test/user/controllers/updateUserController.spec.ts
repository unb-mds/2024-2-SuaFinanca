import { beforeEach, describe, expect, it, vi } from "vitest";

import { BcryptPassword } from "@/application/utils/hashUtils";
import { HttpRequest } from "@/main/config/helpers/protocol/protocols";
import { InMemoryAuthUserRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryAuthUserRepository";
import { UpdateUserController } from "@/main/controllers/user/updateUserController";
import { UpdateUserParams } from "@/application/interfaces/domain/entities/user/IauthUser";
import { UpdateUserUseCase } from "@/application/useCases/updateUserUseCase";

describe("UpdateUserController", () => {
  let updateUserController: UpdateUserController;
  let updateUserUseCase: UpdateUserUseCase;
  let inMemoryAuthUserRepository: InMemoryAuthUserRepository;
  let bcryptPassword: BcryptPassword;

  beforeEach(() => {
    bcryptPassword = new BcryptPassword();
    inMemoryAuthUserRepository = new InMemoryAuthUserRepository();
    updateUserUseCase = new UpdateUserUseCase(
      inMemoryAuthUserRepository,
      bcryptPassword,
    );
    updateUserController = new UpdateUserController(updateUserUseCase);
  });

  it("should update a user and return success response", async () => {
    // Arrange
    const user = await inMemoryAuthUserRepository.createUser({
      name: "John Doe",
      email: "john@example.com",
      password: "password",
    });

    const httpRequest: HttpRequest<UpdateUserParams> = {
      body: {
        id: user.id,
        name: "John Updated",
        email: "john.updated@example.com",
        password: "newPassword",
      },
    };

    // Act
    const httpResponse = await updateUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      message: "User updated successfully",
      user: {
        name: "John Updated",
        email: "john.updated@example.com",
      },
    });
  });

  it("should return bad request if validation fails", async () => {
    // Arrange
    const user = await inMemoryAuthUserRepository.createUser({
      name: "John Doe",
      email: "john@example.com",
      password: "password",
    });

    const httpRequest: HttpRequest<UpdateUserParams> = {
      body: {
        id: user.id,
        name: "",
        email: "",
        password: "",
      },
    };

    // Act
    const httpResponse = await updateUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe(
      "Name cannot be empty, Invalid email, Email cannot be empty, Password cannot be empty",
    );
  });

  it("should return bad request if user is not found", async () => {
    // Arrange
    await inMemoryAuthUserRepository.createUser({
      name: "John Doe",
      email: "john@example.com",
      password: "password",
    });

    const httpRequest: HttpRequest<UpdateUserParams> = {
      body: {
        id: 999,
        name: "John Doe",
        email: "john@example.com",
        password: "password",
      },
    };

    // Act
    const httpResponse = await updateUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("User not found");
  });

  it("should return bad request if email is invalid", async () => {
    // Arrange
    // Act
    // Assert
    const httpRequest: HttpRequest<UpdateUserParams> = {
      body: {
        id: 1,
        name: "John Doe",
        email: "invalid-email",
        password: "password",
      },
    };

    const httpResponse = await updateUserController.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("Invalid email");
  });

  it.skip("should return bad request if password is too short", async () => {
    // Arrange
    const httpRequest: HttpRequest<UpdateUserParams> = {
      body: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "123",
      },
    };

    // Act
    const httpResponse = await updateUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("Password must be at least");
  });

  it("should return bad request if name is invalid", async () => {
    // Arrange
    const httpRequest: HttpRequest<UpdateUserParams> = {
      body: {
        id: 1,
        name: "",
        email: "john@example.com",
        password: "password",
      },
    };

    // Act
    const httpResponse = await updateUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("Name cannot be empty");
  });

  it("should return server error if useCase throws", async () => {
    // Arrange
    const httpRequest: HttpRequest<UpdateUserParams> = {
      body: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "password",
      },
    };
    vi.spyOn(updateUserUseCase, "execute").mockRejectedValueOnce(new Error());

    // Act
    const httpResponse = await updateUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toBe("Something went wrong.");
  });
});
