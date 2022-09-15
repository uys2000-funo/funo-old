<template>{{ user.jEvents }}</template>
<script>
import { user } from "@/store/user";
export default {
  data() {
    return {
      user: user(),
    };
  },
};
</script>
