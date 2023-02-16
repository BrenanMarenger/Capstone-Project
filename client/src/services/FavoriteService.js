import Api from '@/services/Api'

export default {
    index(params) {
        return Api().get('favorites', {
            params: params
        })
    },
    post(favorite) {
        return Api().post('favorites', favorite)
    },
    delete(favoriteId) {
        return Api().delete(`favorites/${favoriteId}`)
    }
}