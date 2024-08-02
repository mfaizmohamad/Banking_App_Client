import { useEffect, useState } from "react";

interface FormData {
  id: number;
  accountHolderName: string;
  balance: number;
}

const Account = () => {
  const [account, setAccount] = useState<FormData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const id = sessionStorage.getItem("id");
      if (!token || !id) {
        console.error("Token or ID is missing");
        setLoading(false);
        return;
      }

      const response = await fetch(`https://banking-app-server.onrender.com/api/accounts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data && typeof data === "object") {
          setAccount(data);
        } else {
          console.error("Expected an object but received:", data);
          setAccount(null);
        }
        console.log(data);
      } else {
        console.error("Failed to fetch data", response.statusText);
        setAccount(null);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Fetch error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      setAccount(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="grid justify-center mt-10">
          <p>Loading...</p>
        </div>
      ) : account ? (
        <div className="grid justify-center mt-10">
          <div className="shadow-md pr-[10rem] pl-5 py-5 rounded-md text-white bg-yellow-400">
            <p className="font-bold">Saving Accounts</p>
            <p className="text-sm mb-5">{account.accountHolderName}</p>
            <p>RM {account.balance}</p>
          </div>
        </div>
      ) : (
        <p>No account found</p>
      )}
    </div>
  );
};

export default Account;
