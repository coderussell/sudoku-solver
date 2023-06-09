<template>
  <div class="container">
    <h1>Sudoku Solver</h1>
    <!-- <h2 class="subtitle">by coderussell</h2> -->

    <div class="grid">
      <template v-for="n in 81" :key="n">
        <div :class="{ 'focused-cell': focusedIndex === n, 'white-cell': whiteCells.includes(n) }">
          <Cell v-model="sudoku[n - 1]" :index="n" @focused="changeFocus($event)" />
        </div>
      </template>
    </div>

    <div class="actions">
      <div>
        <button @click="solver.clear">Clear</button>
        <button @click="solver.showExample">Example</button>
      </div>
      <div>
        <button class="primary" @click="solver.solveSingle">Hint</button>
        <button class="primary" @click="solver.solve">Solve</button>
      </div>
    </div>

    <div class="toast">
      <template v-for="(message, index) of messages.slice(0, 5)">
        <div class="errors">
          <div>
            <p class="title">Error</p>
            <p>{{ message }}</p>
          </div>
          <div>
            <button @click="removeError(index)">
              <hr class="to-right" />
              <hr class="to-left" />
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useSolver } from '../stores/solver';
import Cell from '@/components/Cell.vue';

const solver = useSolver();
const { sudoku, messages } = solver

const focusedIndex: Ref<number | null> = ref(null)
const whiteCells = [4, 5, 6, 13, 14, 15, 22, 23, 24, 28, 29, 30, 37, 38, 39, 46, 47, 48, 34, 35, 36, 43, 44, 45, 52, 53, 54, 58, 59, 60, 67, 68, 69, 76, 77, 78]

const changeFocus = (index: number) => focusedIndex.value = index

window.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') return changeFocus(-1)
})

const removeError = (index: number) => {
  messages.splice(index, 1)
}

</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 1rem;
  font-size: 4rem;
  font-variation-settings: "wght" 100, "wdth" 100, "XHGT" 40;
}

.subtitle {
  opacity: 0.4;
  font-size: 1.125rem;
}

.grid {
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: repeat(9, 1fr);
  max-width: 100%;
  aspect-ratio: 1/1;
  gap: 6px;
  // border: 2px solid grey;

  &>div {
    display: inline;
    background: rgba(#4B3F72, 0.04);
    color: rgba(0, 0, 0, 0.2);
    font-size: 0.875rem;
    border-radius: 4px;
    width: 100%;
    overflow: hidden;

    &.focused-cell,
    &:hover {
      box-shadow: 0 0 1px white, 0 0 4px rgba(#4B3F72, 0.5);
    }

    &.white-cell {
      background: white !important;
    }
  }
}

.actions {
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  gap: 12px;

  div {
    display: flex;
    gap: 8px;
  }

  button {
    height: 32px;
    min-width: 64px;
    font-size: 0.75rem;
    border: 1px solid #533aa5;
    border-radius: 12px;
    background: none;
    color: #533aa5;
    padding: 0.5rem 1.5rem;
    cursor: pointer;

    &.primary {
      background-color: #533aa5;
      color: white;

    }

    &:hover {
      background-color: #533aa5;
      color: white;
      border: 1px solid #533aa5;
    }

    &:active {
      transform: scale(0.9);
    }
  }
}

.toast {
  position: fixed;
  min-width: 250px;
  inset: 1rem 1.5rem auto auto;
  display: grid;
  gap: 12px;
}

.errors {
  background-color: white;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.09);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;


  p.title {
    font-size: 0.85rem;
    opacity: 0.4;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
  }

  p {
    margin: 0;
  }

  button {
    height: 32px;
    width: 32px;
    color: grey;
    background: rgba(grey, 0.1);
    border: none;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;

    &:hover {

      hr {
        opacity: 0.8;
      }
    }

    hr {
      position: absolute;
      width: 50%;
      height: 2px;
      border-width: 0;
      color: black;
      background-color: black;
      opacity: 0.4;
    }

    hr.to-left {
      transform: rotate(45deg);
      transform-origin: center;
    }

    hr.to-right {
      transform: rotate(-45deg);
      transform-origin: center;
    }
  }
}
</style>