import { Model } from "./model";
import { DTO } from "./dto";
import query from "../../db/mysql"; 
import { OkPacketParams } from "mysql2";

class MySQL implements Model{
     async add(userSymbol: DTO):Promise<DTO>{
        const {userId, symbol} = userSymbol;

        const result:OkPacketParams= await query(`
        INSERT INTO users_symbols
        (user_id, symbol)
        VALUES
        (?, ?)
        `, [userId,symbol]);

        const newUserSymbol: DTO={
            ...userSymbol,
            id:result.insertId
        }

        return newUserSymbol;

    }
    async getForUser(userId: number): Promise<DTO[]> {
        const userSymbol:DTO[]  = await query(`
        SELECT id, user_id, symbol
        FROM    users_symbols
        WHERE   user_id = ?
        `,[userId])

        return userSymbol;
    }
}

const mysql  = new MySQL();
export default mysql;