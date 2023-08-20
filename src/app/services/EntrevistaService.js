import ApiService from '../apiservice'

export default class EntrevistaService extends ApiService{

    constructor(){
        super('/entrevistas')
    }

    cadastrar(entrevista){
        return this.post('', entrevista);
    }

    listar(){
        return this.get('');
    }

    buscarId(id){
        return this.get(`/${id}`);
    }

    alterar(id, obj){
        return this.put(`/${id}`, obj)
    }

    buscarByProcesso(id){
        return this.get(`/processo/${id}`);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

}