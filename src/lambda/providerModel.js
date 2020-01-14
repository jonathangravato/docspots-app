// providerModel.js
import mongoose from 'mongoose'
// Set Provider Schema
const schema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        zipcode: {
          type: String,
          required: [true, 'Zipcode field is required'],
          max: 100
        },
        city: {
          type: String,
          required: [true, 'City field is required'],
          max: 100
        },
        state: {
          type: String,
          required: [true, 'State field is required'],
          max: 2
        },
        providerGroup: {
          type: String,
          required: [true, 'Provider Group field is required'],
          max: 100
        },
        provider: {
          type: String,
          required: [false, ''],
          max: 100
        },
        specialty: {
          type: String,
          required: [true, 'Specialty field is required'],
          max: 100
        },
        address: {
          type: String,
          required: [true, 'Address field is required'],
          max: 100
        },
        address2: {
          type: String,
          required: [false, ''],
          max: 100
        },
        phone: {
          type: String,
          required: [true, 'Phone field is required'],
          max: 10
        },
        fax: {
          type: String,
          required: [false, ''],
          max: 10
        },
        website: {
          type: String,
          required: [false, ''],
          max: 100
        },
        workingDays: {
          type: Array,
          required: [false, '']
        },
        notes: {
          type: Array,
          required: [false, '']
        },
      }),
      Provider = mongoose.model('provider', schema)
export default Provider