<template>
  <q-dialog v-model="pages.eventSettingsDialog" full-width position="bottom">
    <q-card>
      <q-card-section class="row">
        <div
          style="
            border: 2px solid rgba(180, 180, 180, 0.3);
            width: 50%;
            margin: auto;
          "
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row justify-center">
          <!--Share-->
          <q-btn flat @click="share">
            <div>
              <div>
                <img
                  :src="require('@/assets/images/eventSettings/share.svg')"
                />
              </div>
              <div>
                <span>Share</span>
              </div>
            </div>
          </q-btn>
          <!--Report-->
          <q-btn flat>
            <div>
              <div>
                <img
                  :src="require('@/assets/images/eventSettings/report.svg')"
                />
              </div>
              <div>
                <span>Report</span>
              </div>
            </div>
          </q-btn>
          <!--Foloow-->
          <q-btn flat>
            <div>
              <div>
                <img
                  :src="require('@/assets/images/eventSettings/logout.svg')"
                />
              </div>
              <div><span>Follow !</span></div>
            </div>
          </q-btn>
        </div>
        <div class="row justify-center">
          <!--Delete-->
          <q-btn flat>
            <div>
              <div>
                <img
                  :src="require('@/assets/images/eventSettings/delete.svg')"
                />
              </div>
              <div><span>Delete</span></div>
            </div>
          </q-btn>
          <!--Edit-->
          <q-btn flat>
            <div>
              <div>
                <img :src="require('@/assets/images/eventSettings/edit.svg')" />
              </div>
              <div><span>Edit</span></div>
            </div>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { pages } from "@/store/pages";
export default {
  data() {
    return {
      pages: pages(),
    };
  },
  methods: {
    share: function () {
      if (navigator.share)
        navigator
          .share({
            title: "Share Event",
            text: "There is amaing event You should come to :)",
            url: `https://gogol-test-app.web.app/app/main/events/event/${this.pages.event.id}`,
          })
          .then(() => console.log("Successful share"))
          .catch((error) => console.log("Error sharing", error));
      else {
        console.log(
          `https://gogol-test-app.web.app/app/main/events/event/${this.pages.event.id}`
        );
      }
    },
  },
};
</script>
