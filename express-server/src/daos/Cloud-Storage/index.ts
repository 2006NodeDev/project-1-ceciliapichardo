import { Storage } from '@google-cloud/storage'
//set up Cloud Storage Bucket

//bucket name
export const bucketName = 'node-dev-2006-images'

//http path to the bucket
export const bucketBaseUrl = `https://storage.googleapis.com/${bucketName}`

export const imageBucket = new Storage().bucket(bucketName)