import { describe, expect, it } from "vitest";

import { BcryptPassword } from "@/application/utils/hashUtils";

describe("BcryptPassword", () => {
  const bcryptPassword = new BcryptPassword();

  it("should hash a password correctly", async () => {
    // Arrange
    const password = "Password";

    // Act
    const hashedPassword = await bcryptPassword.hash(password);

    // Assert
    expect(hashedPassword).not.toEqual(password);
  });

  it("should compare a password and its hash correctly", async () => {
    // Arrange
    const password = "Password";
    const hashedPassword = await bcryptPassword.hash(password);

    // Act
    const isMatch = await bcryptPassword.compare(password, hashedPassword);

    // Assert
    expect(isMatch).toEqual(true);
  });

  it("should compare an invalid password and fail", async () => {
    // Arrange
    const password = "Password";
    const wrongPassword = "WrongPassword";
    const hashedPassword = await bcryptPassword.hash(password);

    // Act
    const isMatch = await bcryptPassword.compare(wrongPassword, hashedPassword);

    // Assert
    expect(isMatch).toBe(false);
  });
});
