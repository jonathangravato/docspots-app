// ProviderTable.js
import React, { Component } from 'react'
export default class ProviderTable extends Component {
  state = {
    providers: [],
    inputs: [],
    newProvider: {
        zipcode: '',
        city: '',
        state: '',
        providerGroup: '',
        provider: '',
        specialty: '',
        address: '',
        address2: '',
        phone: '',
        fax: '',
        website: '',
        workingDays: [],
        notes: [],
    }
  }
componentDidMount() {
  // Fetch the providers from the database
  fetch('/.netlify/functions/providerRead')
    .then(res => res.json())
    .then(response => {
      console.log(response.msg)
      const inputs = [...this.state.inputs],
            providers = response.data
        
      providers.forEach(provider => {
        const providerProps = this.setProviderProps(provider)
        inputs.push(providerProps)
      })
        
      this.setState({ 
        providers,
        inputs
      })
    })
    .catch(err => console.log('Error retrieving providers: ', err))
  }
  // ProviderProps
  setProviderProps = (provider) => {
    const providerProps = {}
    
    // Cycle through provider props and exclude props we don't want shown in the table
    Object.keys(provider).forEach(key => {
      if (key !== '_id' && key !== '__v') {
        providerProps[key] = provider[key]
      }
    })
    
    return providerProps
  }
  
  compareProviderProps = (i) => {
    const provider = this.state.providers[i],
          input = this.state.inputs[i]
    
    let compare = false
    
    // Cycle though provider props and exclude important props from comparison
    Object.keys(provider).forEach(key => {
      if (key !== '_id' && key !== '__v') {
        if (provider[key] !== input[key]) {
          // Found a difference between input and provider
          compare = true
        }
      }
    })
    
    return compare
  }
  
  // Input handlers
  handleNewInputChange = (e) => {
    const newProvider = this.state.newProvider,
          name = e.target.name,
          value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        //   zipcode = e.target.zipcode,
        //   city = e.target.city,
        //   state = e.target.state,
        //   providerGroup = e.target.providerGroup,
        //   provider = e.target.provider,
        //   specialty = e.target.specialty,
        //   address = e.target.address,
        //   address2 = e.target.address2,
        //   phone = e.target.phone,
        //   fax = e.target.fax,
        //   website = e.target.website,
        //   workingDays = e.target.workingDays,
        // notes = e.target.notes
    
    newProvider[name] = value
    
    this.setState({
      newProvider: newProvider
    })
  }
  
  handleInputChange = (e) => {
    const inputs = [...this.state.inputs],
          target = e.target,
          id = parseInt(target.dataset.id),
          name = target.name,
          value = target.value
    
    inputs[id][name] = value
    
    this.setState({
      inputs 
    })
  }
  
  // CRUD
  postAPI = (source, data) => {
    return fetch('/.netlify/functions/' + source, {
        method: 'post',
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .catch(err => err)
  }
  
  // CRUD Handlers
  handleCreate = () => {
    const newProvider = this.state.newProvider
    
    this.postAPI('providerCreate', newProvider)
      .then(response => {
        console.log(response.msg)
      
        const provider = response.data,
              providers = [...this.state.providers],
              inputs = [...this.state.inputs],
              newProvider = {
                zipcode: '',
                city: '',
                state: '',
                providerGroup: '',
                provider: '',
                specialty: '',
                address: '',
                address2: '',
                phone: '',
                fax: '',
                website: '',
                workingDays: [],
                notes: [],
              },
              providerProps = this.setProviderProps(provider)
        
        inputs.push(providerProps)
        providers.push(provider)
        
        this.setState({ 
          providers: providers,
          inputs: inputs,
          newProvider: newProvider
        })
      })
      .catch(err => console.log('Provider.create API error: ', err))
  }
  
  handleUpdate = (e) => {
    const providers = [...this.state.providers],
          inputs = [...this.state.inputs],
          index = parseInt(e.target.dataset.id),
          providerData = inputs[index],
          oid = this.state.providers[index]._id
    
    // Set provider id and provider data as JSON string
    const data = JSON.stringify({ id: oid, provider: providerData })
    
    this.postAPI('providerUpdate', data)
      .then(response => {
        console.log(response.msg)
        const provider = response.data
        
        // Set updated provider props
        inputs[index] = this.setProviderProps(provider)
        providers[index] = provider
      
        this.setState({
          providers,
          inputs
        })
      })
      .catch(err => console.log('Provider.delete API error: ', err))
  }
  
  handleDelete = (e) => {
    const index = parseInt(e.target.dataset.id),
          id = this.state.providers[index]._id
    
    this.postAPI('providerDelete', id)
      .then(response => {
        console.log(response.msg)
        
        const inputs = [...this.state.inputs],
              providers = [...this.state.providers]
        
        inputs.splice(index, 1)
        providers.splice(index, 1)
      
        this.setState({ 
          providers: providers,
          inputs:inputs
        })
      })
      .catch(err => console.log('Provider.delete API error: ', err))
  }
  
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Zipcode</th>
            <th>City</th>
            <th>State</th>
            <th>Provider Group</th>
            <th>Provider</th>
            <th>Specialty</th>
            <th>Address</th>
            <th>Address2</th>
            <th>Phone</th>
            <th>Fax</th>
            <th>Website</th>
            <th>Working Days</th>
            <th>Notes</th>
            <th>Create</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input name='zipcode' type='string' value={this.state.newProvider.zipcode} onChange={this.handleNewInputChange} />
            </td>
            <td>
              <input name='city' type='string' value={this.state.newProvider.city} onChange={this.handleNewInputChange} />
            </td>
            <td>
            <input name='state' type='string' value={this.state.newProvider.state} onChange={this.handleNewInputChange} />
            </td>
            <td>
              <input name='providerGroup' type='string' value={this.state.newProvider.providerGroup} onChange={this.handleNewInputChange} />
            </td>
            <td>
              <input name='provider' type='string' value={this.state.newProvider.provider} onChange={this.handleNewInputChange} />
            </td>
            <td>
            <input name='specialty' type='string' value={this.state.newProvider.specialty} onChange={this.handleNewInputChange} />
            </td>
            <td>
              <input name='address' type='string' value={this.state.newProvider.address} onChange={this.handleNewInputChange} />
            </td>
            <td>
              <input name='address2' type='string' value={this.state.newProvider.address2} onChange={this.handleNewInputChange} />
            </td>
            <td>
            <input name='phone' type='string' value={this.state.newProvider.phone} onChange={this.handleNewInputChange} />
            </td>
            <td>
              <input name='fax' type='string' value={this.state.newProvider.fax} onChange={this.handleNewInputChange} />
            </td>
            <td>
              <input name='website' type='string' value={this.state.newProvider.website} onChange={this.handleNewInputChange} />
            </td>
            <td>
            <input name='workingDays' type='string' value={this.state.newProvider.workingDays} onChange={this.handleNewInputChange} />
            </td>
            <td>
              <input name='notes' type='string' value={this.state.newProvider.notes} onChange={this.handleNewInputChange} />
            </td>
            <td>
              <button onClick={this.handleCreate}>&#43;</button>
            </td>
          </tr>
          {this.state.inputs.map((provider, i) => {
            return <tr key={'provider_' + i}>
              {Object.keys(provider).map(key => {
                return <td key={'key_' + key}>
                  <input name={key} data-id={i} value={provider[key]} onChange={this.handleInputChange} />
                </td>
                })}
              <td>
                {this.compareProviderProps(i) && <button data-id={i} onClick={this.handleUpdate}>&#10004;</button>}
                <button data-id={i} onClick={this.handleDelete}>&#128465;</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    )
  }
}