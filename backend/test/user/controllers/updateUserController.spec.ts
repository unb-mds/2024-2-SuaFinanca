import { vi, describe, it, beforeEach, expect } from "vitest";
import { UpdateUserController } from "@/main/controllers/user/updateUserController";
import { UpdateUserUseCase } from "@/application/useCases/updateUserUseCase";
import { InMemoryAuthUserRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryAuthUserRepository";
import { HttpRequest } from "@/main/config/helpers/protocol/protocols";
import { UpdateUserParams } from "@/application/interfaces/domain/entities/user/IauthUser";
import { BcryptPassword } from "@/application/utils/hashUtils";

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
      password: "oldpassword",
    });

    const httpRequest: HttpRequest<UpdateUserParams> = {
      body: {
        id: user.id,
        name: "John Updated",
        email: "john.updated@example.com",
        password: "newpassword",
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
    const httpRequest: HttpRequest<UpdateUserParams> = {
      body: {
        id: 1,
        name: "", // empty name should fail validation
        email: "invalid-email",
        password: "pwd",
      },
    };

    // Act
    const httpResponse = await updateUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toContain("Name cannot be empty");
  });

  it("should return bad request if user is not found", async () => {
    // Arrange
    const httpRequest: HttpRequest<UpdateUserParams> = {
      body: {
        id: 999,
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      },
    };

    // Act
    const httpResponse = await updateUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("User not found");
  });

  it("should return server error if an exception is thrown", async () => {
    // Arrange
    const httpRequest: HttpRequest<UpdateUserParams> = {
      body: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      },
    };
    vi.spyOn(updateUserUseCase, "execute").mockRejectedValueOnce(new Error(""));

    // Act
    const httpResponse = await updateUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toBe("Something went wrong.");
  });
});
