import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Canvas, extend, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import earthTexture from './textures/2k_earth_daymap.jpeg'
import earthFragmentShader from './shaders/earthFragment.glsl'

// extend ({ earthFragmentShader })

function App() {
  const earthTextureLoader = useLoader(TextureLoader, earthTexture)

  //citeste 20-30 companii din .parquet

  //creezi un loop ca pentru fiecare companie sa fie facut un nou obiect sa fie pozitionat pe glob
  
   function sphereCoords (lat, lng, r) { // pune obiectele de la un lat long dat
    let theta = lat * Math.PI/180;
    let phi = lng * Math.PI/180;

    let x = (r * Math.sin(theta) * Math.cos(phi));
    let y = (r * Math.sin(theta) * Math.sin(phi));
    let z = (r * Math.cos(theta));

    return new THREE.Vector3(x, y, z);
}

 function getLatLng(x, y, z) {
    let theta = Math.acos(z/Math.sqrt(x*x + y*y + z*z));
    let phi = CalculatePhi(x, y);
    
    let lat = 180/Math.PI * theta;
    let lng = 180/Math.PI * phi;
    
    return new THREE.Vector2(lat, lng)
}

function CalculatePhi(x, y) {
    let phi = 0;
    if(x>0){
        phi = Math.atan(y/x);
    } else if(x < 0 && y >= 0){
        phi = Math.atan(y/x) + Math.PI;
    } else if(x < 0 && y < 0){
        phi = Math.atan(y/x) - Math.PI;
    } else if(x == 0 && y > 0){
        phi = Math.PI/2
    } else if(x == 0 && y < 0){
        phi = -Math.PI/2
    }
    return phi;
}

  return (
    <div id="canvas-container">
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <ambientLight intensity={2.0} />
        <pointLight position={[10, 10, 10]} />
        <mesh scale={[2, 2, 2]} position={[0, 0, 0]}>
          <sphereGeometry />
          <meshStandardMaterial map={earthTextureLoader}/>
        </mesh>
      </Canvas>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)

export default App  