import { beforeEach, describe, expect, it } from "vitest";

import { DeleteUserUseCase } from "@/application/useCases/deleteUserUseCase";
import { InMemoryAuthUserRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryAuthUserRepository";

describe("DeleteUserUseCase", () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let inMemoryAuthUserRepository: InMemoryAuthUserRepository;

  beforeEach(() => {
    inMemoryAuthUserRepository = new InMemoryAuthUserRepository();
    deleteUserUseCase = new DeleteUserUseCase(inMemoryAuthUserRepository);
  });

  it("should delete a user if they exist", async () => {
    // Arrange
    const userParams = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
    };
    const user = await inMemoryAuthUserRepository.createUser(userParams);

    // Act
    const result = await deleteUserUseCase.execute(user.id);

    // Assert
    expect(result).toEqual({
      user: {
        name: user.name,
        email: user.email,
      },
    });
    const deletedUser = await inMemoryAuthUserRepository.findUserById(user.id);
    expect(deletedUser).toBeNull();
  });

  it("should return 'User not found' if the user does not exist", async () => {
    // Act
    const result = await deleteUserUseCase.execute(999);

    // Assert
    expect(result).toBe("User not found");
  });
});
