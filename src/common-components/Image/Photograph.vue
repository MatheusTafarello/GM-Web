<template>
  <div>
    <img
      v-if="source"
      :src="require(`@/../../GM-API/src/uploads/${source}`)"
      :alt="source"
      :height="size"
      :width="size"
    />
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
    },
    size: {
      type: String,
      default: 'auto',
    },
  },
};
</script>
