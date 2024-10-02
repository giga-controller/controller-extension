// const GOOGLE_CLOUD_BASE_URL = "https://console.cloud.google.com"
const GOOGLE_CLOUD_BASE_URL = "https://www.google.com"
const LINEAR_BASE_URL = "https://linear.app"

export default defineUnlistedScript(() => {

    const createButton = (onClick: () => void) => {
        const button = document.createElement("button");
        button.textContent = "Auth Maven";
        button.style.position = "fixed";
        button.style.width = "200px";
        button.style.height = "50px";
        button.style.top = "10px";
        button.style.right = "10px";
        button.style.zIndex = "10000";
        button.style.backgroundColor = "#4CAF50";
        button.addEventListener("click", onClick);

        // TODO: Add an image to the button

        document.body.appendChild(button);
    };

    if (window.location.href.includes(GOOGLE_CLOUD_BASE_URL)) {
        createButton(() => console.log("Google Cloud Button Clicked"));
    } else if (window.location.href.includes(LINEAR_BASE_URL)) {
        createButton(() => console.log("Linear Button Clicked"));
    }
});