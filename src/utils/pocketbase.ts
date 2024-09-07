import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export default pb;

// 불러올 때
// import pb from '/src/lib/pocketbase'
