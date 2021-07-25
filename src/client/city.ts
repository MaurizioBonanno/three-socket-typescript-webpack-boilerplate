import { BoxGeometry, Matrix4, Mesh,  MeshPhongMaterial, PlaneBufferGeometry, Scene, DirectionalLight, FogExp2, Vector3 } from 'three';
export default class City{
    scene: Scene;
    constructor(scene: Scene){
        this.scene = scene;
    }

    makeCity(){
        //aggiungo il suolo 
        var plane = new PlaneBufferGeometry(2000,2000,20,20);
        var mat = new MeshPhongMaterial({color:0x9db3b5});
        var mesh = new Mesh(plane,mat);
        mesh.receiveShadow = true;

        mesh.rotation.x = -90*Math.PI/180;
        this.scene.add(mesh);

        //aggiungo la luce
        var light =  new DirectionalLight(0xf6e86c, 1);
        light.position.set(500,1500,1000);
        light.castShadow = true
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 1000;
        light.shadow.camera.far = 2500;

        
        //aggiungo gli edifici
        this.addBuilding();

        this.scene.fog = new FogExp2(0x9db3b5,0.0007);

        this.scene.add(light);

    }
    addBuilding() {
        var geo = new BoxGeometry(1,1,1);

        geo.applyMatrix4(new Matrix4().makeTranslation(0,0.5,0));
        var material = new MeshPhongMaterial({color: 0xcccccc});
        for (let index = 0; index < 100; index++) {
            var building = new Mesh(geo.clone(),material.clone());
            building.position.x = Math.floor(Math.random()*200-100)*6;
            building.position.z = Math.floor(Math.random()*200-100)*6;
            building.scale.x = Math.random()*50+10;
            building.scale.y = Math.random()*building.scale.x*8+8;
            building.scale.z = building.scale.x;
            building.castShadow = true;
            building.receiveShadow = true;
            console.log('aggiungo un edificio');
            this.scene.add(building);
        }
    }
}