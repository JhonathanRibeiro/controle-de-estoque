import { modalAlert } from './modalAlert.module.js';

function validity(validade, nome) {
    const val = validade.value;
    const data = new Date();
    const validadeProd = new Date(val);
    const diff = Math.abs(data.getTime() - validadeProd.getTime())
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (data > validadeProd) {
         modalAlert({
            message: `O produto <b>${nome}</b> venceu à ${dias} dias`,
            type: 'danger'
        }, setTimeout(() => {
            modalAlert({ message: '', type: '' }).style.opacity = 0;
        }, 4500))
    } else {
        modalAlert({
            message: `O produto <b>${nome}</b> irá vencer em ${dias} dias`,
            type: 'warning'
        }, setTimeout(() => {
            modalAlert({ message: '', type: '' }).style.opacity = 0;
        }, 4500))
    }
    data.setDate(data.getDate())
}

export { validity }