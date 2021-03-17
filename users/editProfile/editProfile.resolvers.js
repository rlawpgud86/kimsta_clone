import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

const resolverFn = async (_, {
    firstName,
    lastName,
    userName,
    email,
    password: newPassword,
}, { loggedInUser }) => {
    let uglyPassword = null;
    if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
        where: { id: loggedInUser.id },
        data: {
            firstName,
            lastName,
            userName,
            email,
            ...(uglyPassword && { password: uglyPassword })
        }
    })
    if (updatedUser.id) {
        return {
            ok: true
        }
    } else {
        return {
            ok: false,
            error: "프로필을 업데이트 할 수 없습니다."
        }
    }
}

export default {
    Mutation: {
        editProfile: protectedResolver(resolverFn)
    },
};