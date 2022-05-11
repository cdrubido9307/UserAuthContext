import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider(props) {
    const [state, setState] = useState({
        loggedUser: null,
    });

    const onChangeUser = (user) => {
        setState(prevState => ({
            ...prevState,
            loggedUser: user
        }))
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                onChangeUser,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};