import ApiService from '../apiservice'

export default class CadastroProcessoService extends ApiService{

    constructor(){
        super('/ps')
    }

    cadastrar(processo){
        return this.post('', processo);
    }

    listar(){
        return this.get('');
    }

    buscarId(id){
        return this.get(`/${id}`);
    }

    listarProcessosFechados(){
        return this.get('/fechados')
    }

    alterar(id, obj){
        return this.put(`/${id}/finalizar`, obj)
    }

}