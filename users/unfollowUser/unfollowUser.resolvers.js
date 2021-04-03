import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { userName }, { loggedInUser }) => {
        const ok = await client.user.findUnique({
          where: { userName },
        });
        if (!ok) {
          return {
            ok: false,
            error: "언팔 할 수 없습니다.",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            followings: {
              disconnect: {
                userName,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
