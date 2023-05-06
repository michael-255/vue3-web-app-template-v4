<script setup lang="ts">
import { Icon } from '@/types/icons'
import { AppName } from '@/types/misc'
import { useMeta } from 'quasar'
import ResponsivePage from '@/components/ResponsivePage.vue'

useMeta({ title: `${AppName} - Data Table` })
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.TABLE" bannerTitle="Data Table"> </ResponsivePage>
</template>
