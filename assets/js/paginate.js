
const dataAtual = new Date();
let produtos = localStorage.getItem("produtos");
let produto = JSON.parse(produtos)
let res = document.querySelector('#res');

if (produto === null) { res.innerHTML = `Estoque vazio` }

let perPage = 5;

const state = {
    page: 1,
    perPage: perPage,
    totalPage: Math.ceil(produto.length / perPage),
    maxVisibleButtons: 5
}

class Html {
    static get(element) {
        return document.querySelector(element);
    }
}

class selectAll {
    static get(element) {
        return document.querySelectorAll(element);
    }
}

const qtde = Html.get('#qtde-products');
qtde.innerHTML = produto.length

class Controls {
    static next() {
        state.page++
        const lastPage = state.page > state.totalPage
        if (lastPage) { state.page-- }
    }
    static prev() {
        state.page--
        if (state.page < 1) {
            state.page++
        }
    }
    static goTo(page) {
        if (page < 1) {
            page = 1
        }
        state.page = +page
        if (page > state.totalPage) {
            state.page = state.totalPage
        }
    }
    static createListeners() {
        Html.get('.first').addEventListener('click', () => {
            Controls.goTo(1)
            update();
        })

        Html.get('.last').addEventListener('click', () => {
            Controls.goTo(state.totalPage)
            update();
        })

        Html.get('.next').addEventListener('click', () => {
            Controls.next();
            update();
        })

        Html.get('.prev').addEventListener('click', () => {
            Controls.prev();
            update();
        })
    }
}

class List {
    static create(produto) {
        var status = '';
        var validade = new Date(produto.validade);
        if (validade < dataAtual) { status = 'btn-secondary' } else { status = 'btn-success' }

        res.innerHTML += `
        <tr class="product">
            <td>
                <button class="btn btn-sm btn-fill btn-round ${status}">
                    ${produto.id}
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
                <button class="delete pe-7s-delete-user btn btn-sm btn-fill btn-danger"></button>
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
    static delete(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}

class Store {
    static removeProduct(id) {
        const produtos = produto;
        produtos.forEach((prod, i) => {
            if (prod.id === id) {
                produtos.splice(i, 1);
                console.log('prodcodigo', prod.codigo)
            }
            alert(`Produto ${prod.nome} - ${prod.codigo} excluído com sucesso.`)
            // console.log('produto: ', codigo)
            // document.location.reload();
        });
        localStorage.removeItem('produtos', JSON.stringify(produtos));
    }
}

const buttons = {
    element: Html.get('.pagination .page'),
    create(number) {
        const btnList = document.createElement('li');
        const btnLink = document.createElement('a');
        btnList.classList.add('page-item');
        btnLink.classList.add('page-link');

        const list = btnList.appendChild(btnLink);

        btnLink.innerHTML = number

        if (state.page == number) { btnLink.classList.add('active'); }

        list.addEventListener('click', (event) => {
            const page = event.target.innerText
            Controls.goTo(page)
            update()
        });
        buttons.element.appendChild(list)
    },
    update() {
        buttons.element.innerHTML = "";
        const { maxLeft, maxRight } = buttons.maxButtonsVisible();

        for (let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page)
        }
    },
    maxButtonsVisible() {
        const { maxVisibleButtons } = state
        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2));
        let maxRight = (state.page + Math.floor(maxVisibleButtons / 2))

        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = maxVisibleButtons
        }
        if (maxRight > state.totalPage) {
            maxLeft = state.totalPage - (maxVisibleButtons - 1)
            maxRight = state.totalPage

            if (maxLeft < 1) maxLeft = 1
        }
        return { maxLeft, maxRight }
    }
}

function update() {
    List.update()
    buttons.update()
}

//remove produto
Html.get('#res').addEventListener('click', (e) => {
    Store.removeProduct(e.target.parentElement.parentElement)
    List.delete(e.target)
    console.log(this); //esse é dono do evento pois removi o bind e estou usando a expressão de funcao
    console.log(e.target.parentElement.parentElement);
    console.log(e.currentTarget);
    //previousElementSibling.textContent
});

function init() {
    update();
    Controls.createListeners();
}

init()
