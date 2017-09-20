function sum_arrays() {
    var input_data_1 = document.getElementById("input_data_1").value;
    if (typeof (input_data_1) != "string") {
        throw "Argument not a string";
    }
    var i = 0;
    while (i < input_data_1.length && input_data_1[i] != '[') {
        i++;
    }
    i++;
    var arrays = [];
    var array = [];
    var current = "";
    while (i < input_data_1.length) {
        while (i < input_data_1.length && input_data_1[i] != ',' && input_data_1[i] != ']') {
            current += input_data_1[i];
            i++;
        }
        var tmp = parseInt(current);
        if (!isNaN(tmp)) {
            array.push(tmp);
        } else {
            array.push(current);
        }
        current = "";
        if (input_data_1[i] == ']') {
            arrays.push(array);
            array = [];
            while (i < input_data_1.length && input_data_1[i] != '[') {
                i++;
            }
        }
        i++;
    }
    if (!Array.isArray(arrays)) {
        throw "Argument is not array";
    }
    if (arrays.length == 0) {
        throw "Array is empty";
    }
    for (var i = 0; i < arrays.length; i++) {
        if (!Array.isArray(arrays[i])) {
            throw "One or more element is not array";
        }
    }
    var max_dim_pos = 0;
    for (var i = 1; i < arrays.length; i++) {
        if (arrays[i].length > arrays[max_dim_pos].length) {
            max_dim_pos = i;
        }
    }
    var sum_array = new Array(arrays[max_dim_pos].length);
    for (var i = 0; i < arrays[max_dim_pos].length; i++) {
        sum_array[i] = arrays[max_dim_pos][i];
        for (var j = 0; j < arrays.length; j++) {
            if (j != max_dim_pos && i < arrays[j].length) {
                sum_array[i] += arrays[j][i];
            }
        }
    }
    output_data_1 = document.getElementById("output_data_1");
    output_data_1.value = "[" + sum_array.toString() + "]";
}

function shuffle() {
    var input_data_2 = document.getElementById("input_data_2").value;
    if (typeof (input_data_2) != "string") {
        throw "Argument not a string";
    }
    var i = 0;
    while (i < input_data_2.length && input_data_2[i] != '[') {
        i++;
    }
    i++;
    var arrays = [];
    var array = [];
    var current = "";
    while (i < input_data_2.length) {
        while (i < input_data_2.length && input_data_2[i] != ',' && input_data_2[i] != ']') {
            current += input_data_2[i];
            i++;
        }
        var tmp = parseInt(current);
        if (!isNaN(tmp)) {
            array.push(tmp);
        } else {
            array.push(current);
        }
        current = "";
        if (input_data_2[i] == ']') {
            arrays.push(array);
            array = [];
            while (i < input_data_2.length && input_data_2[i] != '[') {
                i++;
            }
        }
        i++;
    }
    array = arrays[0];
    array.sort((a, b) => (Math.round(Math.random()) == 1) ? true : false);
    output_data_2 = document.getElementById("output_data_2");
    output_data_2.value = "[" + array.toString() + "]";
}

function calculate() {
    var input_data_3 = "(" + document.getElementById("input_data_3").value + ")";
    var operands = new Array();
    var operators = new Array();
    var i = 0;
    var token = "";
    var is_digit = (c) => "0123456789.".indexOf(c) >= 0 ? true : false;
    var is_sign = (c) => "*/+-".indexOf(c) >= 0 ? true : false;
    var priority = (c) => {
        switch (c) {
            case '*': case '/': return 1;
            case '+': case '-': return 2;
        }
        return 0;
    };
    while (i < input_data_3.length) {
        if (input_data_3[i] == ')') {
            while (operators.length > 0 && operators[operators.length - 1] != '(') {
                var b = parseFloat(operands.pop());
                var a = parseFloat(operands.pop());
                switch (operators.pop()) {
                    case "+": operands.push(a + b); break;
                    case "-": operands.push(a - b); break;
                    case "*": operands.push(a * b); break;
                    case "/": operands.push(a / b); break;
                }
            }
            operators.pop();
        }
        while (is_digit(input_data_3[i])) {
            token += input_data_3[i];
            i++;
        }
        if (token != "") {
            operands.push(token);
            token = "";
            continue;
        }
        if (input_data_3[i] == '(') {
            operators.push(input_data_3[i]);
        }
        if (is_sign(input_data_3[i])) {
            var can_pop = (t) => (operators.length > 0 && 
                priority(operators[operators.length - 1]) > 0 &&
                priority(input_data_3[i]) >= priority(operators[operators.length - 1]));
            while (can_pop(input_data_3[i])) {
                var b = parseFloat(operands.pop());
                var a = parseFloat(operands.pop());
                switch (operators.pop()) {
                    case "+": operands.push(a + b); break;
                    case "-": operands.push(a - b); break;
                    case "*": operands.push(a * b); break;
                    case "/": operands.push(a / b); break;
                }
            }
            operators.push(input_data_3[i]);
            i++;
            continue;
        }
        i++;
    }
    output_data_3 = document.getElementById("output_data_3");
    output_data_3.value = operands.toString();
}