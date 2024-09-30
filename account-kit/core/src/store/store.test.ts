import { alchemy, arbitrumSepolia, sepolia } from "@account-kit/infra";
import { getAlchemyTransport } from "../actions/getAlchemyTransport.js";
import { setChain } from "../actions/setChain.js";
import { createConfig } from "../createConfig.js";
import { createDefaultAccountState } from "./store.js";
import { DEFAULT_STORAGE_KEY } from "./types.js";

describe("createConfig tests", () => {
  it("should setup the config with the correct transport", async () => {
    const config = await givenConfig();

    expect({ ...getAlchemyTransport(config) }).toMatchInlineSnapshot(`
      {
        "config": {
          "rpcUrl": "/api/sepolia",
        },
        "updateHeaders": [Function],
      }
    `);
  });

  it("should rehydrate the current chain and transport", async () => {
    const config = await givenConfig();

    // update the chain so we can make sure the store is updated
    expect(getStorageItem("chain").id).toBe(sepolia.id);
    await setChain(config, arbitrumSepolia);
    expect(getStorageItem("chain").id).toBe(arbitrumSepolia.id);

    // create a config that is the result of a rehydration
    const hydratedConfig = await givenConfig();

    expect(hydratedConfig.store.getState().chain.id).toBe(
      config.store.getState().chain.id
    );

    expect(hydratedConfig.store.getState().bundlerClient.chain.id).toBe(
      config.store.getState().bundlerClient.chain.id
    );

    expect(getAlchemyTransport(hydratedConfig).config).toMatchInlineSnapshot(`
        {
          "rpcUrl": "/api/arbitrumSepolia",
        }
      `);
  });

  it("should correctly serialize the state to storage", async () => {
    await givenConfig();

    expect(JSON.parse(localStorage.getItem(DEFAULT_STORAGE_KEY) ?? "{}"))
      .toMatchInlineSnapshot(`
        {
          "state": {
            "accountConfigs": {
              "11155111": {},
              "421614": {},
            },
            "chain": {
              "blockExplorers": {
                "default": {
                  "apiUrl": "https://api-sepolia.etherscan.io/api",
                  "name": "Etherscan",
                  "url": "https://sepolia.etherscan.io",
                },
              },
              "contracts": {
                "ensRegistry": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "ensUniversalResolver": {
                  "address": "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
                  "blockCreated": 5317080,
                },
                "multicall3": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 751532,
                },
              },
              "id": 11155111,
              "name": "Sepolia",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Sepolia Ether",
                "symbol": "ETH",
              },
              "rpcUrls": {
                "alchemy": {
                  "http": [
                    "https://eth-sepolia.g.alchemy.com/v2",
                  ],
                },
                "default": {
                  "http": [
                    "https://rpc.sepolia.org",
                  ],
                },
              },
              "testnet": true,
            },
            "config": {
              "client": {
                "connection": {
                  "rpcUrl": "/api/signer",
                },
              },
            },
            "connections": {
              "__type": "Map",
              "value": [
                [
                  11155111,
                  {
                    "chain": {
                      "blockExplorers": {
                        "default": {
                          "apiUrl": "https://api-sepolia.etherscan.io/api",
                          "name": "Etherscan",
                          "url": "https://sepolia.etherscan.io",
                        },
                      },
                      "contracts": {
                        "ensRegistry": {
                          "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                        },
                        "ensUniversalResolver": {
                          "address": "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
                          "blockCreated": 5317080,
                        },
                        "multicall3": {
                          "address": "0xca11bde05977b3631167028862be2a173976ca11",
                          "blockCreated": 751532,
                        },
                      },
                      "id": 11155111,
                      "name": "Sepolia",
                      "nativeCurrency": {
                        "decimals": 18,
                        "name": "Sepolia Ether",
                        "symbol": "ETH",
                      },
                      "rpcUrls": {
                        "alchemy": {
                          "http": [
                            "https://eth-sepolia.g.alchemy.com/v2",
                          ],
                        },
                        "default": {
                          "http": [
                            "https://rpc.sepolia.org",
                          ],
                        },
                      },
                      "testnet": true,
                    },
                    "policyId": "test-policy-id",
                    "transport": {
                      "__type": "Transport",
                      "rpcUrl": "/api/sepolia",
                    },
                  },
                ],
                [
                  421614,
                  {
                    "chain": {
                      "blockExplorers": {
                        "default": {
                          "apiUrl": "https://api-sepolia.arbiscan.io/api",
                          "name": "Arbiscan",
                          "url": "https://sepolia.arbiscan.io",
                        },
                      },
                      "contracts": {
                        "multicall3": {
                          "address": "0xca11bde05977b3631167028862be2a173976ca11",
                          "blockCreated": 81930,
                        },
                      },
                      "id": 421614,
                      "name": "Arbitrum Sepolia",
                      "nativeCurrency": {
                        "decimals": 18,
                        "name": "Arbitrum Sepolia Ether",
                        "symbol": "ETH",
                      },
                      "rpcUrls": {
                        "alchemy": {
                          "http": [
                            "https://arb-sepolia.g.alchemy.com/v2",
                          ],
                        },
                        "default": {
                          "http": [
                            "https://sepolia-rollup.arbitrum.io/rpc",
                          ],
                        },
                      },
                      "testnet": true,
                    },
                    "transport": {
                      "__type": "Transport",
                      "rpcUrl": "/api/arbitrumSepolia",
                    },
                  },
                ],
              ],
            },
            "signerStatus": {
              "isAuthenticating": false,
              "isConnected": false,
              "isDisconnected": false,
              "isInitializing": true,
              "status": "INITIALIZING",
            },
            "smartAccountClients": {
              "11155111": {},
              "421614": {},
            },
          },
          "version": 8,
        }
      `);
  });

  const getStorageItem = (name: string) => {
    return JSON.parse(localStorage.getItem(DEFAULT_STORAGE_KEY) ?? "{}")[
      "state"
    ][name];
  };

  const givenConfig = async () => {
    const config = createConfig({
      chain: sepolia,
      chains: [
        {
          chain: sepolia,
          transport: alchemy({ rpcUrl: "/api/sepolia" }),
          policyId: "test-policy-id",
        },
        {
          chain: arbitrumSepolia,
          transport: alchemy({ rpcUrl: "/api/arbitrumSepolia" }),
        },
      ],
      signerConnection: { rpcUrl: "/api/signer" },
      storage: () => localStorage,
    });

    await config.store.persist.rehydrate();

    config.store.setState({
      accounts: createDefaultAccountState([sepolia, arbitrumSepolia]),
    });

    return config;
  };
});
