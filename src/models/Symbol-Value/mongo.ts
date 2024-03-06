import  Model  from "./model";
import { DTO } from "./dto";
import mongoose from "../../db/mongo";

const schema = new mongoose.Schema<DTO>({
    symbol:String,
    value:Number,
    when:Date

});

const symbolValueModel= mongoose.model<DTO>('SymbolValue',schema);

class Mongo implements Model{
    async add(symbolValue:DTO): Promise<DTO>{
        const newSymbolValue = new symbolValueModel(symbolValue);
        await newSymbolValue.save();
        return newSymbolValue;
    }
    async getLatest(symbol:String):Promise<DTO>{
        const symbolsValues = await symbolValueModel.find({symbol}).sort({when:-1}).limit(1);
        return symbolsValues[0];
    }
}

const mongo = new Mongo();
export default mongo;