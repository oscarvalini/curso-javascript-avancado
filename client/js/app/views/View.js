class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    _template(model) {
        throw new Error("método _template deve ser sobrescrito");
    }

    update(model) {
        this._elemento.innerHTML = this._template(model);
    }
}