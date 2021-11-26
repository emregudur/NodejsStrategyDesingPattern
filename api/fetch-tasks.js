const mongoose = require('mongoose')
const http = require('http')
const { exit } = require('process')
const Schema = mongoose.Schema

const UserModel = new Schema({
  taskId: {
    type: String,
    unique: true,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
})

const Task = mongoose.model('tasks', UserModel)

const ProviderModel = new Schema({
  api: {
    type: String,
    unique: true,
    required: true,
  },
  providerName: {
    type: String,
    required: true,
  },
})

const Provider = mongoose.model('provider', ProviderModel)

function fetchData(api) {
  return new Promise((resolve, reject) => {
    http.get(api, (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];
    
      let error;
      if (statusCode !== 200) {
        error = new Error(`Request Failed Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type. Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.error(error.message);
        res.resume();
        return;
      }
    
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData)
        } catch (e) {
          reject(e.message);
        }
      });
    }).on('error', (e) => {
      reject(`Got error: ${e.message}`);
    });
  })
}

var Operation = function () {
  this.provider = ""
}

Operation.prototype = {
  setStrategy: function (provider) {
      this.provider = provider
  },

  save: function (api) {
    return this.provider.save(api)
  }
}

var Provider1 = function () {
  this.save = async function (api) {
    let data = await fetchData(api)
      .then(data => {
        return data.map(x => {
          let taskId = Object.keys(x)[0]
          return {
            taskId,
            duration: x[taskId].estimated_duration,
            level: x[taskId].level
          }
        })
      })
    return data
  }
}

var Provider2 = function () {
  this.save = async function (api) {
    let data = await fetchData(api)
      .then(data => {
        return data.map(x => {
          return {
            taskId: x.id,
            duration: x.sure,
            level: x.zorluk
          }
        })
      })
    return data
  }
}

let debounceTiming;
var SaveDb = function (tasks) {  
  tasks.forEach(task => {
    let model = new Task({...task})
    model
      .save()
      .then(json => {
        console.log('added task: '+ json.taskId);
        clearTimeout(debounceTiming)
        debounceTiming = setTimeout(() => {
          console.log('finished tasks saving');
          exit()
        }, 500);
      })
      .catch(err => {
        console.log('task not added', err)
        clearTimeout(debounceTiming)
        debounceTiming = setTimeout(() => {
          console.log('finished tasks saving');
          exit()
        }, 500);
      })
  })
}

function run() {
  let providers = {
    provider1: new Provider1(),
    provider2: new Provider2(),
  }

  var operation = new Operation()

  Provider.find({})
    .then(providersFromDB => {
      providersFromDB.forEach(provider => {
        operation.setStrategy(providers[provider.providerName])
        operation.save(provider.api).then(SaveDb)
      })
    })
}

mongoose
.connect('mongodb://root:123456789@localhost:27017/store?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true })
.then(res => {
  run()
})
.catch(function (err) {
  console.log(err)
})