<script setup lang="ts">
import { Icon } from '@/types/icons'
import { AppName } from '@/types/misc'
import { useMeta } from 'quasar'
import ResponsivePage from '@/components/ResponsivePage.vue'

useMeta({ title: `${AppName} - Donate` })
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.DONATE" bannerTitle="Donate">
    <QCard>
      <QCardSection>
        <div class="q-mb-md">
          Hope you enjoyed using {{ AppName }}. I try to create and maintain projects that people
          find useful. Please consider donating to help me out. Thank you!
        </div>

        <div class="q-mb-md">
          Donations are done through Ko-fi. It's safe, easy to use, and doesn't require an account.
        </div>

        <div class="row q-col-gutter-md justify-center">
          <div class="col-sm-6 col-xs-12">
            <QBtn
              class="full-width"
              color="warning"
              label="Support me on Ko-fi"
              target="_blank"
              href="https://ko-fi.com/michael255"
              :icon="Icon.WEB"
            />
          </div>
        </div>
      </QCardSection>
    </QCard>
  </ResponsivePage>
</template>
