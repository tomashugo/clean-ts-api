import { type Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  fg.sync('**/src/main/routes/**routes.ts').forEach(async (file) => (await import(`../../../${file}`)).default(router))
}
