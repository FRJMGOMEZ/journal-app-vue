<template>
  <template v-if="entry">
    <div  class="entry-title d-flex justify-content-between p2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ entryDate.date }}</span>
        <span class="mx-1 fs-3">{{ entryDate.month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ entryDate.year }}</span>
      </div>
      <div>
        <button class="btn btn-danger mx-2 m-1">
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
    </div>
    <Fab :icon="'fa-save'" />
    <img
      src="https://buffy.mlpforums.com/monthly_10_2013/post-18536-0-17144400-1381282031.jpg"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </template>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },
  data() {
    return {
      entry: null,
      entryDate: { date: null, month: null, year: null },
    };
  },
  methods: {
    loadEntryById() {
      const entry = this.getEntryById(this.id);
      if (!entry) return this.$router.push({ name: "no-entry" });
      this.entry = entry;
      this.setParsedDay();
    },
    setParsedDay() {
      const { date, month, year } = getDayMonthYear(this.entry.date);
      this.entryDate = { date, month, year };
    },
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
  },
  created() {
    this.loadEntryById();
  },
  watch: {
    id() {
      this.loadEntryById();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 100px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>