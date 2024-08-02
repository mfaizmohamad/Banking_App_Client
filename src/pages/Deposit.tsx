import { useState, ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiReceiveMoney } from "react-icons/gi";
import Account from "./Account";

interface FormData {
  amount: number;
}

interface AccountData {
  id: number;
  accountHolderName: string;
  balance: number;
}

const Deposit = () => {
  const [formData, setFormData] = useState<FormData>({ amount: 0 });
  const [account, setAccount] = useState<AccountData | null>(null);
  const [balance, setBalance] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value),
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await postQuestion(formData);
      if (response.ok) {
        const data = await response.json();
        if (data && typeof data === "object") {
          setAccount(data);
        } else {
          console.error("Expected an object but received:", data);
          setAccount(null);
        }
        console.log(data);
        setBalance(true);
        console.log("Deposit successful!");
        toast.success("Deposit successful!");
        setFormData({ amount: 0 });
      } else {
        console.log("Failed to deposit.");
        toast.error("Failed to deposit.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const postQuestion = async (payload: FormData) => {
    const token = sessionStorage.getItem("jwtToken");
    const id = sessionStorage.getItem("id");
    const response = await fetch(
      `https://banking-app-server.onrender.com/api/accounts/${id}/deposit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    return response;
  };

  return (
    <div className="grid gap-5 justify-center mt-10">
        {balance && <div className="absolute mt-[-13rem] ml-[15.7rem]"><Account/></div>}
        
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="RM"
            aria-label="Amount"
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Deposit
          </button>
          <button
            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
            onClick={() => setFormData({ amount: 0 })}
          >
            Cancel
          </button>
        </div>
      </form>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <GiReceiveMoney  className="text-[3rem]"/>
        <a href="#">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            New Balance
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          RM: {account?.balance}
        </p>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Deposit;
