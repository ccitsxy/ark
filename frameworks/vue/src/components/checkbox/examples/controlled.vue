<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, type CheckboxCheckedState } from '../..'

const checked = ref<CheckboxCheckedState>(false)
</script>

<template>
  <Checkbox.Root v-model="checked">
    <Checkbox.Control />
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
</template>
