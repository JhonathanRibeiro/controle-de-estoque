function uniqueID() {
    let produtos = localStorage.getItem("produtos");
    let produto = JSON.parse(produtos)
    if (produto == null) { produto = 1 }
    const maxNumbers = 50

    let list = [];
    let randomNumber;
    let tmp;

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
        return tmp;
    }
    console.log('Maximo lista:', list);
}

export { uniqueID }