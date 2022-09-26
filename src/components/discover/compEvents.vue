<template>
  {{ eventSuggestList }}
</template>
<script>
import { events } from "@/store/events";
import { getEventsWtihTag } from "@/services/core/events";
import { user } from "@/store/user";
export default {
  data() {
    return {
      user: user(),
      uTags: user().tags,
      events: events(),
      eventSuggestList: events().eventSuggestList,
    };
  },
  methods: {
    getEventsWtihTag: getEventsWtihTag,
  },
  mounted() {
    console.log(this.uTags);
    if (this.eventSuggestList.length == 0)
      this.getEventsWtihTag(this.uTags[0], null, 10).then((res) =>
        console.log(res)
      );
  },
};
</script>
