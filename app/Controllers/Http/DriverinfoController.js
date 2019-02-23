'use strict'


const Driverinfo = use('App/Models/Driverinfo')
const {validateAll}=use('Validator')

class DriverinfoController {
  async driverview({view}){
    const driverinfos = await Driverinfo.all()
    return view.render('/pages/driverinfo',{driverinfos: driverinfos.toJSON()})


  }

  async createDriver({ view }) {
    return view.render('/driverinfo/newdrive')}

     //function to create a new driver information log
    async createDrive({request,response,session}){
      const data = request.only(['name', 'DOB', 'lic_num', 'route','truck_id'])
      const rules = {
      name: 'required',
      DOB: 'required',
      lic_num: 'required',
      route: 'required,',
      truck_id: 'required,',



      }


      const messages = {
        'name.required' : 'Driver Name required',
        'DOB.required'    : 'Driver Location required',
        'lic_num.required' : 'Please insert a lic_num',
        'route.required' : 'Usual Route',



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

     const createDrive = new Driverinfo()

      createDrive.name = request.input('name')
      createDrive.DOB = request.input('DOB')
      createDrive.lic_num = request.input('lic_num')
      createDrive.route = request.input('route')
      createDrive.truck_id = request.input('truck_id')


      await createDrive.save();


      return response.redirect('/driverinfo')
    }

 //function defined to update existing Driver Info
 async UpdateDrive({params,request,response,session}){
  const data = request.only(['name', 'DOB', 'lic_num', 'route'])
  const rules = {
  name: 'required',
  DOB: 'required',

  lic_num: 'required,',
  route: 'required'



  }


  const messages = {
    'name.required' : ' drive name required',
    'DOB.required'    : 'drive DOB required',

    'lic_num.required' : 'drive lic_num required',
    'route.required' : 'drive route required',

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

  const updateDrive = await Driverinfo.find(params.id)
      console.driverinfo(updateDrive)

      updateDrive.name = request.input('name')
      updateDrive.DOB = request.input('DOB')
      updateDrive.lic_num = request.input('lic_num')
      updateDrive.route = request.input('route')

      await updateDrive.save()


      return response.redirect('/driverinfos')

  }

  async showEditDrive({view,params}){

    const driverinfos = await Driverinfo.find(params.id)
    return view.render('/driverinfo/editdrive',{driverinfos: driverinfos.toJSON()})
   }
///


    //Function defined to delete Driver Info
  async deleteDrive({view,request,session,response}){
    if (request.ajax()){
      const id = request.input('id')
        const driverinfo = await Driverinfo.find(id);
        await driverinfo.delete();

        response.send({
          status: 'success'
        })
      }else{
        return 'Bad request Type...';
      }

    }

    async viewdriveDetails({view,params}){
      const driverinfo = await Driverinfo.find(params.id)
      return view.render('/driverinfo/viewdrive', {driverinfo: driverinfo.toJSON()
    })
  }


}

module.exports = DriverinfoController
