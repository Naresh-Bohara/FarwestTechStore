import React, { useEffect, useState, useContext, useRef } from "react";
import {
  FaPaperPlane,
  FaComments,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import authSvc from "../auth/auth.service";
import chatService from "./chat.service";
import { toast } from "react-toastify";
import { AuthContext } from "../../components/context/AuthContext";
import socket from "../../config/socket.config";

const ChatViewPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatDetail, setChatDetail] = useState([]);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chatEndRef = useRef(null);

  const {
    auth: { loggedInUser },
  } = useContext(AuthContext);

  // ================= USERS =================
  const getAllUsers = async () => {
    try {
      const res = await authSvc.getUsersByRole();
      setUsers(res.data || []);
    } catch {
      toast.error("Failed to load users");
    }
  };

  // ================= CHAT =================
  const getChatDetail = async () => {
    if (!selectedUser) return;

    try {
      const res = await chatService.listMyChatDetails(selectedUser._id);
      setChatDetail(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= SEND MESSAGE =================
  const sendChat = async () => {
    if (!message.trim() || !selectedUser) return;

    try {
      const payload = {
        message,
        receiver: selectedUser._id,
      };

      const res = await chatService.createChat(payload);
      setChatDetail(res.data || []);
      setMessage("");

      socket.emit("newMessage", {
        sender: loggedInUser._id,
        receiver: selectedUser._id,
      });
    } catch {
      toast.error("Failed to send message");
    }
  };

  // ================= ENTER KEY SEND =================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendChat();
    }
  };

  const onNewMessageReceived = async (data) => {
    if (!selectedUser) return;

    const res = await chatService.listMyChatDetails(data.sender);
    setChatDetail(res.data || []);
  };

  // ================= EFFECTS =================
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getChatDetail();

    socket.on("newMessageReceived", onNewMessageReceived);

    return () => {
      socket.off("newMessageReceived", onNewMessageReceived);
    };
  }, [selectedUser]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatDetail]);

  // ================= UI =================
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed md:static z-40 w-80 h-full bg-white border-r shadow-lg transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >

        {/* HEADER */}
        <div className="h-14 flex items-center justify-between px-4 bg-teal-600 text-white">
          <div className="flex items-center gap-2 font-semibold">
            <FaComments /> Chats
          </div>

          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* USERS */}
        <div className="overflow-y-auto h-[calc(100vh-56px)]">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 p-3 cursor-pointer border-b hover:bg-gray-100
              ${selectedUser?._id === user._id ? "bg-teal-50" : ""}`}
            >
              <img
                src={user.image || "/default-avatar.png"}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>

              <span className="text-[10px] bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* ================= CHAT AREA ================= */}
      <div className="flex flex-col flex-1 h-screen">

        {/* HEADER */}
        <div className="h-14 flex items-center gap-3 px-4 bg-white border-b shadow-sm">
          <button
            className="md:hidden text-teal-600"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>

          {selectedUser ? (
            <div>
              <p className="font-semibold">{selectedUser.name}</p>
              <p className="text-xs text-gray-500">
                {selectedUser.email}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Select a user</p>
          )}
        </div>

        {/* ================= MESSAGES (FULL FLEX AREA) ================= */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gradient-to-b from-white to-gray-100">

          {chatDetail.map((chat) => {
            const isMe = chat.sender._id === loggedInUser._id;

            return (
              <div
                key={chat._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 max-w-[70%] rounded-2xl text-sm shadow
                  ${isMe
                      ? "bg-teal-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm"
                    }`}
                >
                  {chat.message}
                </div>
              </div>
            );
          })}

          <div ref={chatEndRef} />
        </div>

        {/* ================= INPUT (FIXED ALWAYS VISIBLE) ================= */}
        {selectedUser && (
          <div className="h-16 flex items-center gap-3 px-4 bg-white border-t">

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type message and press Enter..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <button
              onClick={sendChat}
              className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow"
            >
              <FaPaperPlane />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default ChatViewPage;