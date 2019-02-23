'use strict'

const Deployment = use('App/Models/Deployment')
const {validateAll}=use('Validator')

class DeploymentController {
  async deployview({view}){
    const deployments = await Deployment.all()
    return view.render('/pages/deployment',{deployments: deployments.toJSON()})


  }

  async createDeploy({ view }) {
    return view.render('/deployment/newdep')}


//function to create a new deployment log
    async createDep({request,response,session}){
      const data = request.only(['date', 'station', 'route', 'truck_id','driver_id','quantity'])
      const rules = {
      date: 'required',
      station: 'required',
      route: 'required',
      truck_id: 'required,',
      driver_id: 'required,',
      quantity: 'required',



      }


      const messages = {
        'date.required' : 'Dep Name required',
        'station.required'    : 'Dep Location required',
        'route.required' : 'Please insert a route',
        'truck_id.required' : 'Date Dep commenced',



       }


      const validation = await validateAll(data, rules, messages);

      if (validation.fails()) {
        session
          .withErrors(validation.messages())


          session.flash({
          notification:{
            type:'danger',
            message:'Please fill all details correctly'
              }
     })

        return response.redirect('back')
      }

     const createDep = new Deployment()

      createDep.date = request.input('date')
      createDep.station = request.input('station')
      createDep.route = request.input('route')
      createDep.truck_id = request.input('truck_id')
      createDep.driver_id = request.input('driver_id')
      createDep.quantity = request.input('quantity')

      await createDep.save();


      return response.redirect('/deployment')
    }

    //function defined to update existing Deps
  async UpdateDep({params,request,response,session}){
    const data = request.only(['date', 'driver_id', 'quantity', 'comments'])
    const rules = {
    date: 'required',
    driver_id: 'required',

    quantity: 'required,',
    comments: 'required'



    }


    const messages = {
      'date.required' : 'Date required',
      'driver_id.required'    : 'driver_id required',

      'quantity.required' : 'Quantity required',
      'comments.required' : 'Comments required',

     }


     const validation = await validateAll(data, rules, messages)

     if (validation.fails()) {
       session
         .withErrors(validation.messages())


         session.flash({
         notification:{
           type:'danger',
           message:'Please fill all details correctly'
             }
    })

       return response.redirect('back')
     }

    const updateDep = await Deployment.find(params.id)
     console.Dep(updateDep)

     updateDep.date = request.input('date')
     updateDep.station = request.input('station')
     updateDep.route = request.input('route')
     updateDep.truck_id = request.input('truck_id')
     updateDep.driver_id = request.input('driver_id')
     updateDep.quantity = request.input('quantity')
     await updateDep.save()


     return response.redirect('/deployments')

    }

    async showEditDep({view,params}){

      const deployments = await Deployment.find(params.id)
      return view.render('/deployment/editdep',{deployments: deployments.toJSON()})
     }




  //Function defined to delete Deployment
  async deleteDep({view,request,session,response}){
    if (request.ajax()){
      const id = request.input('id')
        const deployment = await Deployment.find(id);
        await deployment.delete();

        response.send({
          status: 'success'
        })
      }else{
        return 'Bad request Type...';
      }

    }
}

module.exports = DeploymentController
