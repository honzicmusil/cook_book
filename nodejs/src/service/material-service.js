const { uuid } = require("uuidv4");
const MaterialDao = require("../dao/material-dao");
const Material = require("../model/material");

let materialDao = new MaterialDao();

const list = async (req, res) => {
  let { name } = req.body;
  if (!name || (name && typeof name === "string" && name.length < 30)) {
    try {
      let materialList = await materialDao.getMaterialList(name);
      res
        .status(200)
        .json({ itemList: materialList, total: materialList.length });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.status(400).json({
      error: "Invalid dtoIn",
    });
  }
};

const get = async (req, res) => {
  let { id } = req.body;
  if (id && typeof id === "string" && id.length == 36) {
    try {
      let result = await materialDao.getMaterial(id);
      res.status(200).json(result);
    } catch (e) {
      if (e.code === "FAILED_TO_GET_MATERIAL") {
        res.status(400).json({ error: e });
      } else {
        res.status(500).json({ error: e });
      }
    }
  } else {
    res.status(400).json({
      error: "Invalid dtoIn",
    });
  }
};

const create = async (req, res) => {
  let { name, unit } = req.body;
  if (
    name &&
    typeof name === "string" &&
    name.length < 30 &&
    unit &&
    typeof unit === "string" &&
    unit.length < 10
  ) {
    const material = { name, unit, id: uuid() };

    try {
      let result = await materialDao.addMaterial(material);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      if (e.code === "DUPLICATE_CODE") {
        res.status(400).json({ error: e });
      } else if (e.code === "FAILED_TO_STORE_MATERIAL") {
        res.status(500).json({ error: e });
      } else {
        res.status(500).json({ error: e });
      }
    }
  } else {
    res.status(400).json({
      error: "Invalid dtoIn",
    });
  }
};

const update = async (req, res) => {
  let { id, name, unit } = req.body;
  if (
    id &&
    typeof id === "string" &&
    id.length < 36 &&
    name &&
    typeof name === "string" &&
    name.length < 30 &&
    unit &&
    typeof unit === "string" &&
    unit.length < 10
  ) {
    const material = { id, name, unit };
    try {
      let result = await materialDao.updateMaterial(material);
      res.status(200).json(result);
    } catch (e) {
      if (e.code === "FAILED_TO_GET_MATERIAL") {
        res.status(400).json({ error: e });
      } else if (e.code === "FAILED_TO_UPDATE_MATERIAL") {
        res.status(500).json({ error: e });
      } else {
        res.status(500).json({ error: e });
      }
    }
  } else {
    res.status(400).json({
      error: "Invalid dtoIn",
    });
  }
};

const remove = async (req, res) => {
  let { id } = req.body;
  if (id && typeof id === "string" && id.length < 36) {
    try {
      await materialDao.deleteMaterial(id);
      res.status(200).json({});
    } catch (e) {
      if (e.code === "FAILED_TO_DELETE_MATERIAL") {
        res.status(500).json({ error: e });
      } else {
        res.status(500).json({ error: e });
      }
    }
  } else {
    res.status(400).json({
      error: "Invalid dtoIn",
    });
  }
};

exports.list = list;
exports.get = get;
exports.create = create;
exports.update = update;
exports.remove = remove;
