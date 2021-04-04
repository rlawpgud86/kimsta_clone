import client from "../../client";

//pagination으로도 가능
export default {
  Query: {
    seePhotoComments: (_, { id }) =>
      client.comment.findMany({
        where: {
          photoId: id,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
  },
};

//이건 전체 호출
// export default {
//     Query: {
//       seePhotoComments: (_, { id }) =>
//         client.photo
//           .findUnique({
//             where: {
//               id,
//             },
//           })
//           .comment(),
//     },
//   };
