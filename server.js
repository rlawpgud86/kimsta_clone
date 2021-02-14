import { PrismaClient } from "@prisma/client";
import { ApolloServer, ExpandAbstractTypes, gql } from "apollo-server";

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
    deleteMovie(id:Int!): Movie
    updateMovie(id: Int!, year: Int!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(), //여기서 movie는 prisma에서 정의한 schema (model) 테이블 값이다.
    movie: (_, {id}) => client.movie.findUnique({where:{id}})

  },
  Mutation: { //movie 테이블 값에 데이터를 추가해보자
    createMovie: (_, { title, year, genre }) => client.movie.create({
      data: {
      title,
      year,
      genre,
    }}),
    deleteMovie: (_, { id }) => client.movie.delete({where: { id }}),
    updateMovie: (_, { id, year }) => client.movie.update({where: { id }, data: { year }}),
  },
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log("Server is running http://localhost:4000/"));
