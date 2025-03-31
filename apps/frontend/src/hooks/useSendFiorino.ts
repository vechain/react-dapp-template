import { 
  useSendTransaction,
  Wallet
} from '@vechain/vechain-kit';

export const useSendFioriono = (account: Wallet) => {
  const {
      sendTransaction: sendFiorino,
      isTransactionPending: isPending,
      status,
      txReceipt,
      error
  } = useSendTransaction({
      signerAccountAddress: account?.address,
      onTxConfirmed: () => console.log("Sent Fiorino transaction successful"),
      onTxFailedOrCancelled: () => console.log("Sent Fiorino transaction failed")
  });

  return { sendFiorino, isPending, status, error, txReceipt };
};

