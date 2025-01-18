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
const itemFinderCode = document.getElementById("itemFinderCode");
const btnNew = document.getElementById('itemEditorBtnNew');
const btnEdit = document.getElementById('itemEditorBtnEdit');
const btnDelete = document.getElementById('itemEditorBtnDelete');
const itemFinderBtn = document.getElementById('itemFinderBtn')
const editorOutput = document.getElementById('editorOutput');
const finderOutput = document.getElementById('finderOutput');
const editorOutputTable = document.getElementById("editorOutputTable");
const finderOutputTable = document.getElementById("finderOutputTable");

let data = [
    { id: 1, name: "Pienas", quantity: "2l"},
    { id: 2, name: "Obuoliai", quantity: "2kg"}
]
function readAll(){
    localStorage.setItem("cartList", JSON.stringify(data));
    const cartList = localStorage.getItem("cartList")

    btnNew.addEventListener("click", () => {
        if(itemInputCode.value in JSON.parse(cartList)){
            alert("An item with this product code is already in the table!");
            return;
        } else if (itemInputName.value in JSON.parse(cartList)){
            alert("An item that goes by this name is already in the table!");
            return;
        }
        const newItem = {id: itemInputCode.value, name: itemInputName.value, quantity: itemInputQuantity.value};
        data.push(newItem)
        const tr = document.createElement("tr");
        tr.id = `item${itemInputCode.value}`;
        const tdCode = document.createElement("td");
        const tdName = document.createElement("td");
        const tdQuantity = document.createElement("td");
        tdCode.innerText = data[itemInputCode.value - 1].id;
        tdName.innerText = data[itemInputCode.value - 1].name;
        tdQuantity.innerText = data[itemInputCode.value - 1].quantity;
        editorOutputTable.appendChild(tr);
        tr.append(tdCode, tdName, tdQuantity);
    });

    btnDelete.addEventListener("click", () => {
        localStorage.clear()
    })
};

readAll();