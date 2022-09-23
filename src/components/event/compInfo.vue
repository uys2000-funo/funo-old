<template>
  <div class="text-center text-lg">{{ event.name }}</div>
  <div class="text-center row justify-around">
    <q-btn rounded dense flat>
      <g-icon src="call.svg" sizeO="8vw" />
    </q-btn>
    <q-btn rounded dense flat>
      <g-icon src="location.svg" sizeO="8vw" />
    </q-btn>
    <q-btn rounded dense flat>
      <g-icon src="message2.svg" sizeO="8vw" />
    </q-btn>
    <q-btn rounded dense flat>
      <g-icon src="share.svg" sizeO="8vw" />
    </q-btn>
    <q-btn>Takip Et</q-btn>
  </div>
  <div>
    <g-icon src="clock.svg" size="10vw" />
    {{ event.startDate?.time }}-{{ event.endDate?.time }}
    <g-icon src="calendar.svg" size="10vw" />
    {{ event.startDate?.date }}
  </div>
  <div>
    <g-icon src="sandClock.svg" size="10vw" />
    {{ event.ageRange?.min }}-{{ event.ageRange?.max }}
    <g-icon src="sandClock.svg" size="10vw" />
    {{ event.price }}
  </div>
  <div style="min-height: 15vw" class="row no-wrap items-center content-center">
    <g-icon src="location.svg" sizeO="15vw" />
    {{ event.app?.text }}
  </div>
  <div style="min-height: 15vw" class="row no-wrap items-center content-center">
    <g-icon src="tag.svg" sizeO="15vw" />
    {{ event.desc }}
  </div>
  <div>
    <g-icon src="gender.svg" sizeO="15vw" />
    <comp-participants-vue :userIDs="event.users" />
  </div>
</template>
<script>
import gIcon from "@/components/gIcon.vue";
import compParticipantsVue from "@/components/general/compEvent/compParticipants.vue";
export default {
  components: {
    compParticipantsVue,
    gIcon,
  },
  props: ["event"],
};
</script>
