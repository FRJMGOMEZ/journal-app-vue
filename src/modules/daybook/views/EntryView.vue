<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ entryDate.date }}</span>
        <span class="mx-1 fs-3">{{ entryDate.month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ entryDate.year }}</span>
      </div>
      <div>
        <input
          type="file"
          @change="onImageSelected"
          ref="imageSelector"
          v-show="false"
          accept="image/png, image/jpeg"
        />
        <button
          v-if="entry.id"
          @click="removeEntry"
          class="btn btn-danger mx-2 m-1"
        >
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button @click="onSelectImage" class="btn btn-primary">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
    </div>
    <Fab :icon="'fa-save'" @on:click="saveEntry" />
    <img
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="entry-picture"
      class="img-thumbnail"
    />
    <img
      v-if="localImage"
      :src="localImage"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </template>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";
import Swal from "sweetalert2";
import uploadImage from "@/modules/daybook/helpers/uploadImage";

export default {
  name: "EntryView",
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
      localImage: null,
      file: null,
    };
  },
  methods: {
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
    loadEntryById() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }

      this.entry = entry;
      this.setParsedDay();
    },
    setParsedDay() {
      const { date, month, year } = getDayMonthYear(this.entry.date);
      this.entryDate = { date, month, year };
    },
    async saveEntry() {
      new Swal({
        title: "Espere por favor",
        allowOursideClick: false,
      });
      Swal.showLoading();

      if (this.file) {
        const picture = await uploadImage(this.file);
        this.entry.picture = picture;
      }

      this.file = null;
      this.localImage = null;

      let entryId = this.entry.id;
      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const { id } = await this.createEntry(this.entry);
        entryId = id;
      }
      this.$router.push({ name: "entry", params: { id:entryId } });
      Swal.fire("Guardado", "Entrada registrada con éxito.");
    },
    async removeEntry() {
      const { isConfirmed } = await Swal.fire({
        title: "¿Estas segur@?",
        text: "Una vez borrado, no se puede recuperar",
        showDenyButton: true,
        confirmButtonText: "Sí, estoy seguro.",
      });
      if (isConfirmed) {
        new Swal({
          title: "Espere por favor",
          allowOursideClick: false,
        });
        Swal.showLoading();
        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: "no-entry" });
        Swal.fire("Borrado", "", "success");
      }
    },
    onSelectImage() {
      this.$refs.imageSelector.click();
    },
    onImageSelected(event) {
      const file = event.target.files[0];
      if (!file) return;
      this.file = file;
      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(file);
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

.entry-title {
  margin: 10px;
  margin-left: 30px;
}
</style>
