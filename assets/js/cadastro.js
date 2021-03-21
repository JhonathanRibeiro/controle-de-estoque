import { uniqueID } from './modules/uniqueID.module.js';
import { setNewProduct } from './modules/newProduct.module.js';
import { modalAlert } from './modules/modalAlert.module.js';
import { validity } from './modules/validity.module.js';

let produtos = localStorage.getItem("produtos");
let produto = JSON.parse(produtos)

if (produto == null) { produto = 1 }
export const prazoMinValidade = 10;
export const prazoMaxValidade = 30;

const Form = {
    getValidate() {
        const validadeProduto = document.querySelector('[type=date]#validade').value
        const nome = document.querySelector('#descricao');
        const fornecedor = document.querySelector('#fornecedor');
        const precoCusto = document.querySelector('#preco-custo');
        const precoRevenda = document.querySelector('#preco-revenda');
        const qtde = document.querySelector('#quantidade');
        const codigo = document.querySelector('#cod_barras');
        const unMedida = document.querySelector('#un-medida');
        const marca = document.querySelector('#marca');
        const product_id = document.querySelector('.product_id');

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
            let id = uniqueID(produto);

            product_id.setAttribute('data-key', parseInt(id))

            validity(validadeProduto, nome.value)

            setNewProduct(
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
            );
        }
    },
}

export { Form }