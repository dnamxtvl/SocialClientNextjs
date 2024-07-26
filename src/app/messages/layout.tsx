"use client";

import services from "@/services/Index";
import { useEffect, useState } from "react";
import { SideBarChat } from "@/components/layouts/Messages/SideBarChat";
import { useParams } from "next/navigation";
import { Snackbar, Alert } from "@mui/material";
import { Context } from "./context";

interface conversation {
  id: string;
  name: string;
  avatar: string;
  noUnredMessage: number;
  userSendLatestMessage: any;
  message: any;
}

export default function Layout({ children }: { children: React.ReactNode }) {
    const [listConversations, setListConversations] = useState<Array<conversation>>([]);
    const [pageConversation, setPageConversation] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const params = useParams()
    const conversationId = params.id;

    const sortListConversations: Function = (data: any) => {
      let isCurrentConveration = listConversations.find((item: conversation) => item.id == data.id);
      setListConversations((prevConversations) => {
        const existingIndex = prevConversations.findIndex(
          (conversation) => conversation.id == data.id
        );
    
        if (existingIndex !== -1) {
          const updatedConversations = prevConversations.filter(
            (conversation, index) => index !== existingIndex
          );

          return [ 
            {
              ...prevConversations[existingIndex],
              userSendLatestMessage: data.userSendLatestMessage,
              message: data.message,
              noUnRedMessage: prevConversations[existingIndex].noUnredMessage + 1
            },
            ...updatedConversations
          ];
        } else {
          return [data, ...prevConversations];
        }
      });
    }

    const value = {
      sortListConversations
    }
 
    const getListConversation = async () => {
      try {
        let res = await services.conversation.listConversation(
          pageConversation
        );
        const conversationData = res.data.map((item: any) => {
          return {
            id: item.conversation.id,
            name: item.conversation.name,
            avatar: item.conversation.avatar,
            noUnredMessage: item.noUnredMessage,
            userSendLatestMessage: item.userSendLatestMessage ? {
              id: item.userSendLatestMessage.id,
              firstName: item.userSendLatestMessage.firstName,
              lastName: item.userSendLatestMessage.lastName,
              avatar: item.userSendLatestMessage.avatar,
            } : null,
            message: {
              id: item.latestMessage.id,
              content: item.latestMessage.content,
              type: item.latestMessage.type,
              userlatestSeen: null,
              createdAt: item.latestMessage.createdAt,
            },
          };
        });
        setListConversations(conversationData);
      } catch (error: any) {
        setErrorMessage(error.message.slice());
      }
    };

    useEffect(() => {
      getListConversation();
    }, []);

    return (
      <main className="mb-4">
        <Snackbar open={errorMessage.length > 0} autoHideDuration={2000}>
          <Alert severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
        <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="border-b-2 border-gray-800 p-2 flex flex-row z-20">
              <div className="bg-red-600 w-3 h-3 rounded-full mr-2" />
              <div className="bg-yellow-500 w-3 h-3 rounded-full mr-2" />
              <div className="bg-green-500 w-3 h-3 rounded-full mr-2" />
            </div>
            <main className="flex-grow flex flex-row min-h-0">
              {listConversations.length > 0 && (
                <SideBarChat
                  listConversations={listConversations}
                  conversationId={conversationId}
                />
              )}
              <Context.Provider value={value}>{children}</Context.Provider>
            </main>
          </div>
        </div>
      </main>
    );
}