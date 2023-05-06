<script setup lang="ts">
import { Icon } from '@/types/icons'
import { AppName } from '@/types/misc'
import { useMeta } from 'quasar'
import ResponsivePage from '@/components/ResponsivePage.vue'

useMeta({ title: `${AppName} - Edit` })
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.EDIT" bannerTitle="Edit"> </ResponsivePage>
</template>
