import { useContractRead, useAccount } from "wagmi";
import DataDaoFactoryABI from "../constants/abi/DataDaoFactory.json";
import DataDaoABI from "../constants/abi/DataDao.json";
import Contracts from "../constants/contracts";
import { ethers } from "ethers";
import { useEnsAddress } from "wagmi";

const dataDaoFactoryAddress = Contracts.DataDAOFactory;
const chainID = 80001;

export const useSmartContract = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://wallaby.node.glif.io/rpc/v0"
  );

  var privateKey =
    "ebe102065928d0ae18fc5f6bc5953f7048d733a1f1fc8707babe59e8c923661b";
  var wallet = new ethers.Wallet(privateKey, provider);

  const dataDaoFactoryContract = new ethers.Contract(
    dataDaoFactoryAddress,
    DataDaoFactoryABI,
    wallet
  );

  const { address } = useAccount();

  const resolveEns = async (ensName) => {
    const ensAddress = await useEnsAddress(ensName);
    return ensAddress;
  };

  const getAddress = () => {
    console.log(address);
    return address;
  };

  const createDataDao = async () => {
    console.log("creating your data dao");
    try {
      const tx = await dataDaoFactoryContract.createDataDao(address);
      console.log(tx);
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const getContractBalance = async () => {
    console.log("fetching balance");
    const balance = await dataDaoFactoryContract.getContractBalance();
    console.log(parseInt(balance._hex, 16));
    return balance;
  };

  const getDataDao = async () => {
    console.log("fetching data dao");
    const dataDao = await dataDaoFactoryContract.searchByAddress(address);
    console.log(dataDao);
    return dataDao;
  };

  const getDataDaoMetadata = async () => {
    console.log("fetching data dao metadata");
    const dataDaoContract = new ethers.Contract(
      getDataDao(),
      DataDaoABI,
      wallet
    );
    const proposals = await dataDaoContract.proposals[0];
    console.log(proposals);
    return proposals;
  };

  return {
    getAddress,
    createDataDao,
    getContractBalance,
    getDataDao,
    resolveEns,
    getDataDaoMetadata,
  };
};
