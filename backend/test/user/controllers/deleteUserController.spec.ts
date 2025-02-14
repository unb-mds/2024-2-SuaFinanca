import { beforeEach, describe, expect, it, vi } from "vitest";

import { DeleteUserController } from "@/main/controllers/user/deleteUserController";
import { DeleteUserUseCase } from "@/application/useCases/user/deleteUserUseCase";
import { HttpRequest } from "@/main/config/helpers/protocol/protocols";
import { InMemoryAuthUserRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryAuthUserRepository";

describe("DeleteUserController", () => {
  let deleteUserController: DeleteUserController;
  let deleteUserUseCase: DeleteUserUseCase;
  let inMemoryAuthUserRepository: InMemoryAuthUserRepository;

  beforeEach(() => {
    inMemoryAuthUserRepository = new InMemoryAuthUserRepository();
    deleteUserUseCase = new DeleteUserUseCase(inMemoryAuthUserRepository);
    deleteUserController = new DeleteUserController(deleteUserUseCase);
  });

  it("should delete a user and return a nice request response", async () => {
    // Arrange
    const userParams = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
    };
    const user = await inMemoryAuthUserRepository.createUser(userParams);
    const httpRequest: HttpRequest<unknown> = {
      body: user.id,
    };

    // Act
    const httpResponse = await deleteUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      message: "User successfully deleted",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  });

  it("should return bad request if user ID is not provided", async () => {
    // Arrange
    const httpRequest: HttpRequest<unknown> = {
      body: null,
    };

    // Act
    const httpResponse = await deleteUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("UserId are required");
  });

  it("should return bad request if user does not exist", async () => {
    // Arrange
    const httpRequest: HttpRequest<unknown> = {
      body: 999,
    };

    // Act
    const httpResponse = await deleteUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("User not found");
  });

  it("should return server error if an exception is thrown", async () => {
    // Arrange
    const httpRequest: HttpRequest<unknown> = {
      body: 1,
    };
    vi.spyOn(deleteUserUseCase, "execute").mockRejectedValueOnce(new Error(""));

    // Act
    const httpResponse = await deleteUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toBe("Something went wrong.");
  });
});
