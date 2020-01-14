import React from 'react';
import { Component } from 'react';
import { Stitch, AnonymousCredential, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';
import './App.css';

import ProductTable from './components/ProviderTable'

/**
 <div className="uk-container uk-container-center">
        <h1 className="uk-h2">DocSpots - Provider Locator</h1>
        <div className="search-form">
          <form onSubmit={this.handleSubmit}>
            <label name="currentAddress">Starting Address:</label>
            <input 
              name="currentAddress" 
              type="text"
              size="95" 
              onChange={this.handleInputChange} 
            />
            <label name="distance">Distance from Starting Address:</label> 
            <input 
              type="number" 
              name="distance" 
              min="5" 
              max="20" 
              step="5" 
              onChange={this.handleInputChange} 
            />
          </form>
        </div>
        <div className="uk-overflow-auto">
          <table id="provider-table" className="uk-table uk-table-small uk-table-middle uk-table-divider uk-table-striped">
            <thead>
                <tr>
                    <th>Provider</th>
                    <th>Group</th>
                    <th>City</th>
                    <th>Zipcode</th>
                    <th>Phone</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {providers.map(provider => (
              <tr key={provider._id.toString()}>
                <td>{provider.provider}</td>
                <td>{provider.providerGroup}</td>
                <td>{provider.city}</td>
                <td>{provider.zipcode}</td>
                <td>{this.formatPhoneNumber(provider.phone)}</td>
                <td>{provider.website && (
                  <a className="uk-button uk-button-default" href={provider.website} target="_blank" rel="noopener noreferrer">Website</a>
                )}</td>
                <td>
                  <span
                    uk-icon="icon: pencil" 
                    className="uk-button uk-button-default uk-button-small uk-button-primary"
                    onClick={() => this.editProvider( provider._id.toString() )}
                  ></span>
                  <span
                    uk-icon="icon: trash"
                    className="uk-icon-trash uk-button uk-button-default uk-button-small uk-button-danger"
                    onClick={() => this.deleteProvider( provider._id.toString() )}
                  ></span>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
 */

class App extends Component {

  constructor() {
    super();
    this.state = {
      providers: [],
      currentAddress: '',
      distance: '',
    };

    this.displayProviders = this.displayProviders.bind(this);
    this.formatPhoneNumber = this.formatPhoneNumber.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editProvider = this.editProvider.bind(this);
    this.deleteProvider = this.deleteProvider.bind(this);
  }

  componentDidMount = () => {
    this.client = Stitch.initializeDefaultAppClient(process.env.REACT_APP_NAME);
    const mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      "docspots-api"
    );
    this.db = mongodb.db(process.env.REACT_APP_DB);
    this.displayProvidersOnLoad();
  }

  handleInputChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value 
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    alert('Searching for providers ' + this.state.distance + ' miles from ' + this.state.currentAddress)
    // TODO: apply Google Maps Search algorythm
  }

  displayProviders = () => {
    // query the remote DB and update the component state
    this.db
      .collection("provider_list")
      .find({}, { limit: 1000 })
      .asArray()
      .then(providers => {
        this.setState({providers});
      });
   }

  displayProvidersOnLoad = () => {
    // Anonymously log in and display comments on load
    this.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(this.displayProviders)
      .catch(console.error);
  }

  formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

  editProvider = (id) => {
    // TODO: filter this provider document and render form to alter document content then pass new document values to database.
    const provider = this.state.providers.filter(record => (record._id.toString() === id))
    console.log('Edit: ', provider)
  }

  deleteProvider = (id) => {
    // TODO: filter provider array to no longer include the selected provider document.
    const provider = this.state.providers.filter(record => (record._id.toString() === id))
    console.log('Delete: ', provider)
  }
  
  render() {

    // const { providers } = this.state

    return (
      
        <div>
          <ProductTable />
        </div>
      
    );
  }
}

export default App;



