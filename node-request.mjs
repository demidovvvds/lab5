import axios from 'axios'

async function makeRequest(url) {
  console.log(`\nGET ${url}`)

  try {
    const response = await axios.get(url)

    console.log('Status:', response.status)
    console.log('Headers:', response.headers)

    if (typeof response.data === 'string') {
      console.log('Data:', response.data.slice(0, 500))
    } else {
      console.log('Data:', response.data)
    }
  } catch (error) {
    console.log('Error message:', error.message)

    if (error.response) {
      console.log('Status:', error.response.status)
      console.log('Headers:', error.response.headers)
      console.log('Data:', error.response.data)
    }
  }
}

await makeRequest('https://vk.com')
await makeRequest('https://json.geoiplookup.io/')