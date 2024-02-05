"use strict";
const buttonConvert = document.getElementsByTagName('button')[0];
const input_Number = document.getElementById('number');
const input_BaseOri = document.getElementById("base_Ori");
const input_BaseDes = document.getElementById("base_Des");
const input_Result = document.getElementById('res');
buttonConvert.addEventListener('click', () => {
    if (Number(input_BaseDes.value) > 16 || Number(input_BaseOri.value) > 16) {
        input_Result.value = "Limite de bases é 16";
        return;
    }
    if (input_Number.value == '') {
        input_Result.value = "";
        return;
    }
    if (input_BaseDes.value == input_BaseOri.value) {
        input_Result.value = input_Number.value;
        return;
    }
    if (hasLetter(input_Number.value) && Number(input_BaseOri.value) <= 10) {
        input_Result.value = "Valor não aceito";
        return;
    }
    if (true) {
        const base10 = conv_to_base10(input_Number.value, Number(input_BaseOri.value));
        let res = String(conv_base10_to(base10, Number(input_BaseDes.value)));
        while (str_include(res, ',')) {
            res = res.replace(',', '');
        }
        input_Result.value = res;
    }
});
function conv_to_base10(num_str, base_Ori) {
    let res = 0;
    let new_num_arr = [];
    if (hasLetter(input_Number.value)) {
        const char = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        for (let i = 0; i < input_Number.value.length; ++i) {
            const n = char.indexOf(input_Number.value[i]);
            new_num_arr.push(Number(n));
        }
    }
    else {
        new_num_arr = num_str.split('');
    }
    for (let i = 0; i < new_num_arr.length; ++i) {
        const digit = Number(new_num_arr[new_num_arr.length - 1 - i]);
        res += digit * pot(base_Ori, i);
    }
    return res;
}
function pot(num, pote) {
    let res = 1;
    for (let i = 0; i < pote; ++i) {
        res *= num;
    }
    return res;
}
function conv_base10_to(num, base_Des) {
    const char = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let num_copy = num;
    const res = [];
    while (num_copy) {
        res.unshift(char[num_copy % base_Des]);
        num_copy = (Math.floor(num_copy / base_Des));
    }
    return res;
}
function str_include(str, char) {
    for (let i = 0; i < str.length; ++i) {
        if (str[i] == char)
            return true;
    }
    return false;
}
function hasLetter(str) {
    for (let i = 0; i < str.length; ++i) {
        if (isNaN(Number(str[i]))) {
            return true;
        }
    }
    return false;
}
