import {
  CreateCategoryParams,
  UpdateCategoryParams,
} from "@/application/interfaces/domain/entities/category/IcategoryRepository";
import {
  CreateTransactionParams,
  GetRecentTransactionsParams,
  GetUserBalanceParams,
  UpdateTransactionWithCategoryNameParams,
} from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import {
  CreateUserParams,
  LoginUserParams,
} from "@/application/interfaces/domain/entities/user/IauthUser";
import {
  CreateUserReturn,
  LoginUserReturn,
} from "../protocol/user/authUserProtocols";

import { CreateCategoryReturn } from "@/main/config/helpers/protocol/category/createCategoryProtocols";
import { CreateTransactionReturn } from "../protocol/transaction/createTransactionProtocols";
import { DeleteTransactionReturn } from "../protocol/transaction/deleteTransactionProtocols";
import { DeleteUserReturn } from "../protocol/user/deleteUserProtocols";
import { GetCategoryByUserIdReturn } from "@/main/config/helpers/protocol/category/getCategoryProtocols";
import { GetRecentTransactionsReturn } from "../protocol/transaction/getRecentTransactionsProtocols";
import { GetUserBalanceReturn } from "../protocol/transaction/getUserBalanceProtocols";
import { UpdateCategoryReturn } from "../protocol/category/updateCategoryProtocols";
import { UpdateTransactionReturn } from "../protocol/transaction/updateTransactionProtocols";
import { UpdateUserParams } from "@/application/interfaces/domain/entities/user/IauthUser";
import { UpdateUserReturn } from "../protocol/user/updateUserProtocols";

// User
export interface ICreateUserUseCase {
  execute(params: CreateUserParams): Promise<CreateUserReturn | string>;
}

export interface ILoginUserUseCase {
  execute(params: LoginUserParams): Promise<LoginUserReturn | string>;
}

export interface IUpdateUserUseCase {
  execute(params: UpdateUserParams): Promise<UpdateUserReturn | string>;
}

export interface IDeleteUserUseCase {
  execute(id: number): Promise<DeleteUserReturn | string>;
}

// Category
export interface ICreateCategoryUseCase {
  execute(params: CreateCategoryParams): Promise<CreateCategoryReturn | string>;
}

export interface IGetCategoriesByUserUseCase {
  execute(userId: number): Promise<GetCategoryByUserIdReturn | string>;
}

export interface IUpdateCategoryUseCase {
  execute(params: UpdateCategoryParams): Promise<UpdateCategoryReturn | string>;
}

export interface IDeleteCategoryUseCase {
  execute(categoryId: number, userId: number): Promise<void | string>;
}

// Transaction
export interface ICreateTransactionUseCase {
  execute(
    params: CreateTransactionParams,
  ): Promise<CreateTransactionReturn | string>;
}

export interface IGetUserBalanceUseCase {
  execute(params: GetUserBalanceParams): Promise<GetUserBalanceReturn>;
}

export interface IGetRecentTransactionsUseCase {
  execute(
    params: GetRecentTransactionsParams,
  ): Promise<GetRecentTransactionsReturn>;
}

export interface IUpdateTransactionUseCase {
  execute(
    params: UpdateTransactionWithCategoryNameParams,
  ): Promise<UpdateTransactionReturn | string>;
}

export interface IDeleteTransactionUseCase {
  execute(
    transactionId: number,
    userId: number,
  ): Promise<DeleteTransactionReturn | string>;
}
