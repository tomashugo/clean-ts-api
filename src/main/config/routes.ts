import { Router, type Express } from 'express'
// import fg from 'fast-glob'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  // fg.sync('**/src/main/routes/**routes.ts').forEach(async (file) => (await import(`../../../${file}`)).default(router))
  readdirSync(`${__dirname}/../routes`).forEach(async file => {
    if (!file.includes('.test.') && !file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
