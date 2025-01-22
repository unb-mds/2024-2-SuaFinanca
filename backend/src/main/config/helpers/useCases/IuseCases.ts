import {
  CreateCategoryParams,
  UpdateCategoryParams,
} from "@/application/interfaces/domain/entities/category/IcategoryRepository";
import {
  CreateUserParams,
  LoginUserParams,
} from "@/application/interfaces/domain/entities/user/IauthUser";
import {
  CreateUserReturn,
  LoginUserReturn,
} from "../protocol/user/authUserProtocols";

import { CreateCategoryReturn } from "@/main/config/helpers/protocol/category/createCategoryProtocols";
import { CreateTransactionParams } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { CreateTransactionReturn } from "../protocol/transaction/createTransactionProtocols";
import { DeleteUserReturn } from "../protocol/user/deleteUserProtocols";
import { GetCategoryByUserIdReturn } from "@/main/config/helpers/protocol/category/getCategoryProtocols";
import { UpdateCategoryReturn } from "../protocol/category/updateCategoryProtocols";

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

export interface ICreateTransactionUseCase {
  execute(
    params: CreateTransactionParams,
  ): Promise<CreateTransactionReturn | string>;
}

export interface IDeleteUserUseCase {
  execute(id: number): Promise<DeleteUserReturn | string>;
}

export interface IDeleteCategoryUseCase {
  execute(categoryId: number, userId: number): Promise<void | string>;
}

export interface IUpdateCategoryUseCase {
  execute(params: UpdateCategoryParams): Promise<UpdateCategoryReturn | string>;
}
