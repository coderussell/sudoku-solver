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
      <button @click="solver.reset">Reset</button>
      <button @click="solver.solve">Solve</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useSolver } from '../stores/solver';
import Cell from '@/components/Cell.vue';

const solver = useSolver();
const { sudoku } = solver

const focusedIndex: Ref<number | null> = ref(null)
const whiteCells = [4, 5, 6, 13, 14, 15, 22, 23, 24, 28, 29, 30, 37, 38, 39, 46, 47, 48, 34, 35, 36, 43, 44, 45, 52, 53, 54, 58, 59, 60, 67, 68, 69, 76, 77, 78]

const changeFocus = (index: number) => focusedIndex.value = index

window.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') return changeFocus(-1)
})

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
    background: rgba(purple, 0.04);
    color: rgba(0, 0, 0, 0.2);
    font-size: 0.875rem;
    border-radius: 4px;
    width: 100%;
    overflow: hidden;

    &.focused-cell,
    &:hover {
      box-shadow: 0 0 1px white, 0 0 4px rgba(purple, 0.5);
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

  button {
    height: 48px;
    width: 99px;
    font-size: 1.25rem;
    border: 2px solid purple;
    border-radius: 12px;
    background: none;
    color: purple;
    cursor: pointer;

    &:hover {
      background-color: purple;
      color: white;
      border: 2px solid purple;
    }

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>