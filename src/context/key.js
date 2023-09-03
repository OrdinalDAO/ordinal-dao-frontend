import { useQuery } from "@apollo/client";
import { createContext, useContext } from "react";
import { operations } from "../utils/api/graphql";
import get from "lodash/get";

const Context = createContext("balances");

export const Consumer = Context.Consumer;

const Key = ({ pkey, children }) => {
  const { data } = useQuery(operations.queries.KEY, {
    variables: { where: { value: pkey.value } },
  });
  const key = get(data, "key", {});
  return <Context.Provider value={{ key }}>{children}</Context.Provider>;
};

export default Key;

export const useKey = () => useContext(Context);