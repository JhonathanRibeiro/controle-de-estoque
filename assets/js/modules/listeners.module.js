import { state } from './../paginate.js';
import { Html } from './selectElement.module.js';
import { update } from './../paginate.js';

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

export { Controls }