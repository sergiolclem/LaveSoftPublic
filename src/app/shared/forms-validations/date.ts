import { FormControl } from '@angular/forms';

/**
 * 
 * @param dataValidator data mínima aceita no formulário
 * 
 * @returns null se válido; { 'dataInvalida': true } se inválido
 */
export function date(dataValidator = new Date()) {

    const validator = (control: FormControl) => {
        let dataForm: Date = control.value;
        let diasForm = Math.floor(Date.parse(dataForm.toString()) / 1000 * 60 * 60 * 24);
        let diasValidator = Math.floor(Date.parse(dataValidator.toString()) / 1000 * 60 * 60 * 24);

        return diasValidator <= diasForm ? null : { 'dataInvalida': true }
    }

    return validator;
}
