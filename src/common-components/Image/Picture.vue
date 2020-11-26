<template>
  <div>
    <img v-if="source" :src="source" :alt="type" :style="config" class="photo" />
    <div v-else>...</div>
  </div>
</template>

<script>
import { getAssistedPicture } from '@/services/assisted.js';
import { getAuthorPicture } from '@/services/author.js';

export default {
  props: {
    // assisted||author id
    itemId: {
      type: [String, Number],
    },
    // Define from which endpoint it will use
    type: {
      type: String,
      default: 'assisted', // author
    },
    // Customize image css, uses object css syntax
    config: {
      type: Object,
      default: () => ({ height: '50px', width: '50px', borderRadius: '5px' }),
    },
  },
  data: () => ({
    image: null,
  }),
  watch: {
    itemId: {
      handler() {
        if (this.itemId) {
          this.getPicture(this.itemId);
        }
      },
      immediate: true,
    },
  },
  computed: {
    source() {
      if (this.image) {
        let extension;
        let { name, base64 } = this.image;

        name = name.split('.');
        extension = name[name.length - 1];
        return `data:image/${extension};base64,${base64}`;
      }
      return false;
    },
  },
  methods: {
    async getPicture(id) {
      this.image = null;
      let picture;
      if (this.type == 'author') {
        picture = await getAuthorPicture(id);
      } else {
        picture = await getAssistedPicture(id);
      }
      this.image = picture;
    },
  },
};
</script>

<style scoped>
.photo {
  border-radius: 10px;
}
</style>
