/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

import AutoSwagger from "adonis-autoswagger";
import swagger from "#config/swagger";

const UserController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')
const JobController = () => import('#controllers/jobs_controller')
const ProfileController = () => import('#controllers/profiles_controller')
const ApplicationController = () => import('#controllers/application_controller')

// user
router.group(() => {
  router.post('/users', [UserController, 'store'])
  router.get('/users', [UserController, 'index'])
  router.get('/users/:id', [UserController, 'show'])
  router.put('/users/:id', [UserController, 'update']).use(middleware.auth())
  router.delete('/users/:id', [UserController, 'destroy']).use(middleware.auth())
}).prefix('api/v1')

// auth
router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
  router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
}).prefix('api/v1')

// profile
router.group(() => {
  router.get('/profile', [ProfileController, 'show']).use(middleware.auth())
  router.put('/profile', [ProfileController, 'update']).use(middleware.auth())
}).prefix('api/v1')


// job
router.group(() => {
  router.post('/jobs', [JobController, 'store']).use(middleware.auth())
  router.get('/jobs', [JobController, 'index'])
  router.get('/jobs/:id', [JobController, 'show'])
  router.put('/jobs/:id', [JobController, 'update']).use(middleware.auth())
  router.delete('/jobs/:id', [JobController, 'destroy']).use(middleware.auth())
}).prefix('api/v1')


// application
router.group(() => {
  router.post('/applications', [ApplicationController, 'store']).use(middleware.auth())
  router.get('/applications', [ApplicationController, 'index'])
  router.get('/applications/:id', [ApplicationController, 'show'])
  router.put('/applications/:id', [ApplicationController, 'update']).use(middleware.auth())
  router.delete('/applications/:id', [ApplicationController, 'destroy']).use(middleware.auth())
}).prefix('api/v1')


// Swagger

// returns swagger in YAML
router.get("/swagger", async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
router.get("/docs", async () => {
  return AutoSwagger.default.ui("/swagger", swagger);
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
});

// test

router.get('/', async () => {
  return { hello: 'world' }
})