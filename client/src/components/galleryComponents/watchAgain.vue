<template>
<div class="body" v-if="watchAgainVideos.length > 0">
    <h1 class="title"> Watch Again </h1>
    <carousel
    :carouselVideos="watchAgainVideos"
    :favoritesId="favoritesId"
    :sectionTitle="title"
    @recieveToggleFavorites="sendToggleFavorite($event)" 
    @recieveToggleModal="sendToggleModal($event)"
    ></carousel>
</div>
   
</template>

<script>
import WatchAgainService from '../../services/WatchAgainService'
import videoService from '@/services/VideoService'
import carousel from './carousel.vue'

export default {
    name: "WatchAgain",
    props: ["videos", "favoritesId"],
    data() {
        return {
            history: [],
            watchAgainVideos: [],
            title: 'watchagain'
        };
    },
    async mounted() {
        setTimeout(async () => {
            this.history = (await WatchAgainService.index({
                userId: this.$store.state.user.id
            })).data;
            for (let item of this.history) {
                var key = item.VideoId;
                var value = item.Spot + "%";
                var index = this.history.indexOf(item);
                this.watchAgainVideos.push((await videoService.show(key)).data);
                this.watchAgainVideos[index].Spot = value;
            }
        }, 1000);
    },
    methods: {
        sendToggleFavorite(video) {
            this.$emit("recieveToggleFavorites", video);
        },
        sendToggleModal(video) {
            this.$emit("recieveToggleModal", video);
        },
    },
    computed: {},
    components: { carousel }
}


</script>

<style scoped>

h1{
  color: white;
  font-size: 25px;
  margin-left: 20px;
  font-family: 'Rubbik', Arial;
  font-weight: 700;
  filter: drop-shadow(2px 2px 4px black);

}






</style>
