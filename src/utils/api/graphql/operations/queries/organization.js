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

<<<<<<< HEAD
export default organization;
=======
export default organization;
>>>>>>> e05a257617f7db7d4ea85dd60189bdffa907d78b
