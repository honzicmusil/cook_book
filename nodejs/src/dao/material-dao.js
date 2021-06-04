const fs = require("fs");
const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(
	__dirname,
	"..",
	"storage",
	"materials.json"
);
const DEFAULT_RECIPES_STORAGE_PATH = path.join(
	__dirname,
	"..",
	"storage",
	"recipes.json"
);

class MaterialDao {
	async getMaterialList(name) {
		const materials = await this._loadAllMaterials();
		let materialList = [];
		for (let id in materials) {
			if (
				!name ||
				materials[id].name.toLowerCase().includes(name.toLowerCase())
			) {
				materialList.push(materials[id]);
			}
		}
		return materialList;
	}

	async getMaterial(id) {
		const materials = await this._loadAllMaterials();
		if (materials[id]) {
			return materials[id];
		} else {
			const e = new Error(`Material with id '${id}' does not exist.`);
			e.code = "FAILED_TO_GET_MATERIAL";
			throw e;
		}
	}

	async addMaterial(material) {
		const materials = await this._loadAllMaterials();
		if (this._isDuplicate(materials, material.id)) {
			const e = new Error(`Material with id '${material.id}' already exists.`);
			e.code = "DUPLICATE_CODE";
			throw e;
		}
		materials[material.id] = material;
		try {
			await wf(DEFAULT_STORAGE_PATH, JSON.stringify(materials, null, 2));
			return material;
		} catch (error) {
			const e = new Error(
				`Failed to store material with id '${material.id}' to local storage.`
			);
			e.code = "FAILED_TO_STORE_MATERIAL";
			throw e;
		}
	}

	async updateMaterial(material) {
		const materials = await this._loadAllMaterials();
		if (materials[material.id]) {
			materials[material.id] = material;
			try {
				await wf(DEFAULT_STORAGE_PATH, JSON.stringify(materials, null, 2));
				return material;
			} catch (error) {
				const e = new Error(
					`Failed to update material with id '${material.id}' in local storage.`
				);
				e.code = "FAILED_TO_UPDATE_MATERIAL";
				throw e;
			}
		} else {
			const e = new Error(`Material with id '${material.id}' does not exist.`);
			e.code = "FAILED_TO_GET_MATERIAL";
			throw e;
		}
	}

	async deleteMaterial(id) {
		const materials = await this._loadAllMaterials();
		const recipes = await this._loadAllRecipes();

		if (!materials[id]) {
			const e = new Error(
				`Failed to find material with id '${id}' in local storage.`
			);
			e.code = "NOT_FOUND";
			throw e;
		}
		for (let recipe in recipes) {
			console.log(recipes[recipe]);
			if (
				recipes[recipe].materials.filter((p) => p.material == id).length > 0
			) {
				const e = new Error(
					`Failed to delete material with id '${id}' bacause material is in used.`
				);
				e.code = "IN_USE_CANNOT_BE_DELETED";
				throw e;
			}
		}

		delete materials[id];
		try {
			await wf(DEFAULT_STORAGE_PATH, JSON.stringify(materials, null, 2));
			return undefined;
		} catch (error) {
			const e = new Error(
				`Failed to delete material with id '${id}' in local storage.`
			);
			e.code = "FAILED_TO_DELETE_MATERIAL";
			throw e;
		}
	}

	async _loadAllMaterials() {
		let materials;
		try {
			materials = JSON.parse(await rf(DEFAULT_STORAGE_PATH));
		} catch (e) {
			if (e.code === "ENOENT") {
				console.info("No storage found, initializing new one...");
				materials = {};
			} else {
				throw new Error(
					"Unable to read from storage. Wrong data format. " +
						DEFAULT_STORAGE_PATH
				);
			}
		}
		return materials;
	}

	async _loadAllRecipes() {
		let recipes;
		try {
			recipes = JSON.parse(await rf(DEFAULT_RECIPES_STORAGE_PATH));
		} catch (e) {
			if (e.code === "ENOENT") {
				console.info("No storage found, initializing new one...");
				recipes = {};
			} else {
				throw new Error(
					"Unable to read from storage. Wrong data format. " +
						DEFAULT_STORAGE_PATH
				);
			}
		}
		return recipes;
	}

	_isDuplicate(materials, id) {
		return !!materials[id];
	}
}

module.exports = MaterialDao;
