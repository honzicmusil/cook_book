const fs = require("fs");
const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const MATERIAL_STORAGE_PATH = path.join(
	__dirname,
	"..",
	"storage",
	"materials.json"
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
			throw createException(
				`Material with id '${id}' does not exist.`,
				"FAILED_TO_GET_MATERIAL");
		}
	}

	async addMaterial(material) {
		const materials = await this._loadAllMaterials();
		if (this._isDuplicate(materials, material.id)) {
			throw createException(
				`Material with id '${material.id}' already exists.`,
				"DUPLICATE_CODE_MATERIAL");
		}
		materials[material.id] = material;
		try {
			await wf(MATERIAL_STORAGE_PATH, JSON.stringify(materials, null, 2));
			return material;
		} catch (error) {
			throw createException(
				`Failed to store material with id '${material.id}' to local storage.`,
				"FAILED_TO_STORE_MATERIAL");
		}
	}

	async updateMaterial(material) {
		const materials = await this._loadAllMaterials();
		if (materials[material.id]) {
			materials[material.id] = material;
			try {
				await wf(MATERIAL_STORAGE_PATH, JSON.stringify(materials, null, 2));
				return material;
			} catch (error) {
				throw createException(
					`Failed to update material with id '${material.id}' in local storage.`,
					"FAILED_TO_UPDATE_MATERIAL");
			}
		} else {
			throw createException(
				`Material with id '${material.id}' does not exist.`,
				"FAILED_TO_GET_MATERIAL");
		}
	}

	async deleteMaterial(id) {
		const materials = await this._loadAllMaterials();

		if (!materials[id]) {
			throw createException(
				`Failed to find material with id '${id}' in local storage.`,
				"MATERIAL_NOT_FOUND");
		}

		delete materials[id];
		try {
			await wf(MATERIAL_STORAGE_PATH, JSON.stringify(materials, null, 2));
			return undefined;
		} catch (error) {
			throw createException(
				`Failed to delete material with id '${id}' in local storage.`,
				"FAILED_TO_DELETE_MATERIAL");
		}
	}

	async _loadAllMaterials() {
		let materials;
		try {
			materials = JSON.parse(await rf(MATERIAL_STORAGE_PATH));
		} catch (e) {
			if (e.code === "ENOENT") {
				console.info("No storage found, initializing new one...");
				materials = {};
			} else {
				throw createException(
					"Unable to read from storage. Wrong data format. " + MATERIAL_STORAGE_PATH,
					"FAILED_TO_READ_STORAGE");
			}
		}
		return materials;
	}

	_isDuplicate(materials, id) {
		return !!materials[id];
	}
}

module.exports = MaterialDao;
