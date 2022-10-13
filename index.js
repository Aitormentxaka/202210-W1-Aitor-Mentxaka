const numero = document.querySelectorAll('.numero');
const pantalla = document.querySelectorAll('.pantalla');
const operador = document.querySelectorAll('.operador');
const valorArriba = document.querySelector('.numero-arriba');
const valorAbajo = document.querySelector('.numero-abajo');
const borrarTodo = document.querySelector('.borratodo');
const borrar = document.querySelector('.borrar');

class Calculadora {
    constructor(valorAbajo, valorArriba) {
        this.pantalla = pantalla;

        this.operador = undefined;
        this.valorInferior = '';
        this.valorSuperior = '';
    }
    agregarNumero(numero) {
        if (this.valorInferior.length > 13) {
            return;
        }
        if (numero === '.' && this.valorInferior.includes('.')) {
            return;
        }
        this.valorInferior = this.valorInferior + numero;
    }
    agregarOperador(operador) {
        this.operador = operador;

        if (this.valorInferior === '') {
            return;
        }

        this.valorSuperior = this.valorInferior + operador;
        this.valorInferior = '';

        this.imprimirPantalla();
    }
    imprimirPantalla() {
        valorAbajo.innerHTML = this.valorInferior;
        valorArriba.innerHTML = this.valorSuperior;
    }
    borrar() {
        this.valorInferior = this.valorInferior.slice(0, -1);
        this.imprimirPantalla();
    }
    borrarTodo() {
        this.valorInferior = '';
        this.valorSuperior = '';
        this.imprimirPantalla();
    }
    calcular() {
        let valorSuperiorNumber = parseFloat(this.valorSuperior);
        let valorInferiorNumber = parseFloat(this.valorInferior);
        let resultado;

        if (isNaN == valorInferiorNumber || isNaN == valorSuperiorNumber) {
            return;
        }
        switch (this.operador) {
            case '+':
                resultado = Number(
                    (valorSuperiorNumber + valorInferiorNumber).toFixed(2)
                );
                break;
            case '-':
                resultado = Number(
                    (valorSuperiorNumber - valorInferiorNumber).toFixed(2)
                );
                break;
            case '*':
                resultado = Number(
                    (valorSuperiorNumber * valorInferiorNumber).toFixed(2)
                );
                break;
            case '/':
                resultado = Number(
                    (valorSuperiorNumber / valorInferiorNumber).toFixed(2)
                );
                break;
        }
        if (resultado.toString().length > 13) {
            resultado = 'ERROR:Límite de dígitos';
            this.valorSuperior = resultado;
            this.valorInferior = '';
            this.imprimirPantalla();
            return;
        }

        this.valorInferior = resultado.toString();
        this.valorSuperior =
            valorSuperiorNumber + this.operador + valorInferiorNumber;
        this.operador = undefined;
        this.imprimirPantalla();
    }
}

const calculadora = new Calculadora(valorAbajo, valorArriba);

numero.forEach((boton) => {
    boton.addEventListener('click', () => {
        calculadora.agregarNumero(boton.innerHTML);
        calculadora.imprimirPantalla();
    });
});

operador.forEach((boton) => {
    boton.addEventListener('click', () => {
        calculadora.agregarOperador(boton.innerHTML);
        calculadora.imprimirPantalla();
    });
});
