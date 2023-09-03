import gql from "graphql-tag";

export const CREATE_ESCROW = gql`
  mutation CreateEscrow($data: EscrowDataInput) {
    createEscrow(data: $data) {
      id
    }
  }
`;

export const BROADCAST_ESCROW = gql`
  mutation BroadcastEscrow($data: EscrowDataInput) {
    broadcastEscrow(data: $data) {
      id
    }
  }
`;
export const EXECUTE_ESCROW = gql`
  mutation ExecuteEscrow($where: EscrowWhereInput) {
    executeEscrow(where: $where) {
      id
      transactions {
        base64
        hex
        txid
      }
    }
  }
`;
export const EXECUTE_SIGNATURE = gql`
  mutation ExecuteSignature($where: SignatureWhereInput, $data: SignatureDataInput) {
    executeSignature(where: $where, data: $data) {
      publicKey
    }
  }
`;

const escrows = {
  CREATE_ESCROW,
  BROADCAST_ESCROW,
  EXECUTE_ESCROW ,
  EXECUTE_SIGNATURE
};

export default escrows;
