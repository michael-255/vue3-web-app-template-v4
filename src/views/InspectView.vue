<script setup lang="ts">
import { Icon } from '@/types/icons'
import { AppName } from '@/types/misc'
import { useMeta } from 'quasar'
import ResponsivePage from '@/components/ResponsivePage.vue'

useMeta({ title: `${AppName} - Inspect` })
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.INSPECT" bannerTitle="Inspect"> </ResponsivePage>
</template>
