//pubsub topics
import { PubSub } from '@google-cloud/pubsub'

const pubSubClient = new PubSub()

//definitely easier
//create a local topic object that isn't actually in GCP but can be connected
export const userTopic = pubSubClient.topic('projects/resonant-time-279822/topics/user-service')
//export const userTopic = pubSubClient.createTopic('projects/resonant-time-279822/topics/user-service')