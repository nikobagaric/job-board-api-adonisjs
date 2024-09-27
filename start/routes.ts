/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

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
  router.put('/users/:id', [UserController, 'update'])
  router.delete('/users/:id', [UserController, 'destroy'])
}).prefix('api/v1')

// auth
router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
  router.post('/logout', [AuthController, 'logout'])
}).prefix('api/v1')

// profile
router.group(() => {
  router.get('/profile', [ProfileController, 'show'])
  router.put('/profile', [ProfileController, 'update'])
}).prefix('api/v1')


// job
router.group(() => {
  router.post('/jobs', [JobController, 'store'])
  router.get('/jobs', [JobController, 'index'])
  router.get('/jobs/:id', [JobController, 'show'])
  router.put('/jobs/:id', [JobController, 'update'])
  router.delete('/jobs/:id', [JobController, 'destroy'])
}).prefix('api/v1')


// application
router.group(() => {
  router.post('/applications', [ApplicationController, 'store'])
  router.get('/applications', [ApplicationController, 'index'])
  router.get('/applications/:id', [ApplicationController, 'show'])
  router.put('/applications/:id', [ApplicationController, 'update'])
  router.delete('/applications/:id', [ApplicationController, 'destroy'])
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