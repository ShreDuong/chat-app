"use client";

import React, { useState } from "react";
import { Check, UserPlus, X } from "lucide-react";

type Props = {
  incomingFriendRequests: IncomingFriendRequests[];
  sessionId: string;
};

const FriendRequests = ({ incomingFriendRequests }: Props) => {
  const [friendRequests, setFriendRequests] = useState(incomingFriendRequests);
  console.log("sap klp ;pg p dai ", incomingFriendRequests);
  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500 ">Nothing to show here</p>
      ) : (
        friendRequests.map((request) => {
          return (
            <div key={request.senderId} className="flex gap-4 items-center">
              <UserPlus className="text-black " />
              <p className={"font-medium text-lg"}>{request.senderEmail}</p>
              <button
                aria-label="accept friend"
                className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
              >
                <Check className="font-semibold text-white w-3/4 h-3/4" />
              </button>
              <button
                aria-label="deny friend"
                className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
              >
                <X className="font-semibold text-white w-3/4 h-3/4" />
              </button>
            </div>
          );
        })
      )}
    </>
  );
};

export default FriendRequests;
