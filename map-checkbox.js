class MapCheckbox extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById("map-checkbox-template").content;
        const shadow_root = this.attachShadow({ mode: "open" });
        shadow_root.appendChild(template.cloneNode(true));
    }
}

customElements.define("map-checkbox", MapCheckbox);
