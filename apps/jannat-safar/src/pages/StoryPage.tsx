import React, { useMemo } from 'react'
import { Card, Section, StoryTimeline } from '@great-indian-wedding/ui'
import { mockApi } from '@great-indian-wedding/mock-backend'
import type { MockCouple } from '@great-indian-wedding/mock-backend'

interface Props {
  couple: MockCouple
}

export const StoryPage: React.FC<Props> = ({ couple }) => {
  const timeline = useMemo(() => mockApi.getTimeline(couple.id), [couple.id, couple.journeyStage])
  return (
    <Section
      title="Our story so far"
      subtitle={`Every milestone for ${couple.coupleName}, written automatically as you advance.`}
    >
      <Card>
        <StoryTimeline events={timeline} />
      </Card>
    </Section>
  )
}
