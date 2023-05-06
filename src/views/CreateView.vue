<script setup lang="ts">
import { Icon } from '@/types/icons'
import { AppName } from '@/types/misc'
import { useMeta } from 'quasar'
import ResponsivePage from '@/components/ResponsivePage.vue'

useMeta({ title: `${AppName} - Create` })
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.CREATE" bannerTitle="Create"> </ResponsivePage>
</template>
