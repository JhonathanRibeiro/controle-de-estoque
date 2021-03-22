import { modalAlert } from './modalAlert.module.js';
import { validity } from './validity.module.js';
import { validadeProduto, nome } from './elements.module.js';

function setNewProduct(product_id, validade, produto, marca, fornecedor, precoCusto,
    precoRevenda, qtde, unmedida, codigo) {
    try {
        let novoProduto = {
            id: product_id,
            validade: validade,
            nome: produto,
            marca: marca,
            fornecedor: fornecedor,
            precoCusto: precoCusto,
            precoRevenda: precoRevenda,
            qtde: qtde,
            unMedida: unmedida,
            codigo: codigo
        }
        if (typeof (Storage) !== "undefined") {
            let produtos = localStorage.getItem("produtos");
            if (produtos == null ? produtos = [] : produtos = JSON.parse(produtos))
                produtos.push(novoProduto);

            localStorage.setItem("produtos", JSON.stringify(produtos))

            modalAlert({
                message: `Foram cadastradas com sucesso ${qtde} ${unmedida} do produto ${produto}!`,
                type: 'success'
            }, setTimeout(() => {
                modalAlert({ message: '', type: '' }).style.opacity = 0;
            }, 4500))

            setTimeout(()=>{
                validity(validadeProduto, nome.value)
            }, 4500);
        }


    } catch (error) {
        console.error(error.message);
    }
}

export { setNewProduct }