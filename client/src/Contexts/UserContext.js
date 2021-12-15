import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userSignedIn, setUserSignedIn] = useState(
    sessionStorage.getItem("SignedInUser")
      ? JSON.parse(sessionStorage.getItem("SignedInUser"))
      : null
  );

  return (
    <UserContext.Provider
      value={{
        userSignedIn,
        setUserSignedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
