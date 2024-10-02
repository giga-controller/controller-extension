export default defineUnlistedScript(() => {

    const createButton = (onClick: () => void) => {
        const button = document.createElement("button");
        button.textContent = "Start";
        button.style.position = "fixed";
        button.style.top = "10px";
        button.style.right = "10px";
        button.style.zIndex = "1000";
        button.addEventListener("click", onClick);
        document.body.appendChild(button);
    };

    const startFunction = () => {
        if (window.location.href === "https://app.nango.dev/dev/integrations/google-mail/settings") {
            window.location.href = "https://google.com";
        } else {
            window.location.href = "https://example.com";
        }
    };

    const anotherFunction = () => {
        alert("Another function called!");
    };

    // Example of choosing which function to call
    const condition = true; // Replace with actual condition
    if (condition) {
        createButton(startFunction);
    } else {
        createButton(anotherFunction);
    }
});