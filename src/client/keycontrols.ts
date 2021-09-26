
import { Object3D } from 'three';

export class KeyControl{

    activeState;
    root: Object3D;
    moveSpeed: number;
    rotateSpeed: number;

    constructor(object: Object3D){
      this.root = object;
      //imposta parametri default
      this.moveSpeed = 5;
      this.rotateSpeed = 0.05;
    }

    arrowMovement(){
        document.onkeydown = (evt)=>{
            console.log(evt.key);
            switch(evt.key){
                case "ArrowUp":
                   this.root.translateZ(-this.moveSpeed);
                break;
                case "ArrowDown":
                   // console.log('indietro');
                   this.root.translateZ(this.moveSpeed);
                break;
                case "ArrowRight":
                   // console.log('destra');
                    this.root.rotateY(-this.rotateSpeed);
                break;
                case "ArrowLeft":
                  //  console.log('sinistra');
                  this.root.rotateY(this.rotateSpeed);
                break;
                default:
                    return;
                break;
            }
        }
    }
}