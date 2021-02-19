import bcrypt from "bcrypt"
import client from "../client";

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            userName,
            email,
            password,
        }) => {
            const existingUser = await client.user.findFirst({
                where: {
                    OR: [
                        {
                            userName,
                        },
                        {
                            email,
                        }
                    ],
                },
            }); // db에 userName와 email가 이미 있는지 확인하는 로직
            const uglyPassword = await bcrypt.hash(password, 10);
            return client.user.create({
                data: {
                    userName,
                    email,
                    firstName,
                    lastName,
                    password: uglyPassword,
                }
            })
        }
    }
};