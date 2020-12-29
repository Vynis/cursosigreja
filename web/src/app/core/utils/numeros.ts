export const formatoMoeda = (valor: any) => {
    if (!valor && valor != 0) return '';
    return Number.parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const formatoPercentual = (valor: any) => {
    if (!valor) return '';
    return Number.parseFloat(valor).toFixed(2) + ' %';
}

export const formatarNumero = (valor) => {
    if (isNaN(valor) || valor == '')
        return valor;
    else
        return roundTo(valor, 2).toLocaleString('pt-BR');
}

export const roundTo = (n, digits) => {
    if (digits === undefined) {
        digits = 0;
    }

    let multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    var test = (Math.round(n) / multiplicator);
    return +(test.toFixed(digits));
}