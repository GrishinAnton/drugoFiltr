export default {
    callAPI(method, params) {
        params.v = '5.76';
    
        return new Promise((resolve, reject ) => {
            VK.api(method, params, (data) => {
                if (data.error) {
                    reject(data.error);
                } else {
                    resolve(data.response);
                }
            });
        });
    },
    getUsers(params){
        return this.callAPI('friends.get', params)
    }
}

