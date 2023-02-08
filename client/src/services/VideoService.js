import Api from '@/services/Api'

export default {
    getAllVideos() {
        return Api().get('videos')
    },
    show(videoId) {
        return Api().get(`videos/${videoId}`)
    }
}