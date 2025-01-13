import {
  CreateCategoryReturn,
  GetCategoryByUserIdReturn,
} from "@/main/config/helpers/protocol/createCategoryProtocols";
import {
  CreateUserParams,
  LoginUserParams,
} from "@/application/interfaces/domain/entities/user/IauthUser";
import {
  CreateUserReturn,
  LoginUserReturn,
} from "../protocol/user/authUserProtocols";

import { CreateCategoryParams } from "@/application/interfaces/domain/entities/category/IcategoryRepository";

export interface ICreateUserUseCase {
  execute(params: CreateUserParams): Promise<CreateUserReturn | string>;
}

export interface ILoginUserUseCase {
  execute(params: LoginUserParams): Promise<LoginUserReturn | string>;
}

export interface ICreateCategoryUseCase {
  execute(params: CreateCategoryParams): Promise<CreateCategoryReturn | string>;
}

export interface IGetCategoriesByUserUseCase {
  execute(userId: number): Promise<GetCategoryByUserIdReturn | string>;
}
