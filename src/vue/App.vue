<template>
  <div class="vue-app">
    <h1>{{ hello }}</h1>
    <TodoList/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import TodoList from "./components/TodoList";

  export default {
    components: {
      TodoList,
    },

    computed: mapState(['hello']),
  };
</script>

<style scoped lang="stylus">
  .vue-app
    display inline-block
    border 1px solid
  h1
    margin 20px
</style>
