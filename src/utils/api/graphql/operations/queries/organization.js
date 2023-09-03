import { gql } from "@apollo/client";

export const ORGANIZATION = gql`
  query Organization($where: OrganizationWhereInput) {
    organization(where: $where) {
      id
      name
      webhooks {
        url
        name
        description
      }
    }
  }
`;

const organization = { ORGANIZATION };

export default organization;
