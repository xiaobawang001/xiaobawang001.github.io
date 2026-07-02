<script setup lang="ts">
import { useBreadcrumb } from '../composables/use-breadcrumb'

const { crumbs, visible } = useBreadcrumb()
</script>

<template>
  <nav v-if="visible" class="NavBreadcrumb" aria-label="当前位置">
    <span
      v-for="(crumb, index) in crumbs"
      :key="`${crumb}-${index}`"
      class="crumb"
      :class="{ 'is-last': index === crumbs.length - 1 }"
    >
      <span v-if="index > 0" class="sep" aria-hidden="true">/</span>
      <span class="label">{{ crumb }}</span>
    </span>
  </nav>
</template>

<style scoped>
.NavBreadcrumb {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  min-height: 20px;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
  color: var(--yuque-text-secondary);
  pointer-events: none;
  user-select: none;
}

.crumb {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  flex-shrink: 1;
}

.crumb.is-last {
  flex-shrink: 1;
  min-width: 0;
}

.crumb.is-last .label {
  display: block;
  color: var(--yuque-text);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
}

.crumb:not(.is-last) {
  flex-shrink: 0;
}

.sep {
  margin: 0 6px;
  color: var(--yuque-text-secondary);
  opacity: 0.7;
}

.label {
  line-height: 20px;
  white-space: nowrap;
}
</style>
