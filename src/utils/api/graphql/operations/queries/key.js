import { gql } from "@apollo/client";

export const KEY = gql`
  query Key($where: KeyWhereInput) {
    key(where: $where) {
      id
      organization {
        id
        name
        logo
        webhooks {
          url
          name
          description
        }
      }
      product {
        type
      }
    }
  }
`;

const key = { KEY };

export default key;
