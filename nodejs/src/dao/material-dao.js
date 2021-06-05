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
			throw this._createException(
				`Material with id '${id}' does not exist.`,
				"FAILED_TO_GET_MATERIAL");
		}
	}

	async addMaterial(material) {
		const materials = await this._loadAllMaterials();
		if (this._isDuplicate(materials, material.id)) {
			throw this._createException(
				`Material with id '${material.id}' already exists.`,
				"DUPLICATE_CODE_MATERIAL");
		}
		materials[material.id] = material;
		try {
			await wf(DEFAULT_STORAGE_PATH, JSON.stringify(materials, null, 2));
			return material;
		} catch (error) {
			throw this._createException(
				`Failed to store material with id '${material.id}' to local storage.`,
				"FAILED_TO_STORE_MATERIAL");
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
				throw this._createException(
					`Failed to update material with id '${material.id}' in local storage.`,
					"FAILED_TO_UPDATE_MATERIAL");
			}
		} else {
			throw this._createException(
				`Material with id '${material.id}' does not exist.`,
				"FAILED_TO_GET_MATERIAL");
		}
	}

	async deleteMaterial(id) {
		const materials = await this._loadAllMaterials();
		const recipes = await this._loadAllRecipes();

		if (!materials[id]) {
			throw this._createException(
				`Failed to find material with id '${id}' in local storage.`,
				"MATERIAL_NOT_FOUND");
		}
		for (let recipe in recipes) {
			console.log(recipes[recipe]);
			if (
				recipes[recipe].materials.filter((p) => p.material === id).length > 0
			) {
				throw this._createException(
					`Failed to delete material with id '${id}' because material is in used.`,
					"IN_USE_CANNOT_BE_DELETED");
			}
		}

		delete materials[id];
		try {
			await wf(DEFAULT_STORAGE_PATH, JSON.stringify(materials, null, 2));
			return undefined;
		} catch (error) {
			throw this._createException(
				`Failed to delete material with id '${id}' in local storage.`,
				"FAILED_TO_DELETE_MATERIAL");
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
				throw this._createException(
					"Unable to read from storage. Wrong data format. " + DEFAULT_STORAGE_PATH,
					"FAILED_TO_READ_STORAGE");
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
				throw this._createException(
					"Unable to read from storage. Wrong data format. " + DEFAULT_STORAGE_PATH,
					"FAILED_TO_READ_STORAGE");
			}
		}
		return recipes;
	}

	_isDuplicate(materials, id) {
		return !!materials[id];
	}

	_createException(message, code) {
		const e = new Error(message);
		e.code = code;
		e.message = message
		return e;
	}
}

module.exports = MaterialDao;
