'use strict'


const Log = use('App/Models/Log')
const {validateAll}=use('Validator')


class LogController {
  async LogView({view}){
    const logs = await Log.all()
    return view.render('/pages/log',{logs: logs.toJSON()})


}
async createlorg({ view }) {
  return view.render('/logs/newlog')}


  async createlog({request,response,session}){
    const data = request.only(['date', 'supplier', 'quantity', 'comments'])
    const rules = {
    date: 'required',
    supplier: 'required',
    quantity: 'required',
    comments: 'required,',



    }


    const messages = {
      'date.required' : 'log Name required',
      'supplier.required'    : 'log Location required',
      'quantity.required' : 'Please insert a quantity',
      'comments.required' : 'Date log commenced',



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

   const createlog = new Log()

    createlog.date = request.input('date')
    createlog.supplier = request.input('supplier')
    createlog.quantity = request.input('quantity')
    createlog.comments = request.input('comments')

    await createlog.save();


    return response.redirect('/logs')
  }


  //function defined to update existing logs
  async UpdateLog({params,request,response,session}){
    const data = request.only(['date', 'supplier', 'quantity', 'comments'])
    const rules = {
    date: 'required',
    supplier: 'required',

    quantity: 'required,',
    comments: 'required'



    }


    const messages = {
      'date.required' : 'Date required',
      'supplier.required'    : 'supplier required',

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

  const updateLog = await Log.find(params.id)
     console.log(updateLog)

     updateLog.date = request.input('date')
     updateLog.supplier = request.input('supplier')
     updateLog.quantity = request.input('quantity')
     updateLog.comments = request.input('comments')
     await updateLog.save()


     return response.redirect('/logs')

    }


     async showEditLog({view,params}){

      const logs = await Log.find(params.id)
      return view.render('/logs/editlog',{logs: logs.toJSON()})
     }


     async viewlogDetails({view,params}){
      const log = await Log.find(params.id)
      return view.render('/logs/viewlog', {log: log.toJSON()
    })
  }




  //Function defined to delete log
  async deletelog({view,request,session,response}){
    if (request.ajax()){
      const id = request.input('id')
        const log = await Log.find(id);
        await log.delete();

        response.send({
          status: 'success'
        })
      }else{
        return 'Bad request Type...';
      }

    }






}

module.exports = LogController
