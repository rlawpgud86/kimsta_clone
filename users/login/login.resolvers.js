require("dotenv").config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
    Mutation: {
        login: async (_, { userName, password }) => {
            const user = await client.user.findFirst({ where: { userName } })
            if (!user) {
                return {
                    ok: false,
                    error: "존재 하지 않는 유저네임 입니다"
                }
            }
            const passwordOk = await bcrypt.compare(password, user.password)
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "비밀번호가 틀립니다."
                }
            }
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY)
            return {
                ok: true,
                token: token
            }
        }
    }
};