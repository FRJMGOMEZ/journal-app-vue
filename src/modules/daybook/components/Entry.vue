<template>
    <div class="entry-container mb-3 pointer p-2" @click="$router.push({name:'entry',params:{id:10}})">
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">15</span>
            <span class="mx-1 fs-5">Julio</span>
            <span class="mx-2 fw-light">2024, jueves</span>
        </div>
        <div class="entry-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae cupiditate, aliquid corrupti tenetur tempore
            molestias molestiae facilis commodi ut. Similique earum ullam debitis labore, architecto quo hic accusantium
            quibusdam illo.
        </div>
    </div>
</template>

<script>
export default {
    name: 'EntryComponent'
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

    .entry-description{
     font-size: 12px;
    }

}



</style>