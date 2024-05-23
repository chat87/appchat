import Conversations from "./Conversations";
import {IoSearchSharp} from "react-icons/io5";
import {BiLogOut} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Sidebar({socket}) {
  const [usersList, setUsersList] = useState([]);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
    socket.disconnect();
  }

  useEffect(() => {
    // fetchUser()
    socket.auth = {
      token: localStorage.token,
    };

    socket.connect();

    socket.on("users", async (users) => {
      try {
        users.forEach((user) => {
          console.log(user.username, "IN SOCKET 0");
          user.self = user.userID === socket.id;
        });

        const {data} = await axios.get("http://localhost:3000/list");
        let finalUserList = [];
        for (let i = 0; i < data.length; i++) {
          let dbUser = data[i];

          let isSocketExists = false;
          let userSocket = {};
          for (let j = 0; j < users.length; j++) {
            console.log(users[j].username, "IN SOCKET loop");
            let tempSocketUser = users[j];

            if (tempSocketUser.username == dbUser.userName) {
              console.log(tempSocketUser, "IN SOCKET 1");
              isSocketExists = true;
              userSocket = tempSocketUser;
              break;
            }
          }

          let tempUser = {
            username: dbUser.userName,
            online: false,
            self: false,
            key: "",
            userID: "",
          };

          if (isSocketExists) {
            console.log(tempUser.username, "IN SOCKET");
            tempUser.userID = userSocket.userID;
            tempUser.username = userSocket.username;
            tempUser.key = userSocket.key;
            tempUser.self = userSocket.self;
            tempUser.online = true;
          }

          finalUserList.push(tempUser);
        }

        finalUserList = finalUserList.sort((a, b) => {
          if (a.self) return -1;
          if (b.self) return 1;
          if (a.username < b.username) return -1;
          return a.username > b.username ? 1 : 0;
        });
        setUsersList(finalUserList);
        console.log(finalUserList, "akhir");
      } catch (err) {
        console.log(err);
      }
    });

    const handleUserConnected = (user) => {
      setUsersList((usersList) =>
        usersList.map((e) => {
          if (e.username === user.username) {
            e.online = true;
            e.key = user.key;
            e.userID = user.userID;
            e.self = false;
          }
          return e;
        })
      );
    };
    const handleUserDisconnected = (user) => {
      setUsersList((usersList) =>
        usersList.map((e) => {
          if (e.username === user.username) {
            e.online = false;
            e.key = "";
            e.userID = "";
            e.self = false;
          }
          return e;
        })
      );
    };

    socket.on("user connected", handleUserConnected);
    socket.on("user disconnected", handleUserDisconnected);

    return () => {
      socket.off("user connected", handleUserConnected);
      socket.off("user disconnected", handleUserDisconnected);
    };
  }, [usersList, socket]);
  return (
    <>
      <div className="border-r border-slate-500 p-4 flex flex-col">
        <form className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered rounded-full"
          />
          <button
            type="submit"
            className="btn btn-circle bg-sky-500 text-white"
          >
            <IoSearchSharp className="w-6 h-6 outline-none" />
          </button>
        </form>
        <div className="divider px-3"></div>
        {usersList.map((e) => {
          return <Conversations key={e.username} card={e} />;
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
