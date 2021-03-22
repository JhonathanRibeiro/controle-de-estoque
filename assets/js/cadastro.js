import { uniqueID } from './modules/uniqueID.module.js';
import { setNewProduct } from './modules/newProduct.module.js';
import { modalAlert } from './modules/modalAlert.module.js';
import {validadeProduto,nome,fornecedor,precoCusto,precoRevenda,qtde,codigo,unMedida,marca,product_id} from './modules/elements.module.js';

let produtos = localStorage.getItem("produtos");
let produto = JSON.parse(produtos);

if (produto == null) { produto = 1 }

export const prazoMinValidade = 10;
export const prazoMaxValidade = 30;

const Form = {
    getValidate() {
        if (nome.value.trim() == '') {
            modalAlert({
                message: `Atenção! O campo <b>descrição</b> é obrigatório.`,
                type: 'warning'
            }, setTimeout(() => {
                modalAlert({ message: '', type: '' }).style.opacity = 0;
            }, 3500))
        } else if (precoCusto.value.trim() == '') {
            modalAlert({
                message: `Atenção! Informe o <b>preço de custo</b> do produto.`,
                type: 'warning'
            }, setTimeout(() => {
                modalAlert({ message: '', type: '' }).style.opacity = 0;
            }, 3500))
        } else {
            let id = uniqueID();
            product_id.setAttribute('data-key', parseInt(id));

           setTimeout(setNewProduct(
                parseInt(product_id.getAttribute('data-key')),
                validadeProduto,
                nome.value,
                marca.value,
                fornecedor.value,
                parseFloat(precoCusto.value).toFixed(2),
                parseFloat(precoRevenda.value).toFixed(2),
                parseInt(qtde.value),
                unMedida.value,
                parseInt(codigo.value)
            ), 2000);
        }
    }
}

export { Form }