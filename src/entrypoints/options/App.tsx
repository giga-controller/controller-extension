import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDetailsStore } from '@/types/store/details';

function App() {
  const { detailsState, setDetailsState } = useDetailsStore();
  const [email, setEmail] = useState(detailsState.email);
  const [password, setPassword] = useState(detailsState.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update the persisted store
    setDetailsState({ email, password });
    
    console.log('Submitted and stored:', { email, password });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                type="password"
                value={password}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">Confirm</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default App