import { createContext } from "react";

export interface ActionType {
    actionType: string;
    timeStamp: number;
}

interface ActionContextType {
    action: ActionType;
    setAction: (action: ActionType) => void;
}

export const ActionContext = createContext<ActionContextType>({
    action: { actionType: "", timeStamp: 0 },
    setAction: () => {},
});
