import Recipe from "../model/recipe"

const list = async (req, res) => {
    try {
        const newRecipe = req.body;
        res.status(200).json({});
    }
    catch (e) {
        res.status(200).json({exception: e});
    }
}

const create = async (req, res) => {
    try {
        const newRecipe = req.body;
        res.status(200).json({});
    }
    catch (e) {
        res.status(200).json({exception: e});
    }
}

const update = async (req, res) => {
    try {
        const newRecipe = req.body;
        res.status(200).json({});
    }
    catch (e) {
        res.status(200).json({exception: e});
    }
}

const remove = async (req, res) => {
    try {
        const newRecipe = req.body;
        res.status(200).json({});
    }
    catch (e) {
        res.status(200).json({exception: e});
    }
}

exports.list = list
exports.create = create
exports.update = update
exports.remove = remove
