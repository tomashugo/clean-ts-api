import { MongoClient, Collection } from 'mongodb'
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
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection    
    return Object.assign({}, collectionWithoutId, { id: _id.toString() })
  }
}