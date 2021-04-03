import bcrypt from "bcrypt";
import client from "../../client";

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
                const uglyPassword = await bcrypt.hash(password, 10);
                await client.user.create({
                    data: {
                        userName,
                        email,
                        firstName,
                        lastName,
                        password: uglyPassword,
                    }
                });
                return {
                    ok: true
                }
            } catch (e) {
                return e;
            }
        },
    }
};