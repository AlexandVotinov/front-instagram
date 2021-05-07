import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("instagram");
    }

    async getHtml() {
        return `
            <div>home</div>
        `;
    }
}