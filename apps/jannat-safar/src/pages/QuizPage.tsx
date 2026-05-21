import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Section, Badge } from '@great-indian-wedding/ui'
import { useThemeStore } from '@great-indian-wedding/theme-engine'
import type { MockCouple } from '@great-indian-wedding/mock-backend'
import { TRAVELER_QUIZ_QUESTIONS, calculateTravelerArchetype } from '../utils/travelQuiz'

interface Props {
  couple: MockCouple
  onChange: () => void
}

export const QuizPage: React.FC<Props> = ({ couple }) => {
  const { currentTheme } = useThemeStore()
  const navigate = useNavigate()
  const [answers, setAnswers] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)

  const handlePick = (qIdx: number, ans: number) => {
    const next = [...answers]
    next[qIdx] = ans
    setAnswers(next)
  }

  const allAnswered = answers.length === TRAVELER_QUIZ_QUESTIONS.length && answers.every((a) => a !== undefined)
  const archetype = allAnswered ? calculateTravelerArchetype(answers) : null

  return (
    <div>
      <Section
        title="Travel personality quiz"
        subtitle="8 quick questions. We use it to pre-filter destinations for the two of you."
      >
        {TRAVELER_QUIZ_QUESTIONS.map((q, idx) => (
          <Card key={q.id} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <Badge tone="info">Q{idx + 1}</Badge>
              <div style={{ fontWeight: 600 }}>{q.question}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
              {q.answers.map((a, aIdx) => {
                const selected = answers[idx] === aIdx
                return (
                  <button
                    key={aIdx}
                    onClick={() => handlePick(idx, aIdx)}
                    style={{
                      padding: '0.6rem 0.75rem',
                      borderRadius: 10,
                      border: selected ? `1.5px solid ${currentTheme.colors.primary}` : '1px solid rgba(0,0,0,0.1)',
                      background: selected ? currentTheme.colors.primary : 'white',
                      color: selected ? currentTheme.colors.secondary : '#1a1a1a',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.92rem',
                    }}
                  >
                    {a}
                  </button>
                )
              })}
            </div>
          </Card>
        ))}

        <Card accent>
          {archetype ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)' }}>Your archetype</div>
                <h3 style={{ margin: '0.25rem 0 0' }}>{archetype}</h3>
              </div>
              <Button variant="primary" size="lg" onClick={() => { setSubmitted(true); navigate('/destinations') }}>
                See matching destinations →
              </Button>
            </div>
          ) : (
            <p style={{ margin: 0, color: 'rgba(0,0,0,0.6)' }}>
              Answer all 8 questions to reveal your archetype. {answers.filter((a) => a !== undefined).length}/{TRAVELER_QUIZ_QUESTIONS.length} done.
            </p>
          )}
        </Card>
      </Section>
    </div>
  )
}
