import { state } from './../paginate.js';
import { Html } from './selectElement.module.js';
import { Controls } from './listeners.module.js';
import { update } from './../paginate.js';

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

export { buttons }