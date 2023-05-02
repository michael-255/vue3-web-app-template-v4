<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { Icon } from '@/types/icons'
import { RouteName } from '@/router/route-names'
import { getParentCategoryTypes, getLabel, getIcon, getSlug } from '@/services/Blueprints'
import { AppHeaderColor, AppName } from '@/types/misc'
import useRoutables from '@/composables/useRoutables'
import useUIStore from '@/stores/ui'

// Composables & Stores
const { goBack } = useRoutables()
const uiStore = useUIStore()
const route = useRoute()
</script>

<template>
  <QLayout view="hHh LpR lff">
    <!-- App Header Bar -->
    <QHeader elevated :class="`bg-${AppHeaderColor}`">
      <QToolbar>
        <QBtn flat round :icon="Icon.MENU_STANDARD" @click="uiStore.drawer = !uiStore.drawer" />

        <QToolbarTitle>{{ AppName }}</QToolbarTitle>

        <QBtn
          v-if="route.name !== RouteName.DASHBOARD"
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
        <QAvatar size="96px" color="white" class="q-my-md">
          <img src="@/assets/menu-avatar.png" />
        </QAvatar>
      </div>

      <QList>
        <!-- Dashboard Link -->
        <QItem clickable v-ripple :to="{ name: RouteName.DASHBOARD }">
          <QItemSection avatar>
            <QIcon color="primary" :name="Icon.DASHBOARD" />
          </QItemSection>
          <QItemSection>Dashboard</QItemSection>
        </QItem>

        <QSeparator spaced="md" inset />

        <!-- Parent Data Links (uses DataBlueprint) -->
        <QItem
          v-for="(parentType, i) in getParentCategoryTypes()"
          :key="i"
          clickable
          v-ripple
          :to="{
            name: RouteName.DATA,
            params: { databaseTypeSlug: getSlug(parentType) },
          }"
        >
          <QItemSection avatar>
            <QIcon color="primary" :name="getIcon(parentType)" />
          </QItemSection>
          <QItemSection>{{ getLabel(parentType, 'plural') }}</QItemSection>
        </QItem>

        <QSeparator spaced="md" inset />

        <!-- Common App Links -->
        <QItem clickable v-ripple :to="{ name: RouteName.SETTINGS }">
          <QItemSection avatar>
            <QIcon color="primary" :name="Icon.SETTINGS" />
          </QItemSection>
          <QItemSection>Settings</QItemSection>
        </QItem>

        <QItem clickable v-ripple :to="{ name: RouteName.FAQ }">
          <QItemSection avatar>
            <QIcon color="primary" :name="Icon.HELP" />
          </QItemSection>
          <QItemSection>FAQ</QItemSection>
        </QItem>

        <QItem clickable v-ripple :to="{ name: RouteName.ABOUT }">
          <QItemSection avatar>
            <QIcon color="primary" :name="Icon.INFO" />
          </QItemSection>
          <QItemSection>About</QItemSection>
        </QItem>

        <QItem clickable v-ripple active-class="text-warning" :to="{ name: RouteName.DONATE }">
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
