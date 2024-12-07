import { beforeEach, describe, expect, it, vi } from "vitest";

import { BcryptPassword } from "@/application/utils/hashUtils";
import { InMemoryAuthUserRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryAuthUserRepository";
import { JWTTokenGenerator } from "@/application/utils/authUtils";
import { LoginUserController } from "@/main/controllers/user/loginUserController";
import { LoginUserUseCase } from "@/application/useCases/loginUserUseCase";
import { UserFactory } from "@/domain/factories/userFactory";

let bcryptPassword: BcryptPassword;
let userFactory: UserFactory;
let jWTTokenGenerator: JWTTokenGenerator;
let inMemoryAuthUserRepository: InMemoryAuthUserRepository;
let loginUserUseCase: LoginUserUseCase;
let loginUserController: LoginUserController;

describe("LoginUserController", () => {
  const userParams = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "default",
  };

  const httpRequest = {
    body: {
      email: "john.doe@example.com",
      password: "default",
    },
  };

  beforeEach(async () => {
    bcryptPassword = new BcryptPassword();
    userFactory = new UserFactory(bcryptPassword);

    jWTTokenGenerator = {
      generateToken: vi.fn().mockReturnValue("token"),
      verifyToken: vi.fn().mockReturnValue("1"),
    };

    inMemoryAuthUserRepository = new InMemoryAuthUserRepository();
    loginUserUseCase = new LoginUserUseCase(
      userFactory,
      jWTTokenGenerator,
      inMemoryAuthUserRepository,
    );
    loginUserController = new LoginUserController(loginUserUseCase);

    await inMemoryAuthUserRepository.createUser({
      name: userParams.name,
      email: userParams.email,
      password: await bcryptPassword.hash(userParams.password),
    });
  });

  it("should return bad request if no body is provided", async () => {
    // Arrange
    const httpRequest = {
      body: null,
    };

    // Act
    const httpResponse = await loginUserController.handle(httpRequest.body!);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toBe("Something went wrong.");
  });

  it("should return bad request if use case returns an error string", async () => {
    // Arrange
    vi.spyOn(loginUserUseCase, "execute").mockResolvedValue("");

    // Act
    const httpResponse = await loginUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("");
  });

  it("should return nice request if login is successful", async () => {
    // Arrange
    const responseBody = {
      message: "User logged in successfully",
      token: "token",
      user: {
        name: userParams.name,
        email: userParams.email,
      },
    };

    // Act
    const httpResponse = await loginUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(responseBody);
  });

  it("should return serverError if an exception is thrown", async () => {
    // Arrange
    vi.spyOn(loginUserUseCase, "execute").mockRejectedValueOnce("");

    // Act
    const httpResponse = await loginUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toBe("Something went wrong.");
  });
});
