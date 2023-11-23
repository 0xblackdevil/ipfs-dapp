import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'

const projectId = "2U8s7qIsNj8fC1Q14KowyWGXF4u"
const projectSecret = "eac6052efc5d9b15f84f9387b4c6c437"
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

/* Create an instance of the client */
const IPFSclient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  }
})

export default IPFSclient;
