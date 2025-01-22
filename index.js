'use strict';

/* Uzduotis */
// 1. turi buti galimybe koreguoti iraso duomenis, paselectinus irasa pagal jo id.
// 2. galima surasti konkrecia preke pagal jos id (atskiras input). ir surasta preke
// atvaizduoti atskiroje lenteleje (kaip pirkiniu krepseli)
// 3. galima istrinti konkrecia preke pagal jos id. istrinta preke turi pradingti is 
// localStorage ir abieju lenteliu (jei atvaizduojama abiejose). jei tokio input
// neranda - rodyti informacini pranesima

const itemInputCode = document.getElementById('itemCode');
const itemInputName = document.getElementById('itemName');
const itemInputQuantity = document.getElementById('itemQuantity');
const btnNew = document.getElementById('itemEditorBtnNew');
const btnEdit = document.getElementById('itemEditorBtnEdit');
const btnDelete = document.getElementById('itemEditorBtnDelete');
const editorOutputTable = document.getElementById('editorOutputTable');
const itemFinderCode = document.getElementById('itemFinderCode');
const itemFinderBtn = document.getElementById('itemFinderBtn');
const finderOutputTable = document.getElementById("finderOutputTable");

let data = JSON.parse(localStorage.getItem("cartList")) || [];

function createTableRow(item) {
    const tr = document.createElement("tr");
    tr.id = `item${item.id}`;
    const tdCode = document.createElement("td");
    const tdName = document.createElement("td");
    const tdQuantity = document.createElement("td");
    tdCode.innerText = item.id;
    tdName.innerText = item.name;
    tdQuantity.innerText = item.quantity;
    tr.append(tdCode, tdName, tdQuantity);
    return tr;
}

function clearInputs() {
    itemInputCode.value = "";
    itemInputName.value = "";
    itemInputQuantity.value = "";
}

function updateStorage() {
    localStorage.setItem("cartList", JSON.stringify(data));
}

function renderStoredItems() {
    const rows = editorOutputTable.querySelectorAll('tr:not(:first-child)');
    rows.forEach(row => row.remove());
    data.forEach(item => {
        editorOutputTable.appendChild(createTableRow(item));
    });
}

btnNew.addEventListener("click", () => {
    const exists = data.some(item => item.id === Number(itemInputCode.value));
    if(exists) {
        alert("There's an item that has this product code! Please enter the information again.");
        return;
    }
    const newObj = {
        id: Number(itemInputCode.value), 
        name: itemInputName.value, 
        quantity: itemInputQuantity.value
    };

    data.push(newObj);
    updateStorage();
    renderStoredItems();
    clearInputs();
});

btnEdit.addEventListener("click", () => {
    const item = data.find(item => item.id == itemInputCode.value);
    if(item) {
        item.name = itemInputName.value;
        item.quantity = itemInputQuantity.value;
        updateStorage();
        renderStoredItems();
        
        const finderTr = finderOutputTable.querySelector(`#item${item.id}`);
        if(finderTr) {
            finderTr.children[1].innerText = item.name;
            finderTr.children[2].innerText = item.quantity;
        }
        clearInputs();
        alert("Changes applied!");
    } else {
        alert("There's no item with this product code!");
    }
});

btnDelete.addEventListener("click", () => {
    const item = data.find(item => item.id == itemInputCode.value);
    if(item) {
        data = data.filter(el => el.id != itemInputCode.value);
        updateStorage()
        const editorTr = document.querySelector(`#item${itemInputCode.value}`);
        const finderTr = finderOutputTable.querySelector(`#item${itemInputCode.value}`);
        if(editorTr) editorTr.remove();
        if(finderTr) finderTr.remove();
        clearInputs()
    } else {
        alert("There's no item with this product code!");
    }
});

itemFinderBtn.addEventListener("click", () => {
    const item = data.find(item => item.id == itemFinderCode.value);
    if(item) {
        finderOutputTable.appendChild(createTableRow(item));
        itemFinderCode.value = "";
    } else {
        alert("There's no item with this product code!");
    }
});

window.onload = renderStoredItems;
