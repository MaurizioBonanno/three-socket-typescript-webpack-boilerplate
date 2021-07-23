import { BoxGeometry } from 'three';
export default class City{
    cube: BoxGeometry;
    constructor(){
        this.cube = new BoxGeometry(1,1,1);
    }
}