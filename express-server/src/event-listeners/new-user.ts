//this is a custom event listener that will fire when someone emits the New User event
import { expressEventEmitter, customExpressEvents } from ".";
import { userTopic } from "../messaging";
import { User } from "../models/User";

// by default event listener fire in order and synchronously
expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User)=>{
    //put them in pub sub
    //allows us to resolve the contained function asynchronously
    console.log('event emitter successful');
    
    setImmediate(async ()=>{
        try{
            let res = await userTopic.publishJSON(newUser)
            console.log(res);//returns message id
        }catch(e){
            console.log(e)
        }
    })
})


expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User)=>{
    //send them to marketing
})


expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User)=>{
    //sends an email with their password reset link
})

expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User)=>{
    //starts the new user tutorial process
})