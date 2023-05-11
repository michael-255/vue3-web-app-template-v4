<script setup lang="ts">
import { AppName } from '@/types/general'
import { useMeta } from 'quasar'
import ResponsivePage from '@/components/ResponsivePage.vue'

useMeta({ title: `${AppName} - 404` })
</script>

<template>
  <ResponsivePage>
    <QCard>
      <QCardSection class="bg-negative text-white">
        <div class="text-h3">404</div>
        <div class="text-subtitle1">Page Not Found</div>
      </QCardSection>
    </QCard>
  </ResponsivePage>
</template>
