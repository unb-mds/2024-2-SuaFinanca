import { describe, expect, it } from "vitest";

import { BcryptPassword } from "@/application/utils/hashUtils";
import { User } from "@/domain/entities/User";
import { UserFactory } from "@/domain/factories/userFactory";

describe("UserFactory", () => {
  const bcryptPassword = new BcryptPassword();
  const userFactory = new UserFactory(bcryptPassword);

  it("should create a user with hashed password", async () => {
    // Arrange
    const userParams = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "default",
    };

    // Act
    const user = await userFactory.createUser(userParams);

    // Assert
    expect(user).toBeInstanceOf(User);
  });

  it("should verify password correctly", async () => {
    // Arrange
    const userParams = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "default",
    };
    const user = await userFactory.createUser(userParams);

    // Act
    const isMatch = await userFactory.verifyPassword(
      userParams.password,
      user.getPassword(),
    );

    // Assert
    expect(isMatch).toBe(true);
  });

  it("should fail to verify password when password does not match", async () => {
    // Arrange
    const userParams = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "default",
    };
    const user = await userFactory.createUser(userParams);
    const wrongPassword = "wrong_password";

    // Act
    const isMatch = await userFactory.verifyPassword(
      wrongPassword,
      user.getPassword(),
    );

    // Assert
    expect(isMatch).toBe(false);
  });
});
