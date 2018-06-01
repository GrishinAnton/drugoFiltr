export default {
    auth(){
        return new Promise((resolve, reject ) => {

            VK.init({
                apiId: 6487256
            }); 
            VK.Auth.login(data => {
                if (data.session) {
                    resolve();
                } else {
                    reject(new Error('Не шмогла'));
                }
            },2);
        });
    }    
}