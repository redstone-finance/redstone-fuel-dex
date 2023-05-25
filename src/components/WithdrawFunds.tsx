interface Props {
  onClick: () => void;
}

export const WithdrawFunds = ({ onClick }: Props) => (
  <button
    className="bg-gray-400 hover:opacity-75 text-white py-3 px-8 rounded-full text-xl"
    onClick={onClick}
  >
    Withdraw Funds
  </button>
);
