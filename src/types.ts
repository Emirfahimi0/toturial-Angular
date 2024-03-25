import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';

export interface IOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface IProduct {
  id?: number;
  image: string;
  name: string;
  price: string;
  rating: number;
}

export interface IProducts {
  items: IProduct[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface IPaginationParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  page: number;
  perPage: number;
}
