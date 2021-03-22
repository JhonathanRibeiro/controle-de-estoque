import { List } from './modules/list.module.js';
import { buttons } from './modules/paginateButtons.module.js';
import { Html } from './modules/selectElement.module.js';
import { Controls } from './modules/listeners.module.js';

let produtos = localStorage.getItem("produtos");
export const produto = JSON.parse(produtos)
let res = document.querySelector('#res');

if (produto === null) { res.innerHTML = `Estoque vazio` }

let perPage = 5;

export const state = {
    page: 1,
    perPage: perPage,
    totalPage: Math.ceil(produto.length / perPage),
    maxVisibleButtons: 5
}

const qtde = Html.get('#qtde-products');
qtde.innerHTML = produto.length

export function update() {
    List.update()
    buttons.update()
}
//remove produto
Html.get('#res').addEventListener('click', (e) => {
    List.removeProduct(e.target)
});

function init() {
    update();
    Controls.createListeners();
}

init()