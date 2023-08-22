import { MongoClient } from 'mongodb'
import { ConnectionOptions } from 'tls'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectionOptions)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}