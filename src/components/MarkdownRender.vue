<script setup lang="ts">
import { computed } from "vue";
import MarkdownIt from "markdown-it";

interface Props {
  content: string;
}

const props = defineProps<Props>();

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
});

const rendered = computed(() => md.render(props.content));
</script>

<template>
  <div class="markdown-body" v-html="rendered"></div>
</template>

<style scoped>
.markdown-body h1 {
  font-size: 1.5rem;
  font-weight: bold;
}
.markdown-body p {
  margin: 0.5rem 0;
}
.markdown-body code {
  background: #f3f3f3;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}
</style>
