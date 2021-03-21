function validity(validade, nome) {
    const data = new Date();
    const validadeProd = new Date(validade);
    const diff = Math.abs(data.getTime() - validadeProd.getTime())
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (data > validadeProd) {
        modalAlert({
            message: `O produto ${nome} venceu à ${dias} dias`,
            type: 'danger'
        }, setTimeout(() => {
            modalAlert().style.opacity = 0;
        }, 2500))
    } else {
        modalAlert({
            message: `O produto ${nome} irá vencer em ${dias} dias`,
            type: 'warning'
        }, setTimeout(() => {
            modalAlert().style.opacity = 0;
        }, 2500))
    }
    data.setDate(data.getDate())
}

export { validity }