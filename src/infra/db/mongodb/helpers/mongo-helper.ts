import { MongoClient, type Collection } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,
  connected: false,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
    this.connected = true
    this.client.addListener('connectionClosed', () => { this.connected = false })
  },

  async disconnect (): Promise<void> {
    if (this.connected) {
      await this.client.close()
      this.client = null
      this.connected = false
    }
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.connected) {
      await this.connect(this.uri)
    }
    return this.client?.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id.toString() })
  }
}
