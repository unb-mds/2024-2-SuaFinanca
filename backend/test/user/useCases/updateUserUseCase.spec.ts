import { beforeEach, describe, expect, it } from "vitest";

import { BcryptPassword } from "@/application/utils/hashUtils";
import { InMemoryAuthUserRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryAuthUserRepository";
import { UpdateUserUseCase } from "@/application/useCases/updateUserUseCase";

let bcryptPassword: BcryptPassword;
let authUserRepository: InMemoryAuthUserRepository;
let updateUserUseCase: UpdateUserUseCase;

describe("UpdateUserUseCase", () => {
  beforeEach(() => {
    bcryptPassword = new BcryptPassword();
    authUserRepository = new InMemoryAuthUserRepository();
    updateUserUseCase = new UpdateUserUseCase(
      authUserRepository,
      bcryptPassword,
    );
  });

  it("should return correct user format without id", async () => {
    await authUserRepository.createUser({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    const params = {
      id: 1,
      name: "John Updated",
      email: "johnupdated@example.com",
    };
    const result = await updateUserUseCase.execute(params);

    expect(result).toEqual({
      user: {
        name: "John Updated",
        email: "johnupdated@example.com",
      },
    });
  });

  it("should keep original email if not provided in update", async () => {
    await authUserRepository.createUser({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    const params = {
      id: 1,
      name: "John Updated",
    };
    const result = await updateUserUseCase.execute(params);

    expect(result).toEqual({
      user: {
        name: "John Updated",
        email: "john@example.com",
      },
    });
  });

  it("should keep original name if not provided in update", async () => {
    await authUserRepository.createUser({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    const params = {
      id: 1,
      email: "johnupdated@example.com",
    };
    const result = await updateUserUseCase.execute(params);

    expect(result).toEqual({
      user: {
        name: "John Doe",
        email: "johnupdated@example.com",
      },
    });
  });

  it("should return 'User not found' for non-existent user", async () => {
    const params = { id: 2 };
    const result = await updateUserUseCase.execute(params);

    expect(result).toBe("User not found");
  });

  it("should hash the password if provided", async () => {
    await authUserRepository.createUser({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    const params = { id: 1, password: "newpassword123" };
    await updateUserUseCase.execute(params);

    const updatedUser = await authUserRepository.findUserById(1);
    if (updatedUser) {
      const isPasswordHashed = await bcryptPassword.compare(
        "newpassword123",
        updatedUser.password,
      );
      expect(isPasswordHashed).toBe(true);
    } else {
      throw new Error("User not found after update");
    }
  });
});
