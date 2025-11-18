import { useEffect, useState } from "react";
import api from "../../api/api";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function MarketCard() {
  const [market, setMarket] = useState(null);

  //   useEffect(() => {
  //     api.get("market/")
  //       .then(res => setMarket(res.data))
  //       .catch(err => console.log("Market API Error:", err));
  //   }, []);

  useEffect(() => {
    api
      .get("market/")
      .then((res) => {
        console.log("Market Response:", res.data);
        setMarket(res.data);
      })
      .catch((err) => console.log("Market API Error:", err));
  }, []);

  if (!market) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">وضعیت بازار</h2>
        در حال بارگذاری...
      </div>
    );
  }

  const { dollar, gold } = market;

  const ChangeIcon = ({ change }) =>
    change >= 0 ? (
      <TrendingUp className="w-4 h-4 text-red-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-green-600" />
    );

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">وضعیت بازار</h2>

      {/* دلار */}
      <div className="flex justify-between mb-3">
        <span className="text-gray-600 dark:text-gray-300">دلار</span>
        <div className="flex items-center gap-2">
          <span className="font-bold">
            {Number(dollar.price).toLocaleString("fa-IR")} تومان
          </span>
          <ChangeIcon change={dollar.change} />
        </div>
      </div>

      {/* سکه */}
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-300">سکه</span>
        <div className="flex items-center gap-2">
          <span className="font-bold">
            {Number(gold.price).toLocaleString("fa-IR")} تومان
          </span>
          <ChangeIcon change={gold.change} />
        </div>
      </div>
    </div>
  );
}
