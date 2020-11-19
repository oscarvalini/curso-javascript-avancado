class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($("#negociacoes-view")),
            'adiciona', 'esvazia', 'ordena'
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto'
        );

        this._ordemAtual = '';
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação adicionada com sucesso";
        this._limpaFormulario();
    }

    importaNegociacoes() {

        let service = new NegociacaoService();
        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()
        ]).then(negociacoes => {
            negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso';
        })
        .catch(error => this._mensagem.texto = error);


        /*Promise
        let promise = service.obterNegociacoesDaSemana();
        promise.then(
            negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
            })
            .catch(error => {
                this._mensagem.texto = erro;
            })
            */

        /* Técnica de Callback
        service.obterNegociacoesDaSemana((err, negociacoes) => {
            if(err) {
                this._mensagem.texto = err;
                return;
            }
            
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = "Negociações importadas com sucesso";
        });
        */
    }

    apagar() {

        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso";
    }

    ordena(param) {

        if(this._ordemAtual == param){
            this._listaNegociacoes.ordena((a , b) => b[param] - a[param]);
            this._ordemAtual = '';
        }
        else{
            this._listaNegociacoes.ordena((a , b) => a[param] - b[param]);
            this._ordemAtual = param;
        }       

    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {

        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();

    }

}