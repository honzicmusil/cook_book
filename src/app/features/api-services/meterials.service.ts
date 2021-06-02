import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Material } from "../models";

@Injectable({ providedIn: "root" })
export class MaterialService {
	SERVICE_URL = "http://localhost:3000/material";
	constructor(private http: HttpClient) {}

	public getAll() {
		return this.http.get<{
			itemList?: Material[];
			error?: string;
		}>(`${this.SERVICE_URL}/list`);
	}

	public create(item: Omit<Material, "id">) {
		return this.http.post<Material & { error?: string }>(
			`${this.SERVICE_URL}/create`,
			item
		);
	}

	public put(item: Omit<Material, "id">) {
    console.log(item);
		return this.http.put<Material & { error?: string }>(
			`${this.SERVICE_URL}/update`,
			item
		);
	}
	public delete(id: string) {
		return this.http.delete<Material & { error?: string }>(
			`${this.SERVICE_URL}/delete`,
			{
				params: {
					id: id,
				},
			}
		);
	}

	public get(id: string) {
		return this.http.get<Material & { error?: string }>(
			`${this.SERVICE_URL}/get`,
			{
				params: {
					id: id,
				},
			}
		);
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
