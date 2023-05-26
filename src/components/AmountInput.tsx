import { formatAmount } from "../utils";

export function AmountInput(props: {
  amount: number;
  onInput: (value: number) => void;
  icon: string;
  className: string;
}) {
  return (
    <div className={`w-72 h-12 ${props.className}`}>
      <input
        type="text"
        value={formatAmount(props.amount)}
        className="text-gray-500 font-semibold pr-12 bg-gray-100 w-full h-12 rounded border focus:border-redstone text-xl text-right focus:outline-none focus:border-redstone"
        onInput={(e) => props.onInput(e.target.value)}
      />
      <img
        className="h-12 w-12 relative bottom-12 left-60"
        src={props.icon}
        alt="Icon"
      />
    </div>
  );
}
