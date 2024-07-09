import {envs} from './config'
import {AppRoutes} from './presentation/routes'
import {Server} from './presentation/server'
import {MongoDatabase} from "./data/mongodb";

(() => {
    main()
        .then(() => {
        })
        .catch((err) => {
            console.error(err)
        })
})()

async function main() {
    // todo: await database
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })

    // todo: init server
    await new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start()
}
