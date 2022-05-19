
/*  Cola de Datos determinada  */
const Queue = () => ({
    start: 0,
    end: 0,
    data: {},

    // agregando valor a la cola
    add: function (value) {
        this.data[this.end] = value;
        this.end += 1;
        return this;
    },

    // determinado el tamaño de la cola
    size: function () {
        return this.end - this.start;
    },

    /* obtiene el primer valor insertadp  */
    front: function () {
        return this.size() == 0 ? undefined : this.data[this.start];
    },

    /* permite devolver el ultimo valor de la colar */
    back: function () {
        return this.size == 0 ? undefined : this.data[this.end - 1];
    },

    /* funcion que se encarga de evaluar si esta vacia */
    empty: function () {
        return this.size() == 0;
    },

    // elimina y retorna el primero en la cola
    pop: function () {
        if (this.start == this.end)
            return undefined;

        // eliminando el primer elemento
        let aux = this.data[this.start];
        delete this.data[this.start];
        this.start += 1;

        // asumiendo que la cola esta vacia
        if (this.start == this.end) {
            this.start = 0;
            this.end = 0;
        }

        return aux;
    }
});

module.exports = { Queue };