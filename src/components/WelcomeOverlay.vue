<script setup lang="ts">
import { Icon } from '@/types/icons'
import { type Ref, ref, onUnmounted } from 'vue'
import { RouteName } from '@/router/route-names'
import { AppName } from '@/types/misc'
import { Key } from '@/types/database'
import useLogger from '@/composables/useLogger'
import useDefaults from '@/composables/useDefaults'
import DB from '@/services/LocalDatabase'

// Composables & Stores
const { onDefaults } = useDefaults()
const { log } = useLogger()

// Data
const exampleFavorite: Ref<number> = ref(0)
const showWelcome: Ref<any> = ref(false)

// Subscriptions
const subscription = DB.liveSettings().subscribe({
  next: (liveSettings) => {
    showWelcome.value = liveSettings.find((s) => s.key === Key.SHOW_WELCOME)?.value
  },
  error: (error) => {
    log.error('Error fetching live Settings', error)
  },
})

onUnmounted(() => {
  subscription.unsubscribe()
})

/**
 * Set Welcome Overlay setting value to false in settings to close the dialog card.
 */
async function onCloseWelcomeOverlay() {
  await DB.setSetting(Key.SHOW_WELCOME, false)
}
</script>

<template>
  <QDialog v-model="showWelcome" persistent>
    <QCard>
      <QCardSection>
        <p class="text-h6 q-mb-md">Welcome to {{ AppName }}</p>

        <!-- Information -->
        <p class="q-mb-md">This app provides a foundation to build your own web apps.</p>

        <!-- Favorites -->
        <div class="q-mb-md">
          <p>
            You are currently on the Dashboard page. This page gives you quick access to the primary
            data you work with in the app. You can favorite items on the Dashboard by clicking the
            star icon in the top right corner of the item. This prioritizes the item to the top of
            the list. An example of the favorite icon button is below.
          </p>
          <QRating
            v-model="exampleFavorite"
            :max="1"
            :icon="Icon.FAVORITE_OFF"
            :icon-selected="Icon.FAVORITE_ON"
            color="warning"
            size="md"
          />
        </div>

        <!-- Menu -->
        <div class="q-mb-md">
          <p>
            You can navigate through the app using the menu in the top left corner of the page. An
            example of the menu button is below. The menu gives you access to the primary data
            tables, Frequently Asked Questions (FAQ), Settings, and more. More advanced operations
            for the app are available on the Settings page.
          </p>
          <QBtn color="primary" class="q-px-sm" :icon="Icon.MENU_STANDARD" />
        </div>

        <!-- Defaults -->
        <div class="q-mb-md">
          <p>
            You can load default demostration data into the database to get started with the app
            right away by clicking the button below. This action can be repeated.
          </p>
          <QBtn color="primary" label="Add Defaults" :icon="Icon.ADD_NOTE" @click="onDefaults()" />
        </div>

        <!-- Donation -->
        <div class="q-mb-md">
          <p>
            Hope you find {{ AppName }} useful. Please consider donating to help me continue to
            create and maintain apps like this. Thank you!
          </p>
          <QBtn
            color="warning"
            label="Donate"
            :to="{ name: RouteName.DONATE }"
            :icon="Icon.DONATE"
          />
        </div>

        <!-- Close Welcome Overlay -->
        <div>
          <p>Click the button below when you are ready to get started.</p>
          <QBtn
            no-caps
            :label="`Use ${AppName}`"
            class="full-width"
            size="lg"
            color="positive"
            :icon="Icon.RECOMMEND"
            @click="onCloseWelcomeOverlay()"
          />
        </div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>
