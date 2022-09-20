<template>
  <q-btn label="Resim Ekle" @click="addImageButton" />
  <div class="hidden">
    <input
      @change="getImage"
      multiple
      ref="imgInput"
      type="file"
      accept="image/*"
    />
  </div>
  <div class="row justify-around">
    <div
      v-for="img in imgUrls"
      :key="img"
      :style="`background-image: url(${img});`"
      style="
        position: relative;
        max-width: 100px;
        min-width: 50px;
        width: 25vw;
        max-height: 75px;
        min-height: 30px;
        height: 20vw;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      "
    >
      <q-btn
        class="absolute-bottom"
        style="background-color: #ffffff50"
        flat
        @click="removeImage(img)"
        label="remove"
      />
    </div>
  </div>
</template>
<script>
import { eventAdd } from "@/store/eventAdd";
export default {
  data() {
    return {
      eventAdd: eventAdd(),
      imgUrls: [],
    };
  },
  methods: {
    addImageButton: function () {
      this.$refs.imgInput.click();
    },
    getImage: function (value) {
      const files = value.target.files;
      const il = this.imgUrls.length;
      for (let i = 0; i < files.length; i++) {
        this.eventAdd.images.push(files[i]);
        this.addImageUrl(files[i], i, il);
      }
    },
    addImageUrl: function (image, i, il) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        (img) => (this.imgUrls[i + il] = img.target.result),
        false
      );
      reader.readAsDataURL(image);
    },
    removeImage: function (value) {
      const i = this.imgUrls.indexOf(value);
      this.eventAdd.images.splice(i, 1);
      this.imgUrls.splice(i, 1);
    },
  },
};
</script>
