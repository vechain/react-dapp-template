import { 
  useSendTransaction,
  Wallet
} from '@vechain/vechain-kit';

export const useMintFioriono = (account: Wallet) => {
  const {
      sendTransaction: mintFiorino,
      isTransactionPending: isPending,
      status,
      txReceipt,
      error
  } = useSendTransaction({
      signerAccountAddress: account?.address,
      onTxConfirmed: () => console.log("Mint Fiorino transaction successful"),
      onTxFailedOrCancelled: () => console.log("Mint Fiorino transaction failed")
  });

  return { mintFiorino, isPending, status, error, txReceipt };
};

