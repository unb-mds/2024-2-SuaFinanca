import { beforeEach, describe, expect, it } from "vitest";

import { BcryptPassword } from "@/application/utils/hashUtils";
import { InMemoryAuthUserRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryAuthUserRepository";
import { UpdateUserUseCase } from "@/application/useCases/user/updateUserUseCase";

describe("UpdateUserUseCase", () => {
  let bcryptPassword: BcryptPassword;
  let inMemoryAuthUserRepository: InMemoryAuthUserRepository;
  let updateUserUseCase: UpdateUserUseCase;

  beforeEach(() => {
    bcryptPassword = new BcryptPassword();
    inMemoryAuthUserRepository = new InMemoryAuthUserRepository();
    updateUserUseCase = new UpdateUserUseCase(
      inMemoryAuthUserRepository,
      bcryptPassword,
    );

    inMemoryAuthUserRepository.createUser({
      name: "John Doe",
      email: "john@example.com",
      password: "password",
    });
  });

  it("should return correct user format without id", async () => {
    // Arrange
    const params = {
      id: 1,
      name: "John Updated",
      email: "johnupdated@example.com",
    };

    // Act
    const result = await updateUserUseCase.execute(params);

    // Assert
    expect(result).toEqual({
      user: {
        name: "John Updated",
        email: "johnupdated@example.com",
      },
    });
  });

  it("should keep original email if not provided in update", async () => {
    // Arrange
    const params = {
      id: 1,
      name: "John Updated",
    };

    // Act
    const result = await updateUserUseCase.execute(params);

    // Assert
    expect(result).toEqual({
      user: {
        name: "John Updated",
        email: "john@example.com",
      },
    });
  });

  it("should keep original name if not provided in update", async () => {
    // Arrange
    const params = {
      id: 1,
      email: "johnupdated@example.com",
    };

    // Act
    const result = await updateUserUseCase.execute(params);

    // Assert
    expect(result).toEqual({
      user: {
        name: "John Doe",
        email: "johnupdated@example.com",
      },
    });
  });

  it("should throw an error if email is already in use", async () => {
    // Arrange
    inMemoryAuthUserRepository.createUser({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password",
    });

    const params = {
      id: 1,
      email: "jane@example.com",
    };

    // Act
    const result = await updateUserUseCase.execute(params);

    // Assert
    expect(result).toBe("Email already in use");
  });

  it("should return 'User not found' for non-existent user", async () => {
    // Arrange
    const params = { id: 2 };

    // Act
    const result = await updateUserUseCase.execute(params);

    // Assert
    expect(result).toBe("User not found");
  });

  it("should hash the password if provided", async () => {
    // Arrange
    const params = { id: 1, password: "newPassword" };
    await updateUserUseCase.execute(params);
    const updatedUser = await inMemoryAuthUserRepository.findUserById(1);

    // Act
    const isPasswordHashed = await bcryptPassword.compare(
      "newPassword",
      updatedUser!.password,
    );

    // Assert
    expect(isPasswordHashed).toBe(true);
  });
});
