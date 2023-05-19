<script setup lang="ts">
import { Icon } from '@/types/icons'

// Props & Emits
defineProps<{
  bannerIcon?: Icon
  bannerTitle?: string
  showPageError?: boolean
  showPageNoData?: boolean
}>()
</script>

<template>
  <QPage padding>
    <div class="row justify-center">
      <div class="col-md-8 col-sm-10 col-xs-12">
        <!-- Optional Banner -->
        <QCard v-if="bannerIcon && bannerTitle" class="q-mb-md">
          <QCardSection class="text-h6">
            <QIcon class="q-pb-xs q-pr-xs" :name="bannerIcon" />
            {{ bannerTitle }}
          </QCardSection>
        </QCard>

        <!-- Page Error -->
        <!-- Use as a catch-all for errors at the View level -->
        <QCard v-if="showPageError">
          <QCardSection>
            <div class="text-h6 q-mb-md">Page Error</div>
            <div>
              The page was unable to load due to an error. Troubleshoot using the application Logs
              if the problem persists.
            </div>
          </QCardSection>
        </QCard>

        <!-- Page No Data -->
        <!-- Use as a catch-all for missing data at the View level -->
        <div v-else-if="showPageNoData">
          <QCard class="q-mb-md">
            <QCardSection>
              <div class="text-h6 q-mb-md">No Data Available</div>
              <div>This item may not have any data to display on the this page.</div>
            </QCardSection>
          </QCard>
        </div>

        <!-- Slot for additional page content -->
        <div v-else>
          <slot />
        </div>

        <!-- Extra space at page bottom so scroller doesn't cover content  -->
        <div class="q-mb-xl" />
      </div>
    </div>

    <!-- Page Scroller -->
    <QPageScroller>
      <QBtn fab :icon="Icon.TOP_OF_PAGE" color="accent" />
    </QPageScroller>
  </QPage>
</template>
