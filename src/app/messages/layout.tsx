"use client";

import services from "@/services/Index";
import { useEffect, useState } from "react";
import { SideBarChat } from "@/components/layouts/Messages/SideBarChat";
import { useParams } from "next/navigation";
import { Snackbar, Alert } from "@mui/material";
import { Context } from "./context";
import { APPLICATION_CONST } from "@/constants/application";

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
    const  [pageConversation, setPageConversation] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [lastPage, setLastPage] = useState<boolean>(false);
    const params = useParams()
    const conversationId: string = params.id.toString();
    let firstLoadPage = 0;

    const sortListConversations: Function = (data: any) => {
      setListConversations((prevConversations) => {
        const existingIndex = prevConversations.findIndex(
          (conversation) => conversation.id == data.id
        );
    
        if (existingIndex !== -1) {
          const updatedConversations = prevConversations.filter(
            (conversation: conversation, index: number) => index !== existingIndex
          );

          return [
            {
              ...prevConversations[existingIndex],
              userSendLatestMessage: data.userSendLatestMessage,
              message: data.message,
              noUnredMessage: data.noUnredMessage == 0 ? 0 :prevConversations[existingIndex].noUnredMessage + 1
            },
            ...updatedConversations
          ];
        } else {
          return [...data, ...prevConversations];
        }
      });
    }

    const seenMessageOfConversation: Function = (conversationId: string) => {
      setListConversations((prevConversations) =>
        prevConversations.map((conversation: any) => 
          conversation.id === conversationId 
            ? { ...conversation, noUnredMessage: 0 } 
            : conversation
        )
      );
    };

    const value = {
      sortListConversations,
      seenMessageOfConversation,
    }
 
    const getListConversation = async () => {
      try {
        let res = await services.conversation.listConversation(
          listConversations.length
        );
        if (res.data.length < APPLICATION_CONST.CONVERSATION_PAGE_SIZE) {
          setLastPage(true);
        }

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
        setListConversations(listConversations.length > 0 ? [...listConversations, ...conversationData] : conversationData);
      } catch (error: any) {
        setErrorMessage(error.message.slice());
      }
    };
    const handleScroll = (event: React.FormEvent<HTMLFormElement>) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target;
      if (scrollTop + clientHeight >= scrollHeight && !lastPage && firstLoadPage > 2) {
        setPageConversation((prevPage) => prevPage + 1);
      }
      firstLoadPage ++;
    }

    useEffect(() => {
      if (!lastPage) {
        getListConversation();
      }
      document.getElementById("scrollableDiv")?.addEventListener("scroll", handleScroll, { passive: true, capture: true});
      return () => {
        document.getElementById("scrollableDiv")?.removeEventListener("scroll", handleScroll);
      }
      }, [pageConversation]);

    return (
      <main className="">
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
            {/* <BottomScrollListener onBottom={handleContainerOnBottom}>
              {(scrollRef) => ( */}
                <div
                  className="flex-grow flex flex-row min-h-0" id="scrollableDiv"
                >
                  {listConversations.length > 0 && (
                    <SideBarChat
                      listConversations={listConversations}
                      conversationId={conversationId}
                    />
                  )}
                  <Context.Provider value={value}>{children}</Context.Provider>
                </div>
              {/* )}
            </BottomScrollListener> */}
          </div>
        </div>
      </main>
    );
}