import axios from 'axios'

import configJson from '../config.json'

interface EnvTypes {
  backend_url: string
}

interface EnvironmentTypes{
  [development: string]: EnvTypes,
}

const env = process.env.NODE_ENV || 'development'
const config = configJson as EnvironmentTypes

const instance = axios.create({
  baseURL: config[env].backend_url,
  timeout: 1000,
  headers:{
    'content-type': 'application/json'
  }
})

export default instance