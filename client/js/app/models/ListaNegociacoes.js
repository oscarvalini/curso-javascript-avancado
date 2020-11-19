class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    esvazia() {
        this._negociacoes = [];
    }

    ordena(criterio) {
        this._negociacoes.sort(criterio);        
    }

    get negociacoes() {
        return this._negociacoes.slice();
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }

}