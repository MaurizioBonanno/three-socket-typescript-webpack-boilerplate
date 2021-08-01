import { Scene, Vector3, BoxGeometry, MeshPhongMaterial, Mesh } from 'three';


export default class Map{
    scena: Scene;
    HORIZONTAL_UNIT = 100;
    VERTICAL_UNIT = 100;
    Z_SIZE;
    X_SIZE;
    spawnPoint: any[] = new Array();

    constructor(scena: Scene){
        this.scena = scena;
        this.createMap();
    }
    createMap() {
        var map = 'xxxxxxx\nxxxx\nxsx\nxx\nxxssxxx\nxxxx\nxxsx\nxxx\nxxxxxxx';
        var arrayMap = map.split("\n");
        //dimensioni del suolo
        this.Z_SIZE = arrayMap.length * this.HORIZONTAL_UNIT;
        this.X_SIZE = arrayMap[0].length * this.VERTICAL_UNIT;
        //ciclo l'array
        for (let i = 0; i < arrayMap.length; i++) {
            for (let j = 0; j < arrayMap[i].length; j++) {
                this.addVoxel(arrayMap[i].charAt(j),i,j);
            }
        }
    }
    addVoxel(type: string, row: number, col: number) {
        
        var z = (row+1)* this.HORIZONTAL_UNIT - this.Z_SIZE *0.5;
        var x = (col+1) * this.HORIZONTAL_UNIT - this.X_SIZE * 0.5;
        console.log(`tipo:${type},riga:${row},colonna:${col},posZ:${z},posX${x}`);
        switch(type){
            case '':
                break;
            case 's':
                this.spawnPoint.push(new Vector3(x,0,z));
                break;
            case 'x':
                var geo = new BoxGeometry(this.HORIZONTAL_UNIT,this.VERTICAL_UNIT,this.HORIZONTAL_UNIT);
                var material = new MeshPhongMaterial({color: Math.random()*0xfffff});
                var mesh = new Mesh(geo,material);
                mesh.position.set(x,this.VERTICAL_UNIT*0.5,z);
                this.scena.add(mesh);
                break;
        }
    }
}