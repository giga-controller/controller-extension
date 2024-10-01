import GoogleIntegration from "@/components/integrations/google";
import LinearIntegration from "@/components/integrations/linear";
import SlackIntegration from "@/components/integrations/slack";
import { ScrollArea } from "@/components/ui/scroll-area";

function App() {
  
  return (
    <ScrollArea className="min-w-[400px] max-w-[600px] flex flex-col gap-4">
      <h1 className="text-center font-bold text-2xl py-5">
        Select Integration
      </h1>
      <div className="flex items-center justify-center flex-col w-full">
        <div className="max-w-[100px] space-y-2 mb-3">
          <GoogleIntegration />
          <SlackIntegration />
          <LinearIntegration />
        </div>
      </div>
    </ScrollArea>
  );
}

export default App;
