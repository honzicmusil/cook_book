import { uuid } from "uuidv4"

class Recipe {
    constructor(name, code, description, preparationLength, materials) {
        this.id = uuid()
        this.name = name
        this.description = description
        this.preparationLength = preparationLength
        this.materials = materials
    }
}

export default Recipe