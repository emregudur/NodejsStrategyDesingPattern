import mongoose from 'mongoose'
import { mongodbConnectionUri } from './common'
import ProviderModel from './models/provider'

export default function () {
  mongoose
    .connect(mongodbConnectionUri(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
      var providers = [
        {
          providerName: 'provider1',
          api: "http://www.mocky.io/v2/5d47f235330000623fa3ebf7"
        },
        {
          providerName: 'provider2', 
          api: "http://www.mocky.io/v2/5d47f24c330000623fa3ebfa"
        }
      ]

      providers.forEach(x => {
        let provider = new ProviderModel({...x})
        provider.save()
        .then(json => {
          console.log('provider added', json)
        })
        .catch(err => {
          console.log('provider not added', err)
        })
      })

      // setTimeout(() => {
      //   import('../fetch-tasks')
      // }, 2000);
      
      console.log('mongodb connected')
    })
    .catch(function (err) {
      console.log(err)
    })
}
