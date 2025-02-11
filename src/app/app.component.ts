import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ThreeJsTraining';
  scene: any;
  camera: any;
  renderer: any;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set( 0, 0, 100 );
    this.camera.lookAt( 0, 0, 0 );
    this.renderer = new THREE.WebGLRenderer();
  }

  ngOnInit(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.addCube();
    this.drawLine();
    if (WebGL.isWebGL2Available())
      this.renderer.setAnimationLoop(this.animate.bind(this));
    else {
      const warning = WebGL.getWebGL2ErrorMessage();
      document.getElementById('container')?.appendChild(warning);
    }
  }

  addCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x590bbf });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    this.camera.position.z = 5;
  }

  drawLine(){
    const material = new THREE.LineBasicMaterial( { color: 0x7f23f7 } );

    const points = [];
    points.push( new THREE.Vector3( - 1, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 1, 0 ) );
    points.push( new THREE.Vector3( 1, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    this.scene.add( line );
  }

  animate() {
    let cube = this.scene.children[0];
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}
