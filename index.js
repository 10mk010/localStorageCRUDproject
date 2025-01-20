'use strict';

/* Uzduotis */
// 1. turi buti galimybe koreguoti iraso duomenis, paselectinus irasa pagal jo id.
// 2. galima surasti konkrecia preke pagal jos id (atskiras input). ir surasta preke
// atvaizduoti atskiroje lenteleje (kaip pirkiniu krepseli)
// 3. galima istrinti konkrecia preke pagal jos id. istrinta preke turi pradingti is 
// localStorage ir abieju lenteliu (jei atvaizduojama abiejose). jei tokio input
// neranda - rodyti informacini pranesima

const itemInputCode = document.getElementById("itemCode");
const itemInputName = document.getElementById("itemName");
const itemInputQuantity = document.getElementById("itemQuantity");
const btnNew = document.getElementById('itemEditorBtnNew');
const btnEdit = document.getElementById('itemEditorBtnEdit');
const btnDelete = document.getElementById('itemEditorBtnDelete');
const editorOutput = document.getElementById('editorOutput');
const editorOutputTable = document.getElementById("editorOutputTable");

let data = JSON.parse(localStorage.getItem("cartList")) || [];
const cartList = localStorage.getItem("cartList");

function renderStoredItems() {
    data.forEach(item => {
        const tr = document.createElement("tr");
        tr.id = `item${item.id}`;
        const tdCode = document.createElement("td");
        const tdName = document.createElement("td");
        const tdQuantity = document.createElement("td");
        tdCode.innerText = item.id;
        tdName.innerText = item.name;
        tdQuantity.innerText = item.quantity;
        editorOutputTable.appendChild(tr);
        tr.append(tdCode, tdName, tdQuantity);
    });
}

btnNew.addEventListener("click", () => {
    if(cartList.includes(itemInputCode.value)){
        alert("There's an item that has this product code! Please enter the information again.");
        return;
    };
    const newObj = {id: Number(itemInputCode.value), name: itemInputName.value, quantity: itemInputQuantity.value}
    data.push(newObj);
    localStorage.setItem("cartList", JSON.stringify(data));
    renderStoredItems();
    itemInputCode.value = "";
    itemInputName.value = "";
    itemInputQuantity.value = "";
});

btnEdit.addEventListener("click", () => {
    if(cartList.includes(itemInputCode.value)){
    const item = data.find(item => item.id == itemInputCode.value);
    item.name = itemInputName.value;
    item.quantity = itemInputQuantity.value;
    renderStoredItems();
    itemInputCode.value = "";
    itemInputName.value = "";
    itemInputQuantity.value = "";
    alert("Changes applied!");
    } else {
        alert("There's no item with this product code!")
    }
})

btnDelete.addEventListener("click", () => {
    const item = data.find(item => item.id == itemInputCode.value);
    if(data.includes(item)){
        const index = data.indexOf(item);
        data.splice(index, 1);
        localStorage.setItem("cartList", JSON.stringify(data));
        const tr = document.getElementById(`item${index + 1}`);
        tr.remove();
        alert("Item deleted!");
    } else {
        alert("There's no item with this product code!");
    };

})

const itemFinderCode = document.getElementById("itemFinderCode");
const itemFinderBtn = document.getElementById('itemFinderBtn');
const finderOutput = document.getElementById('finderOutput');
const finderOutputTable = document.getElementById("finderOutputTable");

itemFinderBtn.addEventListener("click", () => {
    const item = data.find(item => item.id == itemFinderCode.value);
    const tr = document.createElement("tr");
    tr.id = `item${item.id}`;
    const tdCode = document.createElement("td");
    const tdName = document.createElement("td");
    const tdQuantity = document.createElement("td");
    tdCode.innerText = item.id;
    tdName.innerText = item.name;
    tdQuantity.innerText = item.quantity;
    finderOutputTable.appendChild(tr);
    tr.append(tdCode, tdName, tdQuantity);
})

