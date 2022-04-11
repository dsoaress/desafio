import { NextPage } from 'next'

import { data } from '../../_data'
import { Accordion } from '../components/Accordion'
import { Title } from '../components/Title'

const FAQ: NextPage = () => {
  return (
    <>
      <Title className="text-center">{data.faq.title}</Title>

      <Accordion questions={data.faq.questions} />
    </>
  )
}

export default FAQ
