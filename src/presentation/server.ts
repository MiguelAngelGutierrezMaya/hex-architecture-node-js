import express, { Express, Router } from 'express'

interface Options {
  port?: number
  routes: Router
}

export class Server {
  public readonly app: Express = express()
  private readonly port: number
  private readonly routes: Router

  constructor(options: Options) {
    this.port = options?.port || 3001
    this.routes = options.routes
  }

  async start() {
    // Middlewares
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    // this.app.use((req, res, next) => {
    //   res.header('Access-Control-Allow-Origin', '*')
    //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    //   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    //   next()
    // })

    // Use the routes defined in the AppRoutes class
    this.app.use(this.routes)

    // Start the server
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`)
    })
  }
}
