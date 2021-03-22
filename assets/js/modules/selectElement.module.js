
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

export { Html, selectAll }