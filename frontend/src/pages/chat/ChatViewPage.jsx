import React, { useEffect, useState, useContext } from "react";
import { FaPaperPlane, FaComments, FaTimes, FaBars } from "react-icons/fa";
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

  const {
    auth: { loggedInUser },
  } = useContext(AuthContext);

  const getAllUsers = async () => {
    try {
      const res = await authSvc.getUsersByRole();
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users.");
    }
  };

  const getChatDetail = async () => {
    if (!selectedUser) return;
    try {
      const res = await chatService.listMyChatDetails(selectedUser._id);
      setChatDetail(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendChat = async () => {
    if (!message.trim()) return;
    try {
      const payload = { message, receiver: selectedUser._id };
      const res = await chatService.createChat(payload);
      setChatDetail(res.data);
      setMessage("");
      socket.emit("newMessage", {
        sender: loggedInUser._id,
        receiver: selectedUser._id,
      });
    } catch {
      toast.error("Failed to send message.");
    }
  };

  const onNewMessageReceived = async (data) => {
    if (!selectedUser) return;
    try {
      const res = await chatService.listMyChatDetails(data.sender);
      setChatDetail(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getChatDetail();
    socket.on("connect", () => console.log("Socket connected"));
    socket.on("newMessageReceived", onNewMessageReceived);
    return () => {
      socket.off("newMessageReceived", onNewMessageReceived);
    };
  }, [selectedUser]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-40 w-80 bg-gradient-to-b from-teal-50 via-white to-gray-100 p-4 border-r border-gray-200 shadow-md transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-lg font-semibold text-teal-700 flex items-center gap-2">
            <FaComments /> Chats
          </h2>
          <button
            className="md:hidden text-gray-700 hover:text-teal-600"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <ul className="space-y-3 overflow-y-auto h-[calc(100vh-100px)] pr-1 scrollbar-thin scrollbar-thumb-teal-400">
          {users.length > 0 ? (
            users.map((user) => (
              <li
                key={user._id}
                onClick={() => {
                  setSelectedUser(user);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 bg-white rounded-xl p-3 cursor-pointer border shadow-sm hover:shadow-md transition ${
                  selectedUser?._id === user._id
                    ? "border-teal-400 bg-teal-50"
                    : "border-gray-200"
                }`}
              >
                <div className="w-11 h-11 rounded-full overflow-hidden border">
                  <img
                    src={user.image || "/default-avatar.png"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 overflow-hidden">
                  <h4 className="font-medium text-gray-800 text-sm truncate">
                    {user.name}
                  </h4>
                  <p
                    className="text-[11px] text-gray-600 truncate"
                    title={user.email}
                  >
                    {user.email}
                  </p>
                  <span className="text-[10px] text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full mt-1 self-start">
                    {user.role}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-sm text-gray-400 mt-6">
              No users found
            </p>
          )}
        </ul>
      </div>

      {/* Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        ></div>
      )}

      {/* Chat Section */}
      <div className="flex-1 flex flex-col relative">
        {selectedUser ? (
          <>
            <div className="p-4 border-b bg-white flex items-center gap-3 shadow-sm">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-teal-600 hover:text-teal-700"
              >
                <FaBars />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Chat with{" "}
                  <span className="text-teal-600">{selectedUser.name}</span>
                </h2>
                <p className="text-xs text-gray-500">{selectedUser.email}</p>
                <p className="text-[11px] text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full inline-block mt-1">
                  {selectedUser.role}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-teal-50 scrollbar-thin scrollbar-thumb-teal-300">
              {chatDetail.length > 0 ? (
                chatDetail.map((chat) => (
                  <div
                    key={chat._id}
                    className={`flex ${
                      chat.sender._id === loggedInUser._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2 max-w-[75%] shadow-sm ${
                        chat.sender._id === loggedInUser._id
                          ? "bg-teal-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{chat.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center mt-10 text-gray-400">
                  <FaComments className="text-3xl mb-2" />
                  <p>Start chatting...</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-white flex items-center gap-3 shadow-md">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 bg-gray-50"
              />
              <button
                onClick={sendChat}
                className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-full transition-transform hover:scale-105 shadow"
              >
                <FaPaperPlane />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
            <FaComments className="text-4xl mb-3" />
            <p>Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatViewPage;
