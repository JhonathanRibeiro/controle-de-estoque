const data = new Date();
const prazoMinValidade = 10;
const prazoMaxValidade = 30;

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

        if (nome.value.trim() == '') {
            this.getModalAlert({
                message: `Atenção! O campo descrição é obrigatório.`,
                type: 'warning'
            })
        } else if (precoCusto.value.trim() == '') {
            this.getModalAlert({
                message: `Atenção! Informe o preço do produto.`,
                type: 'warning'
            })
        } else {
            this.getValidity(validadeProduto, nome.value)

            Form.setNewProduct(
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
    setNewProduct(validade, produto, marca, fornecedor, precoCusto, precoRevenda, qtde, unmedida, codigo) {
        let novoProduto = {
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
            this.getModalAlert({
                message: `Foram cadastradas com sucesso ${qtde} ${unmedida} do produto ${produto}!`,
                type: 'success'
            })
            console.log("produtos: ", produtos);
        }
    },
    getValidity(validade, nome) {
        const validadeProd = new Date(validade);
        const diff = Math.abs(data.getTime() - validadeProd.getTime())
        const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
        if (data > validadeProd) {
            this.getModalAlert({
                message: `O produto ${nome} venceu à ${dias} dias`,
                type: 'danger'
            })
        } else {
            this.getModalAlert({
                message: `O produto ${nome} irá vencer em ${dias} dias`,
                type: 'warning'
            })
        }
        data.setDate(data.getDate())
    },
    getModalAlert({ message, type }) {
        var modal = document.querySelector('.modalAlert');
        modal.innerHTML = `
        <div 
            class="col-xs-11 col-sm-4 alert alert-${type} alert-with-icon animated fadeInDown"
            data-notify="container" 
            data-notify-position="top-right"
            role="alert" 
            style="display: inline-block; margin: 0px auto; position: fixed; transition: all 0.5s ease-in-out 0s; z-index: 1031; top: 20px; right: 20px;">
            <span data-notify="icon" class="pe-7s-bell"></span> 
            <span data-notify="title"></span> 
            <span data-notify="message">
                ${message}
            </span>
        </div>
        `;
        setTimeout(() => {
            modal.style.opacity = 0;
            modal.style.opacity = 1;
        }, 2500)
    }
}
