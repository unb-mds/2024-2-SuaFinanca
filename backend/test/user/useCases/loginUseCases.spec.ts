import { beforeEach, describe, expect, it, vi } from "vitest";

import { BcryptPassword } from "@/application/utils/hashUtils";
import { InMemoryAuthUserRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryAuthUserRepository";
import { LoginUserReturn } from "@/main/config/helpers/protocol/user/authUserProtocols";
import { LoginUserUseCase } from "@/application/useCases/loginUserUseCase";
import { TokenGenerator } from "@/application/interfaces/utils/tokenGenerator";
import { UserFactory } from "@/domain/factories/userFactory";

let bcryptPassword: BcryptPassword;
let userFactory: UserFactory;
let jWTTokenGenerator: TokenGenerator;
let inMemoryAuthUserRepository: InMemoryAuthUserRepository;
let loginUserUseCase: LoginUserUseCase;

describe("LoginUserUseCase", () => {
  const userParams = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "default",
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

    await inMemoryAuthUserRepository.createUser({
      name: userParams.name,
      email: userParams.email,
      password: await bcryptPassword.hash(userParams.password),
    });
  });

  it("should log in a user with valid credentials", async () => {
    // Act
    const result = await loginUserUseCase.execute({
      email: userParams.email,
      password: userParams.password,
    });
    const typedResult = result as LoginUserReturn;

    // Assert
    expect(typedResult.token).toBe("token");
    expect(typedResult.user).toEqual({
      name: userParams.name,
      email: userParams.email,
    });
  });

  it("should return 'User not found' if the email does not exist", async () => {
    // Act
    const result = await loginUserUseCase.execute({
      email: "",
      password: userParams.password,
    });

    // Assert
    expect(result).toBe("User not found");
  });

  it("should return 'Invalid password' if the password is incorrect", async () => {
    const result = await loginUserUseCase.execute({
      email: userParams.email,
      password: "",
    });

    // Assert
    expect(result).toBe("Invalid password");
  });
});
