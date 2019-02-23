'use strict'


const Route = use('Route')

Route.on('/').render('welcome')


//Routes to render logs page
Route.get('/logs','LogController.LogView')
Route.get('/newlog','LogController.createlorg')
Route.post('/logs/newlog','LogController.createlog').as('logs.save')
Route.delete('/logs/delete','LogController.deletelog').as('log.delete')
Route.put('/logs/update/:id','LogController.UpdateLog')
Route.get('/logs/edit/:id','LogController.showEditLog').as('log.edit')
Route.get('/logs/view/:id','LogController.viewlogDetails')


//Routes to render deployment page
Route.get('/deployment','DeploymentController.deployview')
Route.get('/newdep','DeploymentController.createDeploy')
Route.post('/deployment/newdep','DeploymentController.createDep').as('deployments.save')
Route.delete('/deployments/delete','DeploymentController.deleteDep').as('deployment.delete')
Route.put('/deployments/update/:id','DeploymentController.UpdateDep')
Route.get('/deployments/edit/:id','DeploymentController.showEditDep').as('deployment.edit')

//Routes to render driverinfo page
Route.get('/driverinfo','DriverinfoController.driverview')
Route.get('/newdrive','DriverinfoController.createDriver')
Route.post('/driverinfo/newdrive','DriverinfoController.createDrive').as('driverinfos.save')
Route.delete('/driverinfos/delete','DriverinfoController.deleteDrive').as('driverinfo.delete')
Route.put('/driverinfos/update/:id','DriverinfoController.UpdateDrive')
Route.get('/driverinfos/edit/:id','DriverinfoController.showEditDrive').as('driverinfo.edit')
Route.get('/driverinfos/view/:id','DriverinfoController.viewdriveDetails')
