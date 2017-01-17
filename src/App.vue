<template>
  <div id="app" class="container-fluid">
      {{tarefas}}
      <div class="form-group">
          <div class="row">
              <div class="col-md-6">
                  <div class="title">
                      <h1>Cadastre uma nova tarefa</h1>
                  </div>
                  <label for="descricao" class="col-md-2">Descrição</label>
                  <div class="col-md-3">
                      <input type="textarea" id="tarefa.descricao" class="form-control"placeholder="Digite a descrição da tarefa" v-model="descricao">
                  </div>
              </div>
          </div>
          <br>
          <div class="row">
              <div class="col-md-6">
                  <label for="data" class="col-md-2">Data</label>
                  <div class="col-md-3">
                      <input type="date" id="tarefa.data" class="form-control" v-model="data">
                  </div>
            </div>
          </div>
          <br>
          <div class="row">
              <div class="col-md-6">
                  <button type="button" class="btn btn-primary btn-salvar" v-on:click="addTarefa()">SALVAR</button>
              </div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-6">
              <table class="table">
        			<tr>
        				<td>Descrição</td>
        				<td>Data</td>
                        <td>Ultima modificação</td>
                        <td>Deletado em</td>
        			</tr>
        			<tr v-for="item in list">
        				<td>{{item.descricao}}</td>
        				<td>{{item.data}}</td>
                        <td>{{item.dataUltimaAtualizacao}}<td>
                        <td><span>{{item.dataDel}}</span><td>
        			</tr>
    		  </table>
              <ul>
                  <li v-for="item in list">
                      <span>{{item.descricao}}</span>
                      <span>{{item.data}}</span>
                      <span>{{item.dataUltimaAtualizacao}}</span>
                  </li>
              </ul>
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
        list: []
    }
  },
  methods: {
      addTarefa(){
          var d = moment.tz('America/Sao_Paulo');
          var nova_d = d.format('DD/MM/YYYY : HH:mm:ss');
          var tarefa = {
              cod: localStorage.length + 1,
              descricao: this.descricao,
              data: this.data,
              dataUltimaAtualizacao: nova_d,
              dataDel: '',
              ativo: true
          };
          localStorage["tarefas"] = JSON.stringify(tarefa);
          this.list.push(tarefa);
      }
  }
}
</script>

<style scoped>
    h1{
        font-size: 25px;
        margin-left: auto;
        margin-right: 0;
    }
    .btn-salvar{
        margin-left: 15%;
    }
</style>
