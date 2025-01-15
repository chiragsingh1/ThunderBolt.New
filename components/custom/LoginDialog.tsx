import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import lookup from "@/data/lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext, MouseEvent } from "react";
import { UserContext } from "@/context/UserContext";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";

interface Props {
    openDialog: boolean;
    closeDialog: (value: boolean) => void;
}

const LoginDialog = ({ openDialog, closeDialog }: Props) => {
    const { userDetail, setUserDetail } = useContext(UserContext);
    const CreateUser = useMutation(api.users.CreateUser);
    const convex = useConvex();

    const GetUserFromDb = async (email: string) => {
        const result = await convex.query(api.users.GetUser, {
            email,
        });
        return result;
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const userInfo = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse?.access_token}`,
                    },
                }
            );

            const user = userInfo?.data;

            await CreateUser({
                name: user?.name,
                email: user?.email,
                picture: user?.picture,
                uid: uuidv4(),
                token: 50000,
            });

            // Get the Convex user data
            const convexUser = await GetUserFromDb(user?.email);

            // Combine Google user data with Convex user data
            const userData = {
                ...user,
                _id: convexUser._id,
                token: convexUser.token,
            };

            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(user));
            }
            setUserDetail(userData);
            closeDialog(false);
        },
        onError: (errorResponse) => console.log(errorResponse),
    });

    const handleGoogleLogin = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        googleLogin();
    };

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">
                        {lookup.SIGNIN_HEADING}
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col justify-center items-center gap-3 mt-2">
                    <DialogDescription className="text-center">
                        {lookup.SIGNIN_SUBHEADING}
                    </DialogDescription>
                    <Button
                        className="hover:bg-blue-900 transition-colors bg-blue-500 text-white"
                        onClick={handleGoogleLogin}
                    >
                        Login with Google
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
