interface GoogleFlowProps {
    url: string;
}

export default function googleFlow({ url }: GoogleFlowProps) {
    chrome.runtime.sendMessage({ action: "navigateToUrl", url }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError);
        } else {
          console.log('Response:', response);
        }
    });
}