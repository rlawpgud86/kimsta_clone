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
            try {
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
                });
                if (existingUser) {
                    throw new Error("이미 계정이 있습니다.")
                }
                // db에 userName와 email가 이미 있는지 확인하는 로직
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
            } catch (e) {
                return e;
            }
        }
    }
};