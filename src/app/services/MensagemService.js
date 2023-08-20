import ApiService from '../apiservice'

class MensagemService extends ApiService{

    constructor(){
        super('/mensagens')
    }

    cadastrar(mensagem){
        return this.post('', mensagem);
    }

    listar(){
        return this.get('');
    }

    listarById(id){
        return this.get('/'+id)
    }
}

export default MensagemService;