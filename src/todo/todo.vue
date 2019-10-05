<template>
  <section class="todo__wrap">
    <div class="todo-add__wrap">
      <input
        type="text"
        class="todo-add"
        autofocus="autofocus"
        placeholder="接下来要做什么"
        @keyup.enter="addTodo"
      />
      <div class="todo-add__info">至少得输入点东西吧！</div>
    </div>
    <Item
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @delete="deleteTodo"
    ></Item>
  </section>
</template>

<script>
import Item from "./item.vue";

export default {
  data() {
    return {
      id: 0,
      todos: []
    };
  },
  components: {
    Item
  },
  methods: {
    addTodo(e) {
      let value = e.target.value.trim();
      let todoInfo = document.querySelector(".todo-add__info");

      if (value === "") {
        todoInfo.classList.add("show");
      } else {
        let isRepeat = false;

        todoInfo.classList.remove("show");
        this.todos.forEach(function(item, index) {
          if (item.content === value) {
            isRepeat = true;
          }
        });

        if (isRepeat) {
          window.alert("这个 Todo 已存在，是不是想来点别的呢？");
        } else {
          this.todos.unshift({
            id: this.id++,
            content: value,
            completed: false
          });

          e.target.value = "";
        }
      }
    },
    deleteTodo(id) {
      const { todos } = this;

      todos.splice(todos.findIndex(todo => todo.id === id), 1);
    }
  }
};
</script>

<style lang="stylus">
.todo {
  &__wrap {
    margin: 0 auto;
    padding: 10px;
    height: 70vh;
    max-width: 600px;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0.8);
  }

  &-add {
    display: block;
    width: 100%;
    height: 40px;
    margin: 0 auto 20px auto;
    padding: 10px;

    &__wrap {
      position: relative;
    }

    &__info {
      position: absolute;
      top: 8px;
      right: 0;
      color: red;
      opacity: 0;
      transition: opacity 0.3s;

      &.show {
        opacity: 1;
        transition: transform;
        animation: shake 0.3s;
      }

      @keyframes shake {
        0%, 40%, 80% {
          transform: translateX(-5px);
        }

        20%, 60%, 100% {
          transform: translateX(5px);
        }
      }
    }
  }
}
</style>
