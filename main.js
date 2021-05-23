import * as dat from 'dat.gui'

const gui = new dat.GUI();
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const wave = {
  y: canvas.height/2,
  length: 0.003,
  amplitude: 100,
  frequency: 0.01
}

const strokeColor = {
  h: 200,
  s: 50,
  l: 50
}

const rectColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 1
}



const waveFolder = gui.addFolder('wave')
const strokeColorFolder = gui.addFolder('strokeColor')
const rectColorFolder = gui.addFolder('rectColor')

waveFolder.add(wave, 'y', 0, canvas.height)
waveFolder.add(wave, 'length', -0.01, 0.01)
waveFolder.add(wave, 'amplitude', -300, 300)
waveFolder.add(wave, 'frequency', -0.01, 1)

strokeColorFolder.add(strokeColor, 'h', 0, 255)
strokeColorFolder.add(strokeColor, 's', 0, 100)
strokeColorFolder.add(strokeColor, 'l', 0, 100)

rectColorFolder.add(rectColor, 'r', 0, 255)
rectColorFolder.add(rectColor, 'g', 0, 255)
rectColorFolder.add(rectColor, 'b', 0, 255)
rectColorFolder.add(rectColor, 'a', 0, 1)

waveFolder.open()
strokeColorFolder.open()

let strokeDirection = 1;
let increment =  wave.frequency;
function animate() {
  requestAnimationFrame(animate)

  c.fillStyle = `rgba(${rectColor.r},${rectColor.g},${rectColor.b},${rectColor.a})`
  c.fillRect(0,0,canvas.width, canvas.height)

  c.font = "5rem Sans Serif"
  c.fillStyle = "white"
  c.textAlign = "center"
  c.fillText("Hello World", canvas.width/2, canvas.height/2); 
  // c.clearRect(0,0, canvas.width, canvas.height)

  c.beginPath()

  c.moveTo(-100, canvas.height/2)

  for (let i = 0; i < canvas.width; i++) {
    c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude) 
    c.lineTo(i-100, wave.y  + Math.sin(i * wave.length + increment + 100) * wave.amplitude) 
  }

  increment += wave.frequency
  if(strokeColor.h === 33 || strokeColor.h === 0) {
    strokeDirection = -strokeDirection
  }
  strokeColor.h += strokeDirection
  c.strokeStyle = `hsl(${strokeColor.h}, ${strokeColor.s}%, ${strokeColor.l}%)`
  c.stroke()
}
animate()