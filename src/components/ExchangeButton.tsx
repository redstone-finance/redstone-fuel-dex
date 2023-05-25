interface Props {
  onClick: () => void;
}

export const ExchangeButton = ({ onClick }: Props) => (
  <button
    className="bg-redstone hover:opacity-75 text-white py-3 px-8 rounded-full text-xl"
    onClick={onClick}
  >
    Exchange!
  </button>
);
