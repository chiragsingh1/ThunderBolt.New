import { ActionContext } from "@/context/ActionContext";
import {
    PreviewProps,
    SandpackPreview,
    SandpackPreviewRef,
    useSandpack,
} from "@codesandbox/sandpack-react";
import { useContext, useEffect, useRef } from "react";

const SandpackPreviewClient = () => {
    const previewRef = useRef<SandpackPreviewRef>(null);
    const { sandpack } = useSandpack();
    const { action, setAction } = useContext(ActionContext);

    const getClient = async () => {
        const client = previewRef.current?.getClient();
        if (client) {
            // console.log(client);
            // @ts-ignore
            const res = await client.getCodeSandboxURL();
            // console.log(res);
            if (action?.actionType === "deploy") {
                const url = `https://${res.sandboxId}.csb.app`;
                window.open(url);
            } else if (action?.actionType === "export") {
                window.open(res?.editorUrl);
            }
        }
    };

    useEffect(() => {
        getClient();
    }, [sandpack && action]);

    return (
        <SandpackPreview
            style={{ height: "80vh" }}
            showNavigator
            ref={previewRef}
        />
    );
};

export default SandpackPreviewClient;
