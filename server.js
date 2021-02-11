import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";

const client = new PrismaClient() // client 객체 생성 

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    movies: [Movie]
    movie(id:Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id:Int!): Boolean
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(), //여기서 movie는 prisma에서 정의한 schema (model) 테이블 값이다.
    movie: (_, {id}) => ({ title: "Hello", year: 2021 }),
  },
  Mutation: { //movie 테이블 값에 데이터를 추가해보자
    createMovie: (_, { title, year, genre }) => client.movie.create({data:{
      title,
      year,
      genre
    }}),
    deleteMovie: (_, { id }) => {
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log("Server is running http://localhost:4000/"));
