import { createContext } from "react";

interface ActionType {
    actionType: string;
    timeStamp: number;
}

interface ActionContextType {
    action: ActionType | null;
    setAction: (action: ActionType | null) => void;
}

export const ActionContext = createContext<ActionContextType>({
    action: null,
    setAction: () => {},
});
