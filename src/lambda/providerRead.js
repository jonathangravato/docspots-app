// providerRead.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the Provider Model
import Provider from './providerModel'
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
    // Use Provider.Model to find all products
    const providers = await Provider.find(),
          response = {
            msg: "Providers successfully found",
            data: providers
          }
    
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
    
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}