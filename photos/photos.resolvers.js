import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => {
      return client.user.findUnique({ where: { id: userId } });
    },
    hashtags: ({ id }) => {
      return client.hashtag.findMany({ where: { photos: { some: { id } } } });
    },
    likes: ({ id }) => {
      return client.like.count({ where: { photoId: id } });
    },
  },
  Hashtag: {
    photos: ({ id }, { page }, { loggedInUser }) => {
      console.log(page);
      return client.hashtag.findUnique({ where: { id } }).photos();
    }, //페이지네이션 기능 가능, 일부 필드값만 context값 쓸 수 있음
    totalPhotos: ({ id }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
