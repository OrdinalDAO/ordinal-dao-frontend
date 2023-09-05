import { gql } from "@apollo/client";

export const ESCROWS = gql`
  query Escrows($where: EscrowWhereInput) {
    escrows(where: $where) {
      data {
        id
        transactions {
          id
          hex
          base64
          inputs
          outputs
          type
        }
        future {
          id
          source {
            id
            feed {
              id
              type
            }
          }
          outcomes {
            id
            description
            cet {
              id
              transactions {
                hex
              }
            }
          }
          processor {
            id
            type
            args
          }
          description
        }
        parties {
          id
          address
          collateral
        }
        collateral {
          assets {
            id
            type
            content
          }
        }
      }
      count
    }
  }
`;

export const ESCROW = gql`
  query Escrow($where: EscrowWhereInput) {
    escrow(where: $where) {
      id
      transactions {
        id
        hex
        base64
        inputs
        outputs
        type
      }
      future {
        id
        source {
          id
          feed {
            id
            type
          }
        }
        outcomes {
          id
          description
          cet {
            id
            transactions {
              hex
            }
          }
        }
        processor {
          id
          type
          args
        }
        description
      }
      parties {
        id
        address
        collateral
      }
      collateral {
        assets {
          id
          type
          content
        }
      }
    }
  }
`;

const escrow = { ESCROWS, ESCROW };

export default escrow;
