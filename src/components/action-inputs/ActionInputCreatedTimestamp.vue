<script setup lang="ts">
import { date } from 'quasar'
import { onMounted, type Ref, ref } from 'vue'
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  locked?: boolean
  label: string
}>()

// Composables & Stores
const actionStore = useActionStore()

// Data
const inputRef: Ref<any> = ref(null)
const displayedDate: Ref<string> = ref('')
const dateTimePicker: Ref<string> = ref('')

onMounted(() => {
  const existingTime = actionStore.record[DatabaseField.CREATED_TIMESTAMP]

  if (existingTime) {
    updateDates(existingTime)
  } else {
    updateDates()
  }
})

/**
 * Updates the displayed date model value and the action record store.
 * @param timestamp
 */
function updateDates(timestamp: number = new Date().getTime()) {
  actionStore.record[DatabaseField.CREATED_TIMESTAMP] = timestamp
  displayedDate.value = date.formatDate(timestamp, 'ddd, YYYY MMM Do, h:mm A')
}

/**
 * If a picker time exists, sets display date and model ref to the picker time.
 */
function onPickerDateTime() {
  if (dateTimePicker.value) {
    updateDates(new Date(dateTimePicker.value).getTime())
  }
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        {{ label }}
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        Exact date and time the record was created. Use the buttons on the right to select a
        customized date and time, or auto select it.
      </div>

      <QInput
        v-model="displayedDate"
        ref="inputRef"
        dense
        outlined
        disable
        color="primary"
        hint="Auto formatted"
      >
        <template v-slot:after>
          <!-- Date Picker -->
          <QBtn :disable="locked" :icon="Icon.CALENDAR_DATE" color="primary" class="q-px-sm">
            <QPopupProxy>
              <QDate v-model="dateTimePicker">
                <div class="row items-center justify-end q-gutter-sm">
                  <QBtn label="Cancel" flat v-close-popup />
                  <QBtn label="OK" color="primary" flat @click="onPickerDateTime()" v-close-popup />
                </div>
              </QDate>
            </QPopupProxy>
          </QBtn>

          <!-- Time Picker -->
          <QBtn :disable="locked" :icon="Icon.CLOCK" color="primary" class="q-ml-sm q-px-sm">
            <QPopupProxy>
              <QTime v-model="dateTimePicker" now-btn>
                <div class="row items-center justify-end q-gutter-sm">
                  <QBtn label="Cancel" flat v-close-popup />
                  <QBtn label="OK" color="primary" flat @click="onPickerDateTime()" v-close-popup />
                </div>
              </QTime>
            </QPopupProxy>
          </QBtn>

          <!-- Set DateTime to now -->
          <QBtn
            :disable="locked"
            :icon="Icon.CALENDAR_CHECK"
            color="positive"
            class="q-ml-sm q-px-sm"
            @click="updateDates()"
          />
        </template>
      </QInput>
    </QCardSection>
  </QCard>
</template>
