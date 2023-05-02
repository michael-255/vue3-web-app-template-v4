<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { SettingId } from '@/types/database'
import { Icon } from '@/types/icons'
import { RouteName } from '@/router/route-names'
import { AppName } from '@/types/misc'
import useDefaults from '@/composables/useDefaults'
import useUIStore from '@/stores/ui'
import DB from '@/services/LocalDatabase'

// Composables & Stores
const uiStore = useUIStore()
const { onDefaults } = useDefaults()

// Data
const exampleFavorite: Ref<number> = ref(0)

/**
 * Set the introduction setting value to false in settings to close the introduction card.
 */
async function onCloseIntroduction() {
  await DB.setSetting(SettingId.SHOW_INTRODUCTION, false)
}
</script>

<template>
  <QCard>
    <QCardSection>
      <div class="text-h6 q-mb-md">Introduction</div>

      <!-- App Information -->
      <div class="q-mb-md">
        Welcome to {{ AppName }}. This app provides a simple foundation to build your own web apps.
      </div>

      <!-- Favorites information -->
      <div class="q-mb-md">
        You are currently on the Dashboard page. This page gives you quick access to the primary
        data you work with in the app. You can favorite items on the Dashboard by clicking the star
        icon in the top right corner of the item like the example star below. This prioritizes the
        item to the top of the list.
      </div>

      <QRating
        v-model="exampleFavorite"
        :max="1"
        :icon="Icon.FAVORITE_OFF"
        :icon-selected="Icon.FAVORITE_ON"
        color="warning"
        size="md"
        class="q-mb-md"
      />

      <!-- Menu Information -->
      <div class="q-mb-md">
        You can navigate through the app using the menu in the top left corner of the page. A quick
        link is provided below. The menu gives you access to the primary data tables, Frequently
        Asked Questions (FAQ), Settings, and more. More advanced operations for the app are
        available on the Settings page.
      </div>

      <QBtn
        color="primary"
        class="q-mb-md q-px-sm"
        :icon="Icon.MENU_STANDARD"
        @click="uiStore.drawer = !uiStore.drawer"
      />

      <!-- Defaults Information -->
      <div class="q-mb-md">
        You can load default demostration data into the database to get started with the app right
        away by clicking the button below. This action can be repeated.
      </div>

      <QBtn
        color="primary"
        class="q-mb-md"
        label="Add Defaults"
        :icon="Icon.ADD_NOTE"
        @click="onDefaults()"
      />

      <!-- Donation Information -->
      <div class="q-mb-md">
        Hope you find {{ AppName }} useful. Please consider donating to help me continue to create
        and maintain apps like this. Thank you!
      </div>

      <QBtn
        class="q-mb-md"
        color="warning"
        label="Donate"
        :to="{ name: RouteName.DONATE }"
        :icon="Icon.DONATE"
      />

      <!-- Close Introduction Section -->
      <div class="q-mb-md">
        When you are ready, click the GOT IT button below to hide the Introduction. You can unhide
        the Introduction in the app Settings if needed.
      </div>

      <QBtn
        label="Got it"
        class="full-width"
        size="lg"
        color="positive"
        :icon="Icon.RECOMMEND"
        @click="onCloseIntroduction()"
      />
    </QCardSection>
  </QCard>
</template>
