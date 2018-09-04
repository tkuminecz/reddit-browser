import * as React from 'react'
const styles = require('./styles.scss')

interface Props {
  score: number
}

export default ({ score }: Props) => {
  const scoreClass = (score > 0)
    ? styles.positive
    : styles.negative

  return (
    <span className={`${styles.score} ${scoreClass}`}>
      {score}
    </span>
  )
}
