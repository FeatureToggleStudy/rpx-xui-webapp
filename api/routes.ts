
import * as express from 'express'
import * as auth from './auth'
import authInterceptor from './lib/middleware/auth'
import serviceTokenMiddleware from './lib/middleware/serviceToken'
import * as proxy from './lib/proxy'
import getappInsightsInstrumentationKey from './monitoring-tools'

const router = express.Router({ mergeParams: true })

router.use(serviceTokenMiddleware)
router.use(authInterceptor)

router.get('/*', proxy.get)
router.post('/*', proxy.post)
router.put('/*', proxy.put)

router.use('/logout', auth.logout)
router.use('/monitoring-tools', getappInsightsInstrumentationKey)

export default router
