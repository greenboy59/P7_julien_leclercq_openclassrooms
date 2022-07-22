import axios from 'axios'
import store from '@/store'

function initAxios () {
  axios.defaults.baseURL = 'http://localhost:3000/api'

  axios.interceptors.request.use((config) => {
    if (store.state.user?.token) {
      config = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${store.state.user.token}`
        }
      }
    }
    return config
  })
}

export default initAxios
