import React, { FC } from 'react'

const MainPagesHeader: FC<{ text: string }> = ({ text }) => {
  return (
    <h2>{text}</h2>
  )
}

export { MainPagesHeader }
