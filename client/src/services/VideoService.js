import Api from '@/services/Api'

export default {
    getAllVideos() {
        return Api().get('videos')
    }
}