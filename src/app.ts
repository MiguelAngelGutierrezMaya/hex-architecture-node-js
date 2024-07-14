import {envs, MongoDatabase} from './modules/shared'
import {AppRoutes, Server} from "./presentation";

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
