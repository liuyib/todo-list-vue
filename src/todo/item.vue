<template>
  <div
    :class="['todo__item', todo.completed ? 'comleted' : '']"
  >
    <input
      v-bind:id="todo.content"
      type="checkbox"
      class="todo__item-checkbox"
      v-model="todo.completed"
    />
    <label
      v-bind:for="todo.content"
      class="todo__item-label"
    >
      {{ todo.content }}
    </label>
    <div
      class="todo__item-delete"
      @click="deleteTodo"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    todo : {
      type: Object,
      required: true,
    }
  },
  methods: {
    deleteTodo() {
      this.$emit('delete', this.todo.id);
    }
  }
}
</script>

<style lang="stylus">
.todo {
  &__item {
    position: relative;
    padding: 10px 0;
    height: 50px;
    font-size: 20px;

    &:hover {
      .todo__item-delete {
        visibility: visible;
      }  
    }

    &.comleted {
      .todo__item-label {
        text-decoration: line-through;
        color: #999;
      }  
    }

    &-checkbox {
      position: absolute;
      top: 50%;
      left: 0;
      width: 1.5em;
      height: 1.5em;
      transform: translateY(-50%);
    }

    &-label {
      display: block;
      margin: 0 auto 0 2em;
      width: calc(100% - 3em);
    }

    &-delete {
      position: relative;
      visibility: hidden;
      position: absolute;
      right: 0;
      top: 50%;
      width: 1em;
      height: 1em;
      cursor: pointer;
      transform: translateY(-50%);

      &:hover {
        &::before {
          transform: rotateZ(0);
        }

        &::after {
          transform: rotateZ(0);
        }
      }

      &::before,
      &::after {
        content: "";
        position: absolute;
        top: calc(50% - 1px);
        left: 0;
        display: block;
        width: 1em;
        height: 2px;
        background-color: red;
        transform-origin: center;
        transition: transform .3s;
      }

      &::before {
        transform: rotateZ(45deg);
      }

      &::after {
        transform: rotateZ(-45deg);
      }
    } 
  }
}
</style>