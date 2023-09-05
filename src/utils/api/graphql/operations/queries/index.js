import escrow from "./escrow";
import organization from "./organization";
import key from "./key";

const queries = {
  ...escrow,
  ...organization,
  ...key,
};

export default queries;
