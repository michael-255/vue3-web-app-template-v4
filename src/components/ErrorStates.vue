<script setup lang="ts">
import { Icon } from '@/types/general'

defineProps<{
  error: 'unknown' | 'not-found' | 'no-data'
}>()
</script>

<template>
  <!-- Unknown -->
  <div v-if="error === 'unknown'">
    <div class="row justify-center">
      <QIcon class="col-12 text-center q-mb-sm" :name="Icon.WARN" size="80px" color="warning" />
      <p class="text-body1">An error has occurred</p>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else-if="error === 'not-found'">
    <div class="row justify-center">
      <QIcon class="col-12 text-center q-mb-sm" :name="Icon.NOT_FOUND" size="80px" color="accent" />
      <p class="text-body1">This content was not found</p>
    </div>
  </div>

  <!-- No Data -->
  <div v-else-if="error === 'no-data'">
    <div class="row justify-center">
      <QIcon class="col-12 text-center q-mb-sm" :name="Icon.TABLE" size="80px" color="grey" />
      <p class="text-body1">No data available</p>
    </div>
  </div>
</template>
