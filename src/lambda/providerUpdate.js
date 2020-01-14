// providerUpdate.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the Provider Model
import Provider from './providerModel'
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
    // Parse the ID
    const data = JSON.parse(JSON.parse(event.body)),
          id = data.id,
          provider = data.provider,
          response = {
            msg: "Provider successfully updated",
            data: provider
          }
    
    // Use Provider.Model and id to update 
    await Provider.findOneAndUpdate({_id: id}, provider)
    
    return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch(err) {
    console.log('provider.update', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}