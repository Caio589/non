const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 3, 12);

const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 0.1, 100);
camera.position.set(0, 1.2, 6);

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.getElementById("scene").appendChild(renderer.domElement);

// Luz cinematográfica
const key = new THREE.DirectionalLight(0xffffff, 1.2);
key.position.set(3, 5, 4);
scene.add(key);
scene.add(new THREE.AmbientLight(0x404040, 0.6));

// Objeto “monumental”
const geo = new THREE.IcosahedronGeometry(1.6, 1);
const mat = new THREE.MeshStandardMaterial({ color: 0x9b7cff, roughness: 0.35, metalness: 0.4 });
const hero = new THREE.Mesh(geo, mat);
scene.add(hero);

// Movimento de câmera (abertura)
gsap.from(camera.position, { z: 12, duration: 4, ease: "power2.out" });

// Desmontagem cinematográfica
let shards = [];
function shatter(){
  hero.visible = false;
  for(let i=0;i<140;i++){
    const g = new THREE.BoxGeometry(0.12,0.12,0.12);
    const m = mat.clone();
    const p = new THREE.Mesh(g,m);
    p.position.copy(hero.position);
    scene.add(p); shards.push(p);
    gsap.to(p.position,{
      x:(Math.random()-0.5)*8,
      y:(Math.random()-0.5)*6,
      z:(Math.random()-0.5)*8,
      duration: 2.8,
      ease: "power3.out"
    });
  }
}
setTimeout(shatter, 4200);

function animate(){
  requestAnimationFrame(animate);
  hero.rotation.y += 0.003;
  renderer.render(scene, camera);
}
animate();

addEventListener("resize",()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
