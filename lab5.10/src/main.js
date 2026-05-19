import './style.css'
import axios from 'axios'
import { Application, Graphics } from 'pixi.js'

const app = new Application()

await app.init({
  width: 500,
  height: 300,
  background: '#f0f0f0',
})

document.getElementById('pixi-container').appendChild(app.canvas)

const rectangle = new Graphics()

rectangle
  .rect(-75, -40, 150, 80)
  .fill(0x3366ff)

rectangle.x = app.screen.width / 2
rectangle.y = app.screen.height / 2

app.stage.addChild(rectangle)

app.ticker.add(() => {
  rectangle.rotation += 0.03
})

const result = document.getElementById('result')

async function makeGetRequest(url) {
  result.textContent = `Выполняется GET-запрос к ${url}...`

  try {
    const response = await axios.get(url)

    result.textContent = JSON.stringify(
      {
        url,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
      },
      null,
      2
    )
  } catch (error) {
    result.textContent = JSON.stringify(
      {
        url,
        message: error.message,
        status: error.response?.status,
        headers: error.response?.headers,
        data: error.response?.data,
      },
      null,
      2
    )
  }
}

document.getElementById('vk-btn').addEventListener('click', () => {
  makeGetRequest('https://vk.com')
})

document.getElementById('geo-btn').addEventListener('click', () => {
  makeGetRequest('https://json.geoiplookup.io/')
})

document.getElementById('env').textContent = JSON.stringify(
  {
    MODE: import.meta.env.MODE,
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_BUILD_TYPE: import.meta.env.VITE_BUILD_TYPE,
  },
  null,
  2
)