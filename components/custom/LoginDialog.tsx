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

interface Props {
    openDialog: boolean;
    closeDialog: (value: boolean) => void;
}

const LoginDialog = ({ openDialog, closeDialog }: Props) => {
    const { userDetail, setUserDetail }: any = useContext(UserContext);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const userInfo = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse?.access_token}`,
                    },
                }
            );

            console.log(userInfo);
            setUserDetail(userInfo?.data);
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
                    <DialogDescription>
                        <div className="flex flex-col justify-center items-center gap-3">
                            <p className="mt-2 text-center">
                                {lookup.SIGNIN_SUBHEADING}
                            </p>
                            <Button
                                className="hover:bg-blue-900 transition-colors bg-blue-500 text-white"
                                onClick={handleGoogleLogin}
                            >
                                Login with Google
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
