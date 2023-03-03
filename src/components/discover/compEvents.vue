<template>
  <q-scroll-area style="width: 100vw; height: 100%">
    <q-infinite-scroll
      @load="() => ''"
      :offset="0"
      v-if="eventSuggestList.length != 0"
    >
      <div v-for="eID in eventSuggestList" :key="eID">
        <comp-event v-if="eventDict[eID]" :event="eventDict[eID]" :tags="[]" />
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-scroll-area>
</template>
<script>
import { events } from "@/store/event";
import { getEventsWtihTag } from "@/services/core/events";
import { user } from "@/store/user";
import compEvent from "../general/compEvent.";
export default {
  components: { compEvent },
  data() {
    return {
      user: user(),
      uTags: user().tags,
      events: events(),
      eventDict: events().eventDict,
      eventSuggestList: events().eventSuggestList,
    };
  },
  methods: {
    getEventsWtihTag: getEventsWtihTag,
    addEventsWithSuggestionList: events().addEventsWithSuggestionList,
  },
  mounted() {
    if (this.eventSuggestList.length == 0)
      this.getEventsWtihTag(this.uTags[0], null, 5).then((res) =>
        this.addEventsWithSuggestionList(res)
      );
  },
};
</script>
