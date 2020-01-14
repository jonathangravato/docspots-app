// providerDelete.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the Provider Model
import Provider from './providerModel'
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
    // Parse the ID
    const id = JSON.parse(event.body),
          response = {
            msg: "Provider successfully deleted"
          }
    
    // Use Provider.Model to delete 
    await Provider.findOneAndDelete({ _id: id })
    
    return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch(err) {
    console.log('provider.delete', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}