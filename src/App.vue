<script>
import { onMounted, onUpdated, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
export default {
  setup() {
    // firebase refs
    const todoCollectionRef = collection(db, "todos");
    const todoCollectionQuery = query(
      todoCollectionRef,
      orderBy("date", "desc")
    );

    const todos = ref([
      // {
      //   id: "id1",
      //   content: "go to school",
      //   done: false,
      // },
      // {
      //   id: "id2",
      //   content: "buy a book",
      //   done: true,
      // },
    ]);

    // get todos
    onMounted(async () => {
      // const querySnapshot = await getDocs(collection(db, "todos"));
      // let fdTodos = [];
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      //   const todo = {
      //     id: doc.id,
      //     content: doc.data().content,
      //     done: doc.data().done,
      //   };
      //   fdTodos.push(todo);
      //   todos.value = fdTodos;
      // });

      onSnapshot(todoCollectionQuery, (querySnapshot) => {
        const fdTodos = [];
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            content: doc.data().content,
            done: doc.data().done,
          };
          fdTodos.push(todo);
        });
        todos.value = fdTodos;
      });
    });

    // addtodo
    const addTodoContent = ref("");
    const addTodo = () => {
      addDoc(todoCollectionRef, {
        content: addTodoContent.value,
        done: false,
        date: Date.now(),
      });

      // const newTodo = {
      //   id: uuidv4(),
      //   content: addTodoContent.value,
      //   done: false,
      // };
      // todos.value.unshift(newTodo);
      addTodoContent.value = "";
    };

    // delete Todo
    const deleteTodo = (id) => {
      deleteDoc(doc(todoCollectionRef, id));
    };
    // toggle Todo
    const doneTodo = (id) => {
      const index = todos.value.findIndex((todo) => todo.id === id);
      updateDoc(doc(todoCollectionRef, id), {
        done: !todos.value[index].done,
      });

      // console.log(index);
      // todos.value[index].done = !todos.value[index].done;
    };

    return { todos, addTodo, addTodoContent, deleteTodo, doneTodo };
  },
};
</script>

<template>
  <div class="badass-todo">
    <div class="title has-text-centered">Firebase Todo</div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
            v-model="addTodoContent"
            class="input"
            type="text"
            placeholder="Add a todo"
          />
        </p>
        <p class="control">
          <button class="button is-info" :disabled="!addTodoContent">
            Add
          </button>
        </p>
      </div>
    </form>

    <div
      class="card mb-5"
      :class="{ 'has-background-success-light': todo.done }"
      v-for="todo in todos"
      :key="todo.id"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              class="column"
              :class="{ 'has-text-success line-through': todo.done }"
            >
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button
                @click="doneTodo(todo.id)"
                class="button"
                :class="todo.done ? 'is-success' : 'is-light'"
              >
                &check;
              </button>
              <button
                @click="deleteTodo(todo.id)"
                class="button is-danger ml-2"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "bulma/css/bulma.min.css";

.badass-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.line-through {
  text-decoration: line-through;
}
</style>

