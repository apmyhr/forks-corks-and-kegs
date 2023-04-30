<template>
  <section class="my-2" :style="{ '--video-ratio': ratio }">
    <v-layout column align-center justify-center>
      <iframe
        class="video-frame"
        :width="width"
        :height="height"
        src="https://www.youtube.com/embed/Zl6JemTuu-Y"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </v-layout>
  </section>
</template>

<script>
const RATIO = 1080 / 1920;
const INITIAL_WIDTH = 1280;

export default {
  name: "VideoSection",

  data() {
    return {
      ratio: RATIO,
      width: INITIAL_WIDTH,
      height: INITIAL_WIDTH * RATIO,
    };
  },
};
</script>

<style>
.video-frame {
  max-width: calc(90vw);
  max-height: calc(90vw * var(--video-ratio));
}
</style>
