// NavContext.js

import { useReducer, createContext, useMemo, useContext } from 'react';
import { initialState, navReducer } from './reducer';
import navActions from './action';
import navSelectors from './selector';

const NavContext = createContext();

function NavContextProvider({ children }) {
    const [state, dispatch] = useReducer(navReducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

function useNavContext() {
    const context = useContext(NavContext);
    if (!context) {
        throw new Error('useNavContext must be used within a NavContextProvider');
    }
    const { state, dispatch } = context;
    const navContextAction = navActions(dispatch);
    const navContextSelector = navSelectors(state);

    return {
        state,
        navContextAction,
        navContextSelector,
    };
}

export { NavContextProvider, useNavContext };
