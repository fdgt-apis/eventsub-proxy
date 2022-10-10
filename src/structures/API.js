// Module imports
// import body from 'koa-body'
import cors from '@koa/cors'
import compress from 'koa-compress'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import logger from 'koa-logger'
import noTrailingSlash from 'koa-no-trailing-slash'





// Local imports
// import bodyBuilder from '../helpers/bodyBuilderMiddleware.js'
// import statusCodeGenerator from '../helpers/statusCodeGeneratorMiddleware.js'





export class API {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#app = new Koa

	#router = new KoaRouter





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	callback() {
		return this.#app.callback()
	}

	initialiseMiddleware() {
		this.#app.use(logger())
		this.#app.use(noTrailingSlash())
		this.#app.use(compress())
		this.#app.use(cors())
		// this.#app.use(body())
		// this.#app.use(statusCodeGenerator())
		// this.#app.use(bodyBuilder())
	}

	initialiseRouter() {
		this.#app.use(this.#router.routes())
		this.#app.use(this.#router.allowedMethods())
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	get app() {
		return this.#app
	}

	get router() {
		return this.#router
	}
}
