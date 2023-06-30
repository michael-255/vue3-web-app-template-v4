<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { recordGroups } from '@/types/core'
import { AppHeaderColor, AppName } from '@/constants/global'
import { Icon, routeNames } from '@/types/general'
import DataSchema from '@/services/DataSchema'
import useRoutables from '@/composables/useRoutables'
import useUIStore from '@/stores/ui'

const { goBack } = useRoutables()
const uiStore = useUIStore()
const route = useRoute()

const groupOptions = DataSchema.getGroupOptions(recordGroups.Values.core)
</script>

<template>
  <QLayout view="hHh LpR lff">
    <!-- App Header Bar -->
    <QHeader elevated :class="`bg-${AppHeaderColor}`">
      <QToolbar>
        <QBtn flat round :icon="Icon.MENU_STANDARD" @click="uiStore.drawer = !uiStore.drawer" />

        <QToolbarTitle>{{ AppName }}</QToolbarTitle>

        <QBtn
          v-if="route.name !== routeNames.Values.Dashboard"
          flat
          round
          :icon="Icon.BACK"
          @click="goBack()"
        />
      </QToolbar>
    </QHeader>

    <!-- Menu Drawer -->
    <QDrawer v-model="uiStore.drawer" :width="250" show-if-above bordered side="left">
      <div class="row justify-center">
        <QAvatar size="96px" class="q-my-md">
          <img src="@/assets/menu-avatar.png" />
        </QAvatar>
      </div>

      <QList>
        <!-- Dashboard Link -->
        <QItem clickable v-ripple :to="{ name: routeNames.Values.Dashboard }">
          <QItemSection avatar>
            <QIcon color="primary" :name="Icon.DASHBOARD" />
          </QItemSection>
          <QItemSection>Dashboard</QItemSection>
        </QItem>

        <QSeparator spaced="md" inset />

        <!-- Parent Data Table Links -->
        <QItem
          v-for="(opt, i) in groupOptions"
          :key="i"
          clickable
          v-ripple
          :to="{
            name: routeNames.Values.DataRecords,
            params: { group: opt?.value?.group, type: opt?.value?.type },
          }"
        >
          <QItemSection avatar>
            <QIcon color="primary" :name="opt.icon" />
          </QItemSection>
          <QItemSection>{{ opt.label }}</QItemSection>
        </QItem>

        <QSeparator spaced="md" inset />

        <!-- Common App Links -->
        <QItem clickable v-ripple :to="{ name: routeNames.Values.Settings }">
          <QItemSection avatar>
            <QIcon color="primary" :name="Icon.SETTINGS" />
          </QItemSection>
          <QItemSection>Settings</QItemSection>
        </QItem>

        <QItem clickable v-ripple :to="{ name: routeNames.Values.FAQ }">
          <QItemSection avatar>
            <QIcon color="primary" :name="Icon.HELP" />
          </QItemSection>
          <QItemSection>FAQ</QItemSection>
        </QItem>

        <QItem clickable v-ripple :to="{ name: routeNames.Values.About }">
          <QItemSection avatar>
            <QIcon color="primary" :name="Icon.INFO" />
          </QItemSection>
          <QItemSection>About</QItemSection>
        </QItem>

        <QItem
          clickable
          v-ripple
          active-class="text-warning"
          :to="{ name: routeNames.Values.Donate }"
        >
          <QItemSection avatar>
            <QIcon color="warning" :name="Icon.DONATE" />
          </QItemSection>
          <QItemSection>Donate</QItemSection>
        </QItem>
      </QList>
    </QDrawer>

    <!-- Router View -->
    <QPageContainer>
      <RouterView v-slot="{ Component, route }">
        <transition name="global-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </QPageContainer>
  </QLayout>
</template>