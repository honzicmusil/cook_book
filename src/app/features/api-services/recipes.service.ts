import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../models";

@Injectable({ providedIn: "root" })
export class RecipesService {
	SERVICE_URL = "http://localhost:3000/recipe";
	constructor(private http: HttpClient) {}

	public getAll() {
		return this.http.get<{
			itemList?: Recipe[];
			error?: string;
		}>(`${this.SERVICE_URL}/list`);
	}

	public delete(id: string) {
		return this.http.delete<Recipe & { error?: string }>(
			`${this.SERVICE_URL}/delete`,
			{
				params: {
					id: id,
				},
			}
		);
	}

	public create(item: Omit<Recipe, "id">) {
		return this.http.post<Recipe & { error?: string }>(
			`${this.SERVICE_URL}/create`,
			item
		);
	}

  public put(item: Omit<Recipe, "id">) {
		return this.http.put<Recipe & { error?: string }>(
			`${this.SERVICE_URL}/update`,
			item
		);
	}

  public get(id: string) {
		return this.http.get<Recipe & { error?: string }>(
			`${this.SERVICE_URL}/get`,
			{
				params: {
					id: id,
				},
			}
		);
	}
}
