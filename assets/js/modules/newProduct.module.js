import { modalAlert } from './modalAlert.module.js'

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
            })
        }
    } catch (error) {
        console.error(error.message);
    }
}

export { setNewProduct }