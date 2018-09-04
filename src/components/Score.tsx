import * as React from 'react'

interface Props {
  score: number
}

export default ({ score }: Props) => {
  const scoreClass = (score > 0)
    ? 'positive'
    : 'negative'

  return (
    <span className={`score ${scoreClass}`}>
      {score}
    </span>
  )
}
