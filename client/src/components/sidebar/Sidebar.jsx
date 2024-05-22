
import Conversations from "./Conversations";
import { IoSearchSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Sidebar({ socket }) {
  const [usersList, addUsers] = useState([]);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
    socket.disconnect();
  }

  useEffect(() => {
    // ngeset auth buat socketnya
    socket.auth = {
      token: localStorage.token
    }

    // kenapa butuh connect manual? supaya bisa set auth dlu sblm connect
    socket.connect()

    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
      });
      users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      addUsers(users);
      console.log(users);
    });

    const handleUserConnected = (user) => {
      addUsers((usersList) => {
        const isExists = usersList.some((u) => u.username === user.username);
        if (!isExists) {
          return [...usersList, user];
        } else {
          return usersList;
        }
      });
    };
    const handleUserDisconnected = (disconnectedUser) => {
      addUsers((usersList) => usersList.filter(user => user.userID !== disconnectedUser.userID));
    };

    socket.on("user connected", handleUserConnected);
    socket.on("user disconnected", handleUserDisconnected);

    return () => {
      socket.off("user connected", handleUserConnected);
      socket.off("user disconnected", handleUserDisconnected);
    };
  }, []);
  return (
    <>
      <div className="border-r border-slate-500 p-4 flex flex-col">
        <form className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered rounded-full"
          />
          <button type="submit" className="btn btn-circle bg-sky-500 text-white">
            <IoSearchSharp className="w-6 h-6 outline-none" />
          </button>
        </form>
        <div className="divider px-3"></div>
        {usersList.map(e => {
          return <Conversations key={e.userID} card={e} />
        })}
        <div className="mt-auto">
          <BiLogOut
            className="w-6 h-6 text-white cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
}
