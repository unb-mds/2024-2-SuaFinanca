export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T;
}
export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
  userId?: any;
}

export enum HttpStatusCode {
  NICE_REQUEST = 200,
  CREATED_REQUEST = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
