
export let baseUrl:string
//this is the only env we get in front end, and technically anyone that downloads the site can read it 
if(process.env['NODE_ENV'] === 'production'){
    //if we ran npm run build
    //use the deployed address
    baseUrl = 'http://ceciliapichardo.com'
}else {
    //we are in test or dev, use the local address
    baseUrl = 'http://localhost:2004'
}