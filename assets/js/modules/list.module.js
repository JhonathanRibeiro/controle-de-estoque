import { state } from './../paginate.js';
import { produto } from './../paginate.js';

class List {

    static create(produto) {
        const dataAtual = new Date();

        var status = '';
        var validade = new Date(produto.validade);
        if (validade < dataAtual) { status = 'btn-secondary' } else { status = 'btn-success' }

        res.innerHTML += `
        <tr class="product">
            <td>
                <button class="btn btn-sm btn-fill btn-round ${status}">
                    ${produto.id}
                    <span hidden class="product_id">${produto.id}</span>
                </button>
            </td>
            <td>${produto.nome}</td>
            <td>${produto.marca}</td>
            <td>R$${produto.precoCusto}</td>
            <td>R$${produto.precoRevenda}</td>
            <td>${produto.qtde}</td>
            <td>${produto.unMedida}</td>
            <td>${produto.validade}</td>
            <td>${produto.codigo}</td>
            <td>
                <button class="btn btn-sm btn-fill btn-warning">
                    <i class="fa fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-fill btn-info">
                    <i class="fa fa-file-text-o"></i>
                </button>
                <button name="${produto.id}" class="delete pe-7s-delete-user btn btn-sm btn-fill btn-danger">
                
                </button>
            </td>
        </tr>`
    }
    static update() {
        res.innerHTML = ""
        let page = state.page - 1
        let start = page * state.perPage
        let end = start + state.perPage

        const paginatedItems = produto.slice(start, end);

        const maxNumbers = paginatedItems.length;

        let list = [];
        let randomNumber;
        let tmp;
        paginatedItems.forEach(List.create)

        for (let i = 0; i < maxNumbers; i++) {
            list[i] = i + 1;
        }

        for (let i = list.length; i;) {
            randomNumber = Math.random() * i-- | 0;
            tmp = list[randomNumber];
            // troca o número aleatório pelo atual
            list[randomNumber] = list[i];
            // troca o atual pelo aleatório
            list[i] = tmp;
        }

        console.log('Maximo lista:', list);
        console.log('Maximo array:', maxNumbers);
    }
    static removeProduct(el) {
        if (el.classList.contains('delete')) { el.parentElement.parentElement.remove(); }
        const produtos = produto;
        produtos.forEach((prod, i) => {
            let id = parseInt(el.name);
            if (id == prod.id) {
                produtos.splice(i, 1);
                localStorage["produtos"] = JSON.stringify(produtos);
                alert(`Produto ${prod.nome} - ${prod.id} excluído com sucesso.`)
                return false;
            }
            location.reload();
        });
    }
}

export { List }