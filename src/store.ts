import { writable } from "svelte/store";
import type { TezosToolkit } from "@taquito/taquito";
import type { BeaconWallet } from "@taquito/beacon-wallet";

interface State {
  Tezos: TezosToolkit;
  wallet: BeaconWallet;
  userAddress: string;
  currentView:
    | "generate-sig"
    | "verify-sig"
    | "encode-payload"
    | "decode-payload"
    | "cast-bytes-to-keyhash"
    | "initial";
  payloadToSign: Array<string>;
}

const initialState: State = {
  Tezos: undefined,
  wallet: undefined,
  userAddress: "",
  currentView: "initial",
  payloadToSign: []
};

const store = writable(initialState);

const state = {
  subscribe: store.subscribe,
  updateTezos: (tezos: TezosToolkit) =>
    store.update(store => ({ ...store, Tezos: tezos })),
  updateWallet: (wallet: BeaconWallet | undefined) =>
    store.update(store => ({ ...store, wallet })),
  updateUserAddress: (userAddress: string) =>
    store.update(store => ({ ...store, userAddress })),
  updateCurrentView: (view: State["currentView"]) =>
    store.update(store => ({ ...store, currentView: view })),
  updatePayloadToSign: (payload: Array<string>) =>
    store.update(store => {
      // payload must have 4 elements
      if (payload.length === 4 && payload[0] === "Tezos Signed Message:") {
        return { ...store, payloadToSign: payload };
      } else {
        return store;
      }
    })
};

export default state;
