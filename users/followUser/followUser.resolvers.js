import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        followUser: protectedResolver(async (_, { userName }, { loggedInUser }) => {
            const ok = await client.user.findUnique({ where: { userName } })
            if (!ok) {
                return {
                    ok: false,
                    error: "없는 계정 입니다."
                }
            }
            await client.user.update({
                where: {
                    id: loggedInUser.id
                },
                data: {
                    followings: {
                        connect: {
                            userName
                        }
                    }
                }
            })
            return {
                ok: true,
            }
        })
    }
}