import { DTO } from "./dto";

export default interface Model{
    add(symbolValue:DTO): Promise<DTO>;
    getLatest(symbol:String):Promise<DTO>;
}