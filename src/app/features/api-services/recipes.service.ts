import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  SERVICE_URL = 'http://localhost:3000/material';
  constructor(private http: HttpClient) {}

  public get() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get<{
      itemList?: {
        id: string;
        name: string;
        defaultPortions: number,
        ingredients: Ingredient[]
      }[];
      error?: string;
    }>(`${this.SERVICE_URL}/list`, httpOptions);

    // const request: Rest.Request<null> = {
    //   method: 'GET',
    //   url: `${this.SERVICE_URL}/list`,
    // };

    // return this.rest.request<null>(request);
  }

  // public getMaterial(params: { id: string }) {
  //   return this.http.get<
  //     | {
  //         id: string;
  //         name: string;
  //         unit: string;
  //       }[]
  //     | { error: string }
  //   >(`${this.SERVICE_URL}/get`, {
  //     params,
  //   });

  // const request: Rest.Request<null> = {
  //   method: 'GET',
  //   url: `${this.SERVICE_URL}/get`,
  //   params,
  // };

  // return this.rest.request<
  //   null,
  //   | {
  //       id: string;
  //       name: string;
  //       unit: string;
  //     }
  //   | { error: string }
  // >(request);
  // }
}
