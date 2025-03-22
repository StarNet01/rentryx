"use client";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  AttachFile,
  DeleteOutline,
  PushPin,
  Send,
  Star,
} from "@mui/icons-material";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import useSWR from "swr";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

const chatList = [
  {
    id: 1,
    title: "Chat 1",
    time: "10:00 AM",
    has_new_message: false,
    user_name: "user test",
    user_type: "broker",
    last_message: "test txt",
    profileImg: "test",
    isFavorite: false,
    isPin: false,
  },
  {
    id: 2,
    title: "Chat 2",
    time: "11:00 AM",
    has_new_message: true,
    user_name: "user test",
    user_type: "broker",
    last_message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ....",
    profileImg: "test",
    isFavorite: true,
    isPin: true,
  },
  {
    id: 3,
    title: "Chat 3",
    time: "12:00 PM",
    has_new_message: false,
    user_name: "user test",
    user_type: "broker",
    last_message: "test txt",
    profileImg: "test",
    isFavorite: false,
    isPin: false,
  },
];

const messageList = [
  {
    id: 1,
    text: "Chat 1",
    time: "10:00 AM",
    profileImgUrl: false,
    hasMe: false,
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ....",
    time: "10:00 AM",
    profileImgUrl: "test",
    hasMe: false,
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ....",
    time: "11:00 AM",
    profileImgUrl: "test",
    hasMe: true,
  },
];

const page = () => {
  const searchParams = useSearchParams();
  const [selectedChat, setSelectedChat] = useState(0);
  const [alignment, setAlignment] = useState("all");
  const [message, setMessage] = useState(""); //TODO this for test
  const [messageCategory, setMessageCategory] = useState<"all" | "requests">(
    "all"
  );

  useEffect(() => {
    const selectedFromUrl = searchParams.get("selected");
    if (selectedFromUrl) {
      setSelectedChat(Number(selectedFromUrl));
    }
  }, [searchParams]);

  const handleCategoryChange = (category: "all" | "requests") => {
    setMessageCategory(category);
  };

  const {
    data: chatList,
    mutate: chatListMutate,
    isLoading,
  } = useSWR(
    `chatList/${messageCategory}`,
    (url: string) => HttpClient.getInstance().fetcher(url) // TODO for dev
  );

  const {
    data: messageList,
    mutate: messageListMutate,
    isLoading: isLoadingMessage,
  } = useSWR(
    `getChatMessage/${selectedChat}`,
    (url) => HttpClient.getInstance().fetcher(url) // TODO for dev
  );

  if (isLoading) return <></>; // TODO for dev

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    console.log(newAlignment);
    setAlignment(newAlignment);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      HttpClient.getInstance()
        .post(`chat/${selectedChat}/upload-image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
           messageListMutate(); //TODO for dev
          toast.success("Image sent successfully");
        })
        .catch(() => {
          toast.error("Failed to send image");
        });
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      HttpClient.getInstance()
        .post(`sendMessage/${selectedChat}`, { message })
        .then(() => {
             messageListMutate(); //TODO for dev
        })
        .catch(() => {
          toast.error("cant send message");
        });
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  const deleteChat = () => {
    HttpClient.getInstance()
      .delete(`chat/${selectedChat}`)
      .then(() => {
         chatListMutate() //TODO for dev
        toast.success("Chat deleted successfully");
      })
      .catch(() => {
        toast.error("cant deleted this chat");
      });
  };
  const favoriteChat = () => {
    HttpClient.getInstance()
      .post(`chat/favorite/${selectedChat}`)
      .then(() => {
           chatListMutate()//TODO for dev
        toast.success("added");
      })
      .catch(() => {
        toast.error("cant favorite this chat");
      });
  };
  const pinChat = () => {
    HttpClient.getInstance()
      .post(`chat/pin/${selectedChat}`)
      .then(() => {
       chatListMutate() //TODO for dev
        toast.success("Chat pin successfully");
      })
      .catch(() => {
        toast.error("cant pin this chat");
      });
  };

  useEffect(() => {
    if (selectedChat !== 0) {
      // TODO Get data from api
    }
  }, [selectedChat]);

  return (
    <DashboardLayout panelType="company">
      <div className="flex h-full lg:pr-5">
        <div className="w-4/12 border-r border-gray-200">
          <div className="flex mb-4 gap-5 justify-center">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`${
                messageCategory === "all"
                  ? "text-[#8313B2] border-b-2 border-[#8313B2] font-bold"
                  : "text-[#A0A0A0]"
              } pb-2`}
            >
              All Message
            </button>
            <button
              onClick={() => handleCategoryChange("requests")}
              className={`${
                messageCategory === "requests"
                  ? "text-[#8313B2] border-b-2 border-[#8313B2] font-bold"
                  : "text-[#A0A0A0]"
              } pb-2`}
            >
              Requests
            </button>
          </div>
          <ToggleButtonGroup
            color="primary"
            fullWidth
            exclusive
            value={alignment}
            onChange={handleChange}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="read">Read</ToggleButton>
            <ToggleButton value="unread">Unread</ToggleButton>
          </ToggleButtonGroup>
          <div>
            <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              {chatList &&
                alignment === "unread" &&
                chatList
                  .filter((chat) => chat.has_new_message)
                  .map((item: any, i: number) => {
                    return (
                      <ChatItem
                        data={item}
                        selectedChat={selectedChat}
                        key={i}
                        onSelect={(id: any) => setSelectedChat(id)}
                      />
                    );
                  })}
              {chatList &&
                alignment === "read" &&
                chatList
                  .filter((chat) => !chat.has_new_message)
                  .map((item: any, i: number) => {
                    return (
                      <ChatItem
                        data={item}
                        selectedChat={selectedChat}
                        key={i}
                        onSelect={(id: any) => setSelectedChat(id)}
                      />
                    );
                  })}
              {chatList &&
                alignment === "all" &&
                chatList.map((item: any, i: number) => {
                  return (
                    <ChatItem
                      data={item}
                      selectedChat={selectedChat}
                      key={i}
                      onSelect={(id: any) => setSelectedChat(id)}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="w-8/12">
          <div className="w-full flex justify-between items-center px-5 border-b-2 pb-3">
            {selectedChat !== 0 && (
              <>
                <div className="pl-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        chatList.find((item: any) => item.id === selectedChat)
                          ?.profileImg
                      }
                      alt="Profile"
                      className="w-[60px] rounded-full h-[60px] object-cover"
                    />
                    <div>
                      <span className="font-bold text-[20px]">
                        {
                          chatList.find((item: any) => item.id === selectedChat)
                            ?.title
                        }
                      </span>
                      <span className="text-[#a0a0a0] ml-3">
                        (
                        {
                          chatList.find((item: any) => item.id === selectedChat)
                            ?.user_type
                        }
                        )
                      </span>
                      <h6 className="text-[16px]">
                        {
                          chatList.find((item: any) => item.id === selectedChat)
                            ?.user_name
                        }
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <IconButton
                    sx={{ color: "#A0A0A0" }}
                    onClick={() => deleteChat()}
                  >
                    <DeleteOutline />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: chatList.find(
                        (item: any) => item.id === selectedChat
                      )?.isFavorite
                        ? "#dabf39"
                        : "#A0A0A0",
                    }}
                    onClick={() => favoriteChat()}
                  >
                    <Star />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: chatList.find(
                        (item: any) => item.id === selectedChat
                      )?.isPin
                        ? "#dabf39"
                        : "#A0A0A0",
                    }}
                    onClick={() => pinChat()}
                  >
                    <PushPin />
                  </IconButton>
                </div>
              </>
            )}
          </div>
          <Box className="p-4" sx={{ height: "400px", overflowY: "auto" }}>
            {selectedChat !== 0 &&
              messageList.map((item: any, i: number) => {
                if (item.type === "image") {
                  if (item.hasMe) {
                    return (
                      <MessageWithImageFromUser
                        imageUrl={item.imageUrl}
                        time={item.time}
                        key={i}
                        profileImg={item.profileImgUrl}
                      />
                    );
                  }
                  return (
                    <MessageWithImageFromOther
                      imageUrl={item.imageUrl}
                      time={item.time}
                      key={i}
                      profileImg={item.profileImgUrl}
                    />
                  );
                }

                if (item.hasMe) {
                  return (
                    <MessageFromUser
                      message={item.text}
                      time={item.time}
                      key={i}
                      profileImg={item.profileImgUrl}
                    />
                  );
                }
                return (
                  <MessageFromOther
                    message={item.text}
                    time={item.time}
                    key={i}
                    profileImg={item.profileImgUrl}
                  />
                );
              })}
          </Box>
          <Box display="flex" alignItems="center" p={2}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <IconButton component="span">
                <AttachFile />
              </IconButton>
            </label>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSendMessage}>
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;

const MessageFromUser = ({
  message,
  time,
  profileImg,
}: {
  message: string;
  time: string;
  profileImg: string;
}) => {
  return (
    <>
      <div className="flex gap-3 items-start mb-4 justify-end">
        <div className="flex flex-col items-start">
          <div className="p-2 px-5 rounded-xl rounded-tr-none bg-[#D4AFE5] text-[#000] self-end">
            <div>{message}</div>
          </div>
          <div className="text-xs text-gray-300">{time}</div>
        </div>
        <img
          src={profileImg}
          alt="avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
      </div>
    </>
  );
};

const MessageFromOther = ({
  message,
  time,
  profileImg,
}: {
  message: string;
  time: string;
  profileImg: string;
}) => {
  return (
    <div className="flex gap-3 items-start mb-4">
      <img
        src={profileImg}
        alt="avatar"
        className="w-8 h-8 rounded-full mr-2"
      />
      <div className="flex flex-col items-end">
        <div className="p-2 px-5 rounded-xl rounded-tl-none bg-[#F0F2F6] text-[#000] self-end">
          <div>{message}</div>
        </div>
        <div className="text-xs text-gray-300">{time}</div>
      </div>
    </div>
  );
};

const ChatItem = ({ data, selectedChat, onSelect }: any) => {
  return (
    <li
      className={`w-full px-4 py-2 border-b border-gray-200 cursor-pointer ${
        selectedChat === data.id ? "bg-[#8313B2] text-white" : ""
      }`}
      onClick={() => onSelect(data.id)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {data.has_new_message && (
            <span className="inline-flex w-3 h-3 me-2 bg-[#79F6A7] rounded-full"></span>
          )}
          <span className="text-xl font-bold">{data.user_name}</span>
        </div>
        <span className="font-bold">{data.time}</span>
      </div>
      <span className="text-[#A0A0A0]">{data.user_type}</span>
      <p>{data.last_message}</p>
    </li>
  );
};

const MessageWithImageFromUser = ({
  imageUrl,
  time,
  profileImg,
}: {
  imageUrl: string;
  time: string;
  profileImg: string;
}) => {
  return (
    <div className="flex gap-3 items-start mb-4 justify-end">
      <div className="flex flex-col items-start">
        <div className="p-2 rounded-xl rounded-tr-none bg-[#D4AFE5]">
          <img
            src={imageUrl}
            alt="Sent image"
            className="max-w-[200px] rounded-lg"
          />
        </div>
        <div className="text-xs text-gray-300">{time}</div>
      </div>
      <img
        src={profileImg}
        alt="avatar"
        className="w-8 h-8 rounded-full mr-2"
      />
    </div>
  );
};

const MessageWithImageFromOther = ({
  imageUrl,
  time,
  profileImg,
}: {
  imageUrl: string;
  time: string;
  profileImg: string;
}) => {
  return (
    <div className="flex gap-3 items-start mb-4">
      <img
        src={profileImg}
        alt="avatar"
        className="w-8 h-8 rounded-full mr-2"
      />
      <div className="flex flex-col items-end">
        <div className="p-2 rounded-xl rounded-tl-none bg-[#F0F2F6]">
          <img
            src={imageUrl}
            alt="Received image"
            className="max-w-[200px] rounded-lg"
          />
        </div>
        <div className="text-xs text-gray-300">{time}</div>
      </div>
    </div>
  );
};
