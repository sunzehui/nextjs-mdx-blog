import { syncPosts } from './post'

export default async function handler() {
  return await syncPosts()
}
