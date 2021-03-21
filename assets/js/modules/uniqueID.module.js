
export function uniqueID(produto) {

    const maxNumbers = produto.length

    // if (produto.length == null || produto.length == undefined) {maxNumbers = 1}
    
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
        if (tmp > 0) { return tmp; }

    }
    console.log('Maximo lista:', list);

}