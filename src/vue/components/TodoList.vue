<template>
  <div>
    <label>
      <span>TodoList: </span>
      <input type="text" v-model="field">
    </label>
    <button @click="add">Добавить</button>
    <ol v-if="list.length">
      <li v-for="(item, index) in list" @dblclick="del(index)"
          :title="'Двойной клик — удалить ' + ((item === placeholder) ? 'пустой элемент' : item)">
        {{ item }}
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        placeholder: '<пусто>',
        field: '',
        list: [],
      };
    },

    computed: {
      input() {
        return this.field || this.placeholder;
      },
    },

    methods: {
      add() {
        this.list.push(this.input);
        this.empty();
      },

      del(index) {
        this.list.splice(index, 1);
        this.empty();
      },

      empty() {
        this.field = '';
      },
    },
  };
</script>

<style scoped lang="stylus">
  div
    margin 20px
</style>
