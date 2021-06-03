import { gql } from "apollo-server-core";

export default gql`
  type Photo {
    id: Int!
    user: User
    file: String!
    caption: String
    likes: Int!
    comments: Int!
    isMine: Boolean!
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
    isLiked: Boolean!
  }
  type Hashtag {
    id: Int!
    createdAt: String!
    updatedAt: String!
    hashtag: String!
    photos(page: Int!): [Photo] #일부 필드값에만 args 추가 가능함
    totalPhotos: Int!
  }
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
