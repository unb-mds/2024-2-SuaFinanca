import { HttpResponse, HttpStatusCode } from "./protocol/protocols";

export const niceRequest = <T>(body: any): HttpResponse<T | string> => ({
  statusCode: HttpStatusCode.NICE_REQUEST,
  body,
});

export const createdRequest = <T>(body: any): HttpResponse<T | string> => ({
  statusCode: HttpStatusCode.CREATED_REQUEST,
  body,
});

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: "Something went wrong.",
  };
};
