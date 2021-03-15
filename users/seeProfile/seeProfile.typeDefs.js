import { gql } from "apollo-server-core"

export default gql`
    type seeProfileResult {
        ok: Boolean!
        error: String
    }
    type Query {
        seeProfile(userName: String!): seeProfileResult!
    }
`;