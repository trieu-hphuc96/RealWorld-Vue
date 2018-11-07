<template>
  <a href="" v-on:click.prevent="$emit('getArticlesByTag',tag)" class="tag-pill tag-default">{{tag}}</a>
</template>

<script>
export default {
  name: 'tag',
  props: ['tag']
};
</script>

<style>
</style>
