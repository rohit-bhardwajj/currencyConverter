import { useState } from "react";
// import "./App.css";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  //currencyInfo has the result object that has keys (other currencies)
  //for entered currency ,i.e for value of "from" eg 'inr' to usd , it has inr object
  const options = Object.keys(currencyInfo);
  const swap = () => {
    setTo(from);
    setFrom(to); //method swapping currencies from and to को, to and from मे
    setConvertedAmount(amount); //as it was given by user ,so we bring it to other side
    setAmount(convertedAmount); //amount becomes converted , acc to swapped currency
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1611702700114-ac96de0952e2?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
      
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5  bg-white/20 backdrop-blur-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <h2 className=" text-fuchsia-50 font-extrabold text-center text-3xl my-4">Currency | Converter</h2>
            <div className="w-full mb-1">
              <InputBox 
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) =>setFrom(currency)}
              onAmountChange={(amount)=>setAmount(amount)}
              selectCurrency={from}         
               />
            </div>
            <div className="relative w-full h-0.5">
              <button
               onClick={swap}
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              
              <InputBox 
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency)=>
                setTo(currency)}
              selectCurrency={to}
              amountDisable
               />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {`${from.toUpperCase()} to ${to.toUpperCase()}` }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
