<template>
    <div class="entry-container mb-3 pointer p-2" @click="$router.push({ name: 'entry', params: { id: entry.id } })">
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">{{ dayParsed.date }}</span>
            <span class="mx-1 fs-5">{{ dayParsed.month }}</span>
            <span class="mx-2 fw-light">{{ dayParsed.year }}, {{ dayParsed.day }}</span>
        </div>
        <div class="entry-description">
            {{ shortText }}
        </div>
    </div>
</template>

<script>

import getDayMonthYear from '../helpers/getDayMonthYear';

export default {
    name: 'EntryComponent',
    props: {
        entry: {
            type: Object,
            required: true
        }
    },
    computed: {
        shortText() {
            return this.entry.text.length > 130 ? this.entry.text.substring(0, 130) + '...' : this.entry.text
        },
        dayParsed() { return getDayMonthYear(this.entry.date) }
    },
    created() {

    }

}
</script>

<style lang="scss" scoped>
.pointer {
    cursor: pointer;
}

.entry-container {
    border-bottom: 1px solid;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }

    .entry-description {
        font-size: 12px;
    }

}
</style>