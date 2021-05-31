import { uuid } from "uuidv4"

class Material {
    constructor(name, code) {
        this.id = uuid()
        this.name = name
        this.code = code
    }
}

export default Material