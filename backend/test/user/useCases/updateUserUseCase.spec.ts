import { beforeEach, describe, expect, it } from "vitest";

import { BcryptPassword } from "@/application/utils/hashUtils";
import { InMemoryAuthUserRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryAuthUserRepository";
import { UpdateUserUseCase } from "@/application/useCases/updateUserUseCase";
import { UserFactory } from "@/domain/factories/userFactory";

let bcryptPassword: BcryptPassword;
let authUserRepository: InMemoryAuthUserRepository;
let updateUserUseCase: UpdateUserUseCase;
let userFactory: UserFactory;

describe("UpdateUserUseCase", () => {
  beforeEach(() => {
    bcryptPassword = new BcryptPassword();
    authUserRepository = new InMemoryAuthUserRepository();
    updateUserUseCase = new UpdateUserUseCase(
      authUserRepository,
      bcryptPassword,
    );
    userFactory = new UserFactory(bcryptPassword);
  });

  it("should update user successfully", async () => {
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
        id: "1",
        name: "John Updated",
        email: "johnupdated@example.com",
      },
    });
  });

  it("should return 'User not found' if user does not exist", async () => {
    const params = {
      id: 0,
      name: "John Updated",
      email: "johnupdated@example.com",
      password: "newpassword123",
    };
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
