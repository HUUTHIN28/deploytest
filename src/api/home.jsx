import axiosClient from "./axiosInstance";

const homeApi = {
getHome(params){
    const url = 'house';
    return axiosClient.get(url,{params})
},
postHouse(body){
    const url = 'house';
    return axiosClient.post(url,body)
},
detailHouse(body){
    const url = `house/${body.id}/`;
    return axiosClient.get(url)
},
updateHouse(body){
    const url = 'house';
    return axiosClient.put(url,body)
},
deleteHouse(body) {
    const url = `house/${body.id}/`;
    return axiosClient.delete(url)
}
}

export default homeApi