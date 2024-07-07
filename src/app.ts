import {envs} from './config'
import {AppRoutes} from './presentation/routes'
import {Server} from './presentation/server'

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

    // todo: init server
    await new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).start()
}
