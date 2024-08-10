import { initializeApp } from "firebase-admin"
import { App, cert, getApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getApps } from "firebase/app"



const serviceKey = require('@/service_key.json')

let app: App

if(getApps().length === 0){
    app = initializeApp({
        credential: cert(serviceKey),
    })
}else {
    app = getApp()
}

const admindb = getFirestore(app)

export { app as adminApp, admindb}