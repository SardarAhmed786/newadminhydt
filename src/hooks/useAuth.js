import { useCallback } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { useToast } from "../state/hooks";
import { connectorsByName } from "../utils/web3React";

const useAuth = () => {
  const { toastError } = useToast();

  const login = async (connectorID) => {
    console.log("---------->", connectorID);

    // console.log("---------->", connectorsByName);

    // console.log("AAAAAA", connectorID)

    const connector = connectorsByName[connectorID];
    // console.log("---------->", connector);
    if (connector) {
      console.log("connector", connector);

      await connector.activate(11155111);
    } else {
      toastError("Can't find connector", "The connector config is wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const logout = async (connectorID) => {
    console.log("disssss", connectorID);
    const connector = connectorsByName[connectorID];
    console.log("disssss", connector);
    if (connector) {
      if (connector?.deactivate) {
        await connector.deactivate();
      } else {
        await connector.resetState();
      }
      // await connector.deactivate()
    } else {
      toastError("Can't find connector", "The connector config is wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return { login, logout };
};

export default useAuth;
