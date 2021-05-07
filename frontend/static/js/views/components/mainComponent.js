import Header from "./Header"

export default class {
    constructor(params) {
        this.config = config

        this.components = {
            'header_component': Header
        }
    }

    getComponents(){
        return this.components
    }
}