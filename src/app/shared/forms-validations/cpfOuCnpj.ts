import { FormControl } from '@angular/forms';

export function cpfOuCnpjValido(control: FormControl) {
    var valor: string = control.value;

    let validade: {} | null = null;

    if (valor) validade = {'cpfOuCnpjInvalido': true};
    if (eCpf(valor)) validade = validarCpf(valor);
    if (eCnpj(valor)) validade = validarCnpj(valor);

    return validade;
}

function validarCpf(valor: string) {
    return cpfEValido(valor) ? null : { 'cpfInvalido': true }
}

function validarCnpj(valor: string) {
    return cnpjEValido(valor) ? null : { 'cnpjInvalido': true }
}

function eCpf(valor: string) {
    var cpfRe = /^\d{3}.\d{3}.\d{3}-\d{2}$/;
    return cpfRe.test(valor)
}

function eCnpj(valor: string) {
    var cnpjRe = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/;
    return cnpjRe.test(valor)
}

function cpfEValido(valor: string) {
    var cpf = valor.replace(/\D/g, '').slice(0, 11);
    return eBlackListed(cpf) ? false :
        validarDigitoCpf(cpf, 1) && validarDigitoCpf(cpf, 2);
}

function validarDigitoCpf(cpf: string, digito: number) {
    var posicoes = 8 + digito;
    var iterador = 9 + digito;
    var soma = 0;
    for (var i = 0; i < posicoes; i++) {
        soma += parseInt(cpf[i]) * iterador--;
    }
    var resto = (soma * 10 % 11) === 10 ? 0 : (soma * 10 % 11);
    return resto === parseInt(cpf[8 + digito]);
}

function cnpjEValido(valor: string) {
    var cnpj = valor.replace(/\D/g, '').slice(0, 14);
    cnpj = cnpj.split('').reverse().join('');
    return eBlackListed(cnpj) ? false :
        validarDigitoCnpj(cnpj, 1) && validarDigitoCnpj(cnpj, 2);
}

function validarDigitoCnpj(cnpj: string, digito: number) {
    var ajusteIndex = 1 - digito;
    var soma = 0;

    for (var i = 2 + ajusteIndex, j = 2; i < cnpj.length; i++) {
        soma += parseInt(cnpj[i]) * j;
        j === 9 ? j = 2 : j++;
    }

    return getDigitoVerificador(soma) === parseInt(cnpj[1 + ajusteIndex]);
}

function getDigitoVerificador(soma: number) {
    return (soma % 11) === (0 || 1) ? 0 : 11 - (soma % 11);
}

function eBlackListed(cpf: string) {
    return [
        //  CPF            CNPJ
        '00000000000', '00000000000000',
        '11111111111', '11111111111111',
        '22222222222', '22222222222222',
        '33333333333', '33333333333333',
        '44444444444', '44444444444444',
        '55555555555', '55555555555555',
        '66666666666', '66666666666666',
        '77777777777', '77777777777777',
        '88888888888', '88888888888888',
        '99999999999', '99999999999999'
    ].indexOf(cpf) !== -1;
}