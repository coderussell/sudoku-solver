<template>
  <div class="input-wrapper">
    <input :class="{ 'solved': solvedIndices.includes(index - 1) }" ref="cell" type="text" :value="value" maxlength="1"
      @focus="emit('focused', index)" @focusout="emit('focused', -1)" @keypress.prevent="update($event)"
      @click="moveCaret($event)" @keyup.backspace="emit('update:modelValue', 0)" />
  </div>
</template>

<script setup lang="ts">
import { useSolver } from '@/stores/solver';
import { toRefs, computed } from 'vue';

const props = defineProps<{
  modelValue: number;
  index: number;
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'focused', index: number): void
}>()

const { index, modelValue } = toRefs(props)

const solver = useSolver()
const { solvedIndices } = solver

const value = computed(() => {
  return modelValue?.value || '';
})

const validInput = (input: any): boolean => {
  return Number.isInteger(input) && input > 0 && input < 10;
}

const moveCaret = (event: any) => {
  event.target.setSelectionRange(1, 1)
}

const update = (input: any) => {
  if (input.key === "backspace") return emit('update:modelValue', 0)
  let parsedInput: number = Number(input.key)
  if (!validInput(parsedInput)) parsedInput = 0;
  if (!!value.value && parsedInput === 0) return;
  emit('update:modelValue', parsedInput)
  solver.validate()
}

// const value = computed({
//   get() {
//     return props.modelValue ? props.modelValue : ''
//   },
//   set(value) {
//     let parsedValue: number = Number(value)
//     if (!validInput(parsedValue)) parsedValue = 0;
//     emit('update:modelValue', parsedValue)
//   }
// })



</script>

<style scoped lang="scss">
.input-wrapper {
  height: 100%;
  overflow: hidden;
  background: transparent;
}

input {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  text-align: center;
  font-size: 1.125rem;
  padding: 0;
  caret-color: transparent;
  cursor: pointer;
  background: transparent;

  &.solved {
    color: #4B3F72;
    font-weight: 600;
  }
}
</style>