const dataAtual = new Date();
let res = document.querySelector('#res');
let produtos = localStorage.getItem("produtos");
let produto = JSON.parse(produtos)
//-------------------------------------------------------------------------------------
let perPage = 5;
const state = {
    page: 1,
    perPage: perPage,
    totalPage: Math.ceil(produto.length / perPage),
    maxVisibleButtons: 5
}
const html = {
    get(element) {
        return document.querySelector(element);
    }
}

const controls = {
    next() {
        state.page++
        const lastPage = state.page > state.totalPage
        //se for a última página
        if (lastPage) {
            state.page--
        }
    },
    prev() {
        state.page--
        if (state.page < 1) {
            state.page++
        }
    },
    goTo(page) {
        if (page < 1) {
            page = 1
        }
        state.page = +page
        if (page > state.totalPage) {
            state.page = state.totalPage
        }
    },
    createListeners() {
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1)
            update();
        })

        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPage)
            update();
        })

        html.get('.next').addEventListener('click', () => {
            controls.next();
            update();
        })

        html.get('.prev').addEventListener('click', () => {
            controls.prev();
            update();
        })
    }
}

const list = {
    create(produto) {
        var status = '';
        var validade = new Date(produto.validade);
        if (validade < dataAtual) { status = 'btn-secondary' } else { status = 'btn-success' }
        res.innerHTML += `
        <tr>
            <td>
                <button class="btn btn-sm btn-fill btn-round ${status}"></button>
            </td>
            <td>${produto.nome}</td>
            <td>${produto.marca}</td>
            <td>${produto.fornecedor}</td>
            <td>R$${produto.precoCusto}</td>
            <td>R$${produto.precoRevenda}</td>
            <td>${produto.qtde}</td>
            <td>${produto.unMedida}</td>
            <td>${produto.validade}</td>
            <td>
                <button class="btn btn-sm btn-fill btn-warning">
                    <i class="fa fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-fill btn-info">
                    <i class="fa fa-file-text-o"></i>
                </button>
                <button id="delete" class="btn btn-sm btn-fill btn-danger">
                    <i class="fa fa-times"></i>
                </button>
            </td>
        </tr>`
    },
    update() {
        res.innerHTML = ""
        let page = state.page - 1
        let start = page * state.perPage
        let end = start + state.perPage

        const paginatedItems = produto.slice(start, end);

        paginatedItems.forEach(list.create)
        console.log(paginatedItems)
    }
}

const buttons = {
    element: html.get('.pagination .page'),
    create(number){
        const btnList = document.createElement('li');
        const btnLink = document.createElement('a');
        btnList.classList.add('page-item');
        btnLink.classList.add('page-link');
        
        const list = btnList.appendChild(btnLink);
        
        btnLink.innerHTML = number
        
        if (state.page == number) {btnLink.classList.add('active');}

        list.addEventListener('click', (event)=>{
            const page = event.target.innerText
            controls.goTo(page)
            update()
        });
        buttons.element.appendChild(list)
    },
    update(){
        buttons.element.innerHTML = "";
        const {maxLeft, maxRight} = buttons.maxButtonsVisible();

        for (let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page)
        }
    },
    maxButtonsVisible() {
        const { maxVisibleButtons } = state
        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2));
        let maxRight = (state.page + Math.floor(maxVisibleButtons/2))

        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = maxVisibleButtons
        }
        if (maxRight > state.totalPage) {
            maxLeft = state.totalPage - (maxVisibleButtons - 1)
            maxRight = state.totalPage

            if(maxLeft < 1) maxLeft = 1
        }
        return {maxLeft, maxRight}
    }
}

function update() {
    list.update()
    buttons.update()
}

function init() {
    update();
    controls.createListeners();
}

init()