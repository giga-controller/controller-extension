interface GoogleFlowProps {
  url: string;
}

export default function googleFlow({ url }: GoogleFlowProps) {
  const steps = [
      { action: "navigateToUrl", url },
  ];

  function executeStep(index: number) {
      if (index >= steps.length) return;

      chrome.runtime.sendMessage(steps[index], (response) => {
          if (chrome.runtime.lastError) {
              console.error('Error:', chrome.runtime.lastError);
          } else {
              console.log('Response:', response);
              executeStep(index + 1); // Trigger next step
          }
      });
  }

  executeStep(0); // Start with the first step
}