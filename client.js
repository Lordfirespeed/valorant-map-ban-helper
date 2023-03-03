let map_select_form;
let map_checkboxes = [];

function on_checkboxes_changed(event) {
    const active_checkboxes = map_checkboxes
        .filter(checkbox => checkbox.offsetParent)

    const checked_states = active_checkboxes
        .map(checkbox => checkbox.checked)

    const number_checked = checked_states.filter(checked => checked).length;

    if (number_checked !== active_checkboxes.length - 1) {
        active_checkboxes.forEach((checkbox) => {
            checkbox.disabled = false;
            checkbox.indeterminate = false;
        })
        return;
    }

    const to_select_index = checked_states.indexOf(false);
    const to_select_checkbox = active_checkboxes[to_select_index];
    to_select_checkbox.disabled = true;
    to_select_checkbox.indeterminate = true;
}

function populate_map_element(index, map) {
    const new_element = document.createElement("map-checkbox");
    new_element.classList.add("form-check");

    if (!map.in_rotation) {
        new_element.classList.add("d-none", "disabled");
    }

    const checkbox_element = document.createElement("input");
    checkbox_element.type = "checkbox";
    checkbox_element.id = `map-${index}-checkbox`;
    checkbox_element.classList.add("form-check-input", "map-checkbox");

    map_checkboxes.push(checkbox_element);

    checkbox_element.addEventListener("change", on_checkboxes_changed);

    const label_element = document.createElement("label");
    label_element.for = checkbox_element.id;
    label_element.innerText = map.name;
    label_element.classList.add("form-check-label");

    new_element.appendChild(checkbox_element);
    new_element.appendChild(label_element);

    map_select_form.appendChild(new_element);
}

async function on_content_loaded() {
    map_select_form = document.getElementById("map-select-form");

    const result = await fetch("map-data.json");

    if (!result.ok) {
        throw new Error(await result.text());
    }

    const map_data = await result.json();
    for (const [index, map] of map_data.entries()) {
        populate_map_element(index, map)
    }
}

addEventListener("DOMContentLoaded", on_content_loaded);