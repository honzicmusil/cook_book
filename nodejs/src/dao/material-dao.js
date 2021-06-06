const fs = require("fs");
const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// creating path to file storage
const MATERIAL_STORAGE_PATH = path.join(
	__dirname,
	"..",
	"storage",
	"materials.json"
);

// Data access object class for materials
class MaterialDao {

	// function returns material based on the given id
	async getMaterial(id) {
		// we load all the materials from the file
		const materials = await this._loadAllMaterials();
		// we check if material is present
		if (materials[id]) {
			// if yes, we return it
			return materials[id];
		} else {
			// if not, we log it and throw exception
			throw await createException(
				`Material with id '${id}' does not exist.`,
				"FAILED_TO_GET_MATERIAL");
		}
	}

	// function which returns all materials or filtered ones based on the name parameter
	async getMaterialList(filter) {
		// we load all the materials from the file
		const materials = await this._loadAllMaterials();

		// init of the empty return array
		let materialList = [];

		for (let id in materials) {
			// we filter records based of the given string against name parameter
			if (!filter || materials[id].name.toLowerCase().includes(filter.toLowerCase())) {
				// if the filter is empty or it matches the filter we put record into return array
				materialList.push(materials[id]);
			}
		}
		return materialList;
	}

	// function adds material to the storage file
	async addMaterial(material) {
		// we load all materials from the file
		const materials = await this._loadAllMaterials();
		// we check if the material is already present in the file
		if (this._isDuplicate(materials, material.id)) {
			// if there is a such record, we log it and throw exception
			throw await createException(
				`Material with id '${material.id}' already exists.`,
				"DUPLICATE_CODE_MATERIAL");
		}

		// material is added to the structure
		materials[material.id] = material;

		try {
			// we write it back to the storage file
			await wf(MATERIAL_STORAGE_PATH, JSON.stringify(materials, null, 2));
			return material;
		} catch (error) {
			// In case of error we log the error and throw the exception
			throw await createException(
				`Failed to store material with id '${material.id}' to local storage.`,
				"FAILED_TO_STORE_MATERIAL");
		}
	}

	// function updates material
	async updateMaterial(material) {
		// we load all materials from the file
		const materials = await this._loadAllMaterials();

		// if material is present in the file we assign a new object to its id
		if (materials[material.id]) {
			materials[material.id] = material;
			try {
				// we write it back to the storage file
				await wf(MATERIAL_STORAGE_PATH, JSON.stringify(materials, null, 2));
				return material;
			} catch (error) {
				// In case of error we log the error and throw the exception
				throw await createException(
					`Failed to update material with id '${ material.id }' in local storage.`,
					"FAILED_TO_UPDATE_MATERIAL");
			}
		} else {
			// if there is no such record we log it and throw the exception
			throw await createException(
				`Material with id '${ material.id }' does not exist.`,
				"FAILED_TO_GET_MATERIAL");
		}
	}

	// function deletes material based on given id
	async deleteMaterial(id) {
		// we load all materials
		const materials = await this._loadAllMaterials();

		// check if material exists, if not, we log an error and throw exception
		if (!materials[id]) {
			throw await createException(
				`Failed to find material with id '${ id }' in local storage.`,
				"MATERIAL_NOT_FOUND");
		}

		// deleting material from the structure
		delete materials[id];
		try {
			// writing whole structure without deleted record to the storage file
			await wf(MATERIAL_STORAGE_PATH, JSON.stringify(materials, null, 2));
			return undefined;
		} catch (error) {
			// In case of error we log the error and throw the exception
			throw await createException(
				`Failed to delete material with id '${id}' in local storage.`,
				"FAILED_TO_DELETE_MATERIAL");
		}
	}

	// function loads all materials from the storage file
	async _loadAllMaterials() {
		let materials;
		try {
			// loading all materials based on the given file storage path
			materials = JSON.parse(await rf(MATERIAL_STORAGE_PATH));
		} catch (e) {
			// in case there is no file yet, we create a new material structure
			if (e.code === "ENOENT") {
				console.info("No storage found, initializing new one...");
				materials = {};
			} else {
				// In case of any other error we log the error and throw the exception
				throw await createException(
					"Unable to read from storage. Wrong data format. " + MATERIAL_STORAGE_PATH,
					"FAILED_TO_READ_STORAGE");
			}
		}
		return materials;
	}

	// function check if the if the storage file contains duplication
	_isDuplicate(materials, id) {
		return !!materials[id];
	}
}

// whole class is exported from the module
module.exports = MaterialDao;
