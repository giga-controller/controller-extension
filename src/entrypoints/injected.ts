export default defineUnlistedScript(() => {
    console.log("Hello from injected.ts");
    window.location.href = "https://example.com"; // Replace with your target URL
});