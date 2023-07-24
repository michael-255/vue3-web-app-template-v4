<script setup lang="ts">
import { percentSchema } from '@/models/ExampleResults'
import useActionStore from '@/stores/action'

const actionStore = useActionStore()
</script>

<template>
  <div class="text-weight-bold text-body1">Percentage</div>

  <QInput
    v-model.number="actionStore.record.percent"
    :rules="[(val: number) => percentSchema.safeParse(val).success || 'Must be between 1 and 100']"
    type="number"
    step="0.05"
    lazy-rules
    dense
    outlined
    color="primary"
  />
</template>
