import { Button } from '@/components/ui/button'
import { capitaliseFirstLetter } from '@/lib/utils'
import { Integration, integrationIconMapping, IntegrationState } from '@/types/integrations'
import { IconType } from 'react-icons/lib'

interface BaseIntegrationProps {
  selected: boolean
  integration: Integration
  url: string
  updateIntegrationState: (input: IntegrationState) => void
}

export default function BaseIntegration({
  selected,
  integration,
  url,
  updateIntegrationState,
}: BaseIntegrationProps) {
  const IconComponent = integrationIconMapping[integration]
  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      <Button
        className={`min-h-[70px]   w-full ${selected ? 'bg-green-500 hover:bg-green-500' : ''}`}
        onClick={() =>
          updateIntegrationState({
            integration: integration,
            targetUrl: url,
          })}
      >
        <div className="flex flex-col items-center justify-center">
          {IconComponent && <IconComponent className="m-2 size-4 group-hover:cursor-pointer" />}
          {capitaliseFirstLetter(integration)}
        </div>
      </Button>
    </div>
  )
}
