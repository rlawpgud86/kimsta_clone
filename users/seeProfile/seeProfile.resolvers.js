import client from "../../client";

export default {
    Query: {
        seeProfile: (_, { userName }) => client.user.findUnique({
            where: {
                userName,
            },
            include: {
                followings: true,
                followers: true
            } //db에 많은 부하를 준다. 일단 연습용으로 true로 두겠다.
        })
    },
};