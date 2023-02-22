import Head from "next/head";
import styles from "../styles/Home.module.css";
import { TTranx } from "../utils/wallet/types";
import { initWasm } from "@trustwallet/wallet-core";
import { signNearRaw } from "../utils/near";
import { Fragment, useState } from "react";
import { AddressForm } from "./ui-component/AddressForm";
import axios, { AxiosResponse } from "axios";
import ApprovalsTable from "./ui-component/ApprovalsTable";
import { Dialog, Popover, Transition } from "@headlessui/react";
export default function Home() {
  const txData: TTranx = {
    chainId: "near",
    amount: 0.025,
    contractAddress: "0x1fa4a73a3f0133f0025378af00236f3abdee5d63",
    contractDecimals: 24,
    nonce: 81780636000000,
    fromAddress:
      "e2f235b702f8d77aff6187f4a2a7df197716e00803ebd313733c24ef5d863b41",
    amountHex: "054b40b1f852bdc00000",
    blockHash: "CQHB33uE2hQceH11CYdiLBpbCjF69ZCSrqf3WgkExuP4",
    toAddress:
      "e2f235b702f8d77aff6187f4a2a7df197716e00803ebd313733c24ef5d863b41",
    amountValue: 25000000000000002097152,
    gasLimit: 0,
    gasPrice: 0,
  };

  const prvKey =
    "5yutZ7z1NUFmUbqBdFuAgWbqdXzpY1wZB7cnau4s9L4gzSFhMKb68XkJiY5yEVJSge3D3ib1bZGyrwnTj17bVvGg";
  const [hash, setHash] = useState("");

  const signNearTrust = async () => {
    const walletCore = initWasm().then((wallet) => {
      return wallet;
    });
    // const wallet = new Wallet(walletCore);
    // const txHash = await wallet.signNearTx(txData, prvKey);
    // console.log("txHas", txHash);
  };

  const signNearAPIJs = async () => {
    const txHash = await signNearRaw(txData, prvKey);
    console.log("txHas", txHash);
    setHash(txHash);
  };

  const [formData, setFormData] = useState({
    address: "",
    isSubmitted: false,
    loader: false,
  });

  const coinScanType = [
    {
      name: "Polygon",
    },
    {
      name: "BSC",
    },
    {
      name: "Fantom",
    },
  ];

  const [approvalList, setApprovalList] = useState([] as any);

  const postPolyScan = async (address: string) => {
    setFormData((prevData) => ({
      ...prevData,
      loader: true,
    }));
    const axiosInstance = axios.create();
    const postBody = {
      dataTableModel: {
        draw: 3,
        columns: [
          {
            data: "TxnHash",
            name: "",
            searchable: true,
            orderable: false,
            search: {
              value: "",
              regex: false,
            },
          },
          {
            data: "Block",
            name: "",
            searchable: true,
            orderable: false,
            search: {
              value: "",
              regex: false,
            },
          },
          {
            data: "Token",
            name: "",
            searchable: true,
            orderable: false,
            search: {
              value: "",
              regex: false,
            },
          },
          {
            data: "ApprovedSpender",
            name: "",
            searchable: true,
            orderable: false,
            search: {
              value: "",
              regex: false,
            },
          },
          {
            data: "ApprovedAmount",
            name: "",
            searchable: true,
            orderable: false,
            search: {
              value: "",
              regex: false,
            },
          },
          {
            data: "LastUpdated",
            name: "",
            searchable: true,
            orderable: false,
            search: {
              value: "",
              regex: false,
            },
          },
          {
            data: "Action",
            name: "",
            searchable: true,
            orderable: false,
            search: {
              value: "",
              regex: false,
            },
          },
        ],
        order: [],
        start: 0,
        length: 100,
        search: {
          value: "",
          regex: false,
        },
      },
      model: {
        address: address,
        filteredContract: "",
      },
    };
    const url = `https://cors.codecrane.com/https://polygonscan.com/tokenapprovalchecker.aspx/GetApprovedContract`;
    const config = {
      method: "post",
      url: url,
      data: postBody,
    };

    return new Promise((resolve) => {
      axiosInstance(config).then((res: any) => {
        if (res.status === 200) {
          const { data } = res;
          resolve(data.d.data);
          setFormData((prevData) => ({
            ...prevData,
            address: "",
            loader: false,
          }));
          return;
        }
        console.error("Something went wrong! Please try again.");
      });
    });
  };

  const handleAddress = (address: string) => {
    setFormData((prevData) => ({
      ...prevData,
      address: address,
    }));
  };

  const submitForm = async () => {
    if (formData.address) {
      const polygonscan = (await postPolyScan(
        formData.address
      )) as AxiosResponse;
      setApprovalList(polygonscan);
      console.log(polygonscan, "Polyscan");
    }
  };

  return (
    <>
      <Head>
        <title>Wallet Core Demo App</title>
        <meta name="description" content="Demo App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className="my-10">
          <div className="relative  flex flex-col">
            <AddressForm
              submitForm={submitForm}
              handleAddress={handleAddress}
              formData={formData}
            />
            {approvalList.length > 1 && (
              <div className="mx-10 border border-black rounded-lg">
                <ApprovalsTable approvalsList={approvalList} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
