import request from 'request';

const baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places`;
const token = 'access_token=pk.eyJ1Ijoia2F0ZS1tYXBib3hzIiwiYSI6ImNsN3NxODcydTBycG0zb3RiZDFmZDI5bGgifQ.VBAqIULgKHkiH_V8a3auhA';

const geocode = (address, callback) => {
    const url = `${baseUrl}/${encodeURIComponent(address)}.json?${token}`
    request({url, json: true},  (error, response, body) => {
        if(error){
            ccallback('Unable to connect')
        }else if(body.error){
            callback(body.error.info)
        } else {
            const {place_name, center} = body.features[0] || {};
            callback('',{
                latitude: center[0],
                longitude: center[1],
                location: place_name,
            })
        } 
    });
}

export default geocode;
