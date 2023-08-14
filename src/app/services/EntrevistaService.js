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

    buscarByProcesso(processoId){
        return this.get(`/${processoId}`);
    }

}