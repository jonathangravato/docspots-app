// providerCreate.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the Provider Model
import Provider from './providerModel'
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
    const data = JSON.parse(event.body),
          zipcode = data.zipcode,
          city = data.city,
          state = data.state,
          providerGroup = data.providerGroup,
          provider = data.provider,
          specialty = data.specialty,
          address = data.address,
          address2 = data.address2,
          phone = data.phone,
          fax = data.fax,
          website = data.website,
          workingDays = data.workingDays,
          notes = data.notes,
          id = mongoose.Types.ObjectId(),
          provider = {
            _id: id,
            zipcode: zipcode,
            city: city,
            state: state,
            providerGroup: providerGroup,
            provider: provider,
            specialty: specialty,
            address: address,
            address2: address2,
            phone: phone,
            fax: fax,
            website: website,
            workingDays: workingDays,
            notes: notes,
            __v: 0
          },
          response = {
            msg: "Provider successfully created",
            data: provider
          }
    
    // Use Provider.Model to create a new provider
    await Provider.create(provider)
return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log('provider.create', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}