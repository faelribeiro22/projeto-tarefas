<template>
  <div id="app" class="container-fluid">
      {{tarefas}}
      <div class="d-flex flex-row">
          <div class="row">
              <div class="col-md-6">
                  <div class="title">
                      <h1>Cadastre uma nova tarefa</h1>
                  </div>
                  <label for="descricao" class="col-md-1">Descrição</label>
                  <div class="col-md-4">
                      <textarea id="descricao" class="form-control"placeholder="Digite a descrição da tarefa" row="3" v-model="descricao">
                  </div>
                  <label for="data" class="col-md-1">Data</label>
                  <div class="col-md-3">
                      <input type="text" id="tarefa.data" class="form-control" v-model="data" maxlength="10" placeholder="dia/mês/ano">
                  </div>
                  <div class="col-md-3">
                      <button type="button" class="btn btn-primary btn-salvar" v-on:click="addTarefa()">SALVAR</button>
                  </div>
              </div>
                <div class="col-md-6 listaTarefas">
                    <div class="col-md-6 tabela">
                        <table class="table" v-show="this.list.length > 0">
                            <caption class="tituloTarefa">Lista tarefas</caption>
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Data</th>
                                    <th>Ultima modificação</th>
                                    <th></th>
                                    <th>Deletado em</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in list" v-bind:class="{ tarefaDeletada: item.desativado }">
                                    <td v-bind:class="{ tarefaDeletada: item.desativado }">{{item.descricao}}</td>
                                    <td><span v-bind:class="{ tarefaDeletada: item.desativado }">{{item.data}}</span></td>
                                    <td><span >{{item.dataUltimaAtualizacao}}</span><td>
                                    <td>{{item.dataDel}}<td>
                                    <td><button class="btn btn-success" @click="montaAtualizarTarefa(item.cod)" :disabled="item.desativado">Atualizar Tarefa</button></td>
                                    <td><button class="btn btn-danger" @click="removeTarefa(item.cod)" :disabled="item.desativado">Deletar</button></td>
                                </tr>
                            </tbody>
                        </table>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
export default {
  name: 'app',
  data () {
    return {
        text: '',
        list : []
    }
  },
  created: function() {
      var lista = [];
      if(localStorage.length != 0){
        for( var i = 1;lista.length < localStorage.length; i++){
            var aux = localStorage.getItem(i);
            if(aux != null)
              lista.push(JSON.parse(aux));
        }
        this.list = lista;
      }
  },
  methods: {
      addTarefa(){
          var d = moment.tz('America/Sao_Paulo');
          var nova_d = d.format('DD/MM/YYYY : HH:mm:ss');
          var dataAux = moment(this.data,'DD/MM/YYYY').format('DD/MM/YYYY');
          var cod = 0;
          var arrayTarefa = [];
          var i = 1;
          while(true){
              var objAux = localStorage.getItem(i);
              if(objAux == null){
                  cod = i;
                  break;
              }else{
                  i++;
              }
          }
          var tarefa = {
              cod: cod,
              descricao: this.descricao,
              data: this.data,
              dataUltimaAtualizacao: nova_d,
              dataDel: '',
              desativado: false
          };
          localStorage.setItem(tarefa.cod, JSON.stringify(tarefa));
          this.list.push(tarefa);
          this.descricao = '',
          this.data = ''
      },
      removeTarefa(cod){
          var obj = JSON.parse(localStorage.getItem(cod));
          var listAux = [];
          var d = moment.tz('America/Sao_Paulo');
          var nova_d = d.format('DD/MM/YYYY : HH:mm:ss');
          obj.dataDel = nova_d;
          obj.dataUltimaAtualizacao = nova_d;
          obj.desativado = true;
          localStorage.setItem(cod.toString(),JSON.stringify(obj));
          var i = 1;
          while(true){
              if(listAux.length >= localStorage.length)
                break;
              var aux = localStorage.getItem(i);
              if(aux != null){
                  listAux.push(JSON.parse(aux));
              }
              i++;
          }
          this.list = listAux;
      },
      montaAtualizarTarefa(cod) {
          var obj = JSON.parse(localStorage.getItem(cod));
          var listAux = [];
          this.descricao = obj.descricao,
          this.data = obj.data
          localStorage.removeItem(cod);
          var i=1;
          while(listAux.length<localStorage.length){
              var aux = JSON.parse(localStorage.getItem(i));
              if(aux != null)
                listAux.push(aux);
              i++
          }
          this.list = listAux;
      },
  }
}
</script>

<style scoped>
    textarea {
        resize: none;
    }
    h1{
        font-size: 25px;
        margin-left: auto;
        margin-right: 0;
    }
    .btn-salvar{
        margin-left: 15%;
    }
    .tarefaDeletada {
        text-decoration: line-through;
    }
    .dataDel{
        text-decoration: none;
    }
    .tabela{
        margin-top: 0px;
    }
    .listaTarefas{
        margin-top: 25px;
    }
    .tituloTarefa{
        text-align: center;
    }

</style>
