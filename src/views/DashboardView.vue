<script setup lang="ts">
import { Icon } from '@/types/general'
import { useMeta } from 'quasar'
import { ref, type Ref, onUnmounted, onMounted } from 'vue'
import { AppName } from '@/constants/global'
import { SettingKey } from '@/models/Setting'
import { Example } from '@/models/Example'
import { Test } from '@/models/Test'
import { DBTable } from '@/types/database'
import ResponsivePage from '@/components/ResponsivePage.vue'
import WelcomeOverlay from '@/components/WelcomeOverlay.vue'
import useUIStore from '@/stores/ui'
import useLogger from '@/composables/useLogger'
import ExampleCardList from '@/components/dashboard/ExampleCardList.vue'
import TestCardList from '@/components/dashboard/TestCardList.vue'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Dashboard` })

const uiStore = useUIStore()
const { log } = useLogger()

const dashboardOptions = [
  {
    value: DBTable.EXAMPLES,
    label: Example.getLabel('plural'),
    icon: Icon.EXAMPLES,
  },
  {
    value: DBTable.TESTS,
    label: Test.getLabel('plural'),
    icon: Icon.TESTS,
  },
]
const showDescriptions = ref(false)
const dashboardExamples: Ref<Example[]> = ref([])
const dashboardTests: Ref<Test[]> = ref([])

const examplesSubscription = DB.liveExamples().subscribe({
  next: (liveExamples) => (dashboardExamples.value = liveExamples),
  error: (error) => log.error('Error fetching live Examples', error),
})

const testsSubscription = DB.liveTests().subscribe({
  next: (liveTests) => (dashboardTests.value = liveTests),
  error: (error) => log.error('Error fetching live Tests', error),
})

onMounted(async () => {
  showDescriptions.value = Boolean(await DB.getSettingValue(SettingKey.DASHBOARD_DESCRIPTIONS))
})

onUnmounted(() => {
  examplesSubscription.unsubscribe()
  testsSubscription.unsubscribe()
})
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.DASHBOARD" bannerTitle="Dashboard">
    <WelcomeOverlay />

    <section class="q-mb-md">
      <p class="text-center text-body1">
        {{ dashboardOptions.find((i) => i.value === uiStore.dashboardSelection)?.label }}
      </p>

      <div class="row justify-center">
        <QBtn
          v-for="(option, i) in dashboardOptions"
          :key="i"
          round
          size="lg"
          class="q-mb-xs q-mx-xs"
          :icon="option.icon"
          :color="uiStore.dashboardSelection === option.value ? 'info' : 'grey'"
          @click="uiStore.dashboardSelection = option.value"
        />
      </div>
    </section>

    <section>
      <ExampleCardList
        v-show="uiStore.dashboardSelection === DBTable.EXAMPLES"
        :examples="dashboardExamples"
        :showDescriptions="showDescriptions"
      />
      <TestCardList
        v-show="uiStore.dashboardSelection === DBTable.TESTS"
        :tests="dashboardTests"
        :showDescriptions="showDescriptions"
      />
    </section>
  </ResponsivePage>
</template>
