import { constructClassQuery } from "@/lib/utils";
import { click, fillInput, navigateToUrl, retrieve } from "@/scripts/base";
import { backgroundScriptsEnumSchema } from "@/types/background";
import { clickButtonRequestSchema, fillInputRequestSchema, navigateToUrlRequestSchema, retrieveRequestSchema } from "@/types/scripts/base";

const GOOGLE_CLOUD_BASE_URL = "https://console.cloud.google.com"
// const GOOGLE_CLOUD_BASE_URL = "https://www.google.com"

export default defineUnlistedScript(() => {

    const createGoogleOauth2Application = async () => {
        const PROJECT_DROPDOWN_BUTTON_CLASS_QUERY: string = constructClassQuery(
        "mdc-button mat-mdc-button cfc-switcher-button gm2-switcher-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button",
        );

        const clickProjectDropdownButtonRequest = {
            type: backgroundScriptsEnumSchema.Values.clickButton,
            input: {
                id: null,
                classQuery: PROJECT_DROPDOWN_BUTTON_CLASS_QUERY,
                index: 0,
            }
        };

        window.postMessage(clickProjectDropdownButtonRequest, "*");
    }

    const createButton = (onClick: () => Promise<void>) => {
        const button = document.createElement("button");
        button.textContent = "Auth Maven";
        button.style.position = "fixed";
        button.style.width = "200px";
        button.style.height = "50px";
        button.style.top = "10px";
        button.style.right = "10px";
        button.style.zIndex = "10000";
        button.style.backgroundColor = "#4CAF50";
        button.addEventListener("click", async () => {
            await onClick();
        });

        // TODO: Add an image to the button

        document.body.appendChild(button);
        onClick();

    };

    if (window.location.href.includes(GOOGLE_CLOUD_BASE_URL)) {
        createButton(createGoogleOauth2Application);
    }
});


