import request from 'request';


const baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places`;
const token = 'access_token=pk.eyJ1Ijoia2F0ZS1tYXBib3hzIiwiYSI6ImNsN3NxODcydTBycG0zb3RiZDFmZDI5bGgifQ.VBAqIULgKHkiH_V8a3auhA';
const getInfo = (temp = '', feelslike = '') => {
    return `It is currently ${temp} degrees out. It feels like ${feelslike} degrees out!`
} 

const forecast = (data, callback) => {
    const {latitude, longitude} = data || {};
    const url = `${baseUrl}/${latitude},${longitude}.json?${token}`
    request({url, json: true}, (error, response, body) => {
        const {temperature, feelslike} = body.current || {};
        const dataInfo =  getInfo(temperature, feelslike)
        if(error){
            callback(error)
        } else if(body.error) {
            callback(body.error.info)
        } else {
            callback('', dataInfo)
        }
    })
}

export default forecast;