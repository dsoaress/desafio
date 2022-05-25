import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import cx from 'classnames'
import { saveAs } from 'file-saver'
import React from 'react'

import { DownloadButton } from './DownloadButton'
import PDFViewer from './PDFViewer'

interface Tab {
  title: string
  value: string
}

const tabs: Tab[] = [
  {
    title: 'Trilha 1º ano',
    value: 'tab1'
  },
  {
    title: 'Trilha 2º ano',
    value: 'tab2'
  }
]

interface Props {}

const PDF = ({ file }: { file: string }) => {
  return (
    <div className="bg-white overflow-y-auto">
      <AspectRatio ratio={3 / 4}>
        <PDFViewer file={file} />
      </AspectRatio>
    </div>
  )
}

const ContentFirstYear = () => {
  const tabs: Tab[] = [
    {
      title: '1ª etapa',
      value: 'tab1'
    },
    {
      title: '2ª etapa',
      value: 'tab2'
    },
    {
      title: '3ª etapa',
      value: 'tab3'
    },
    {
      title: '4ª etapa',
      value: 'tab4'
    },
    {
      title: 'Orientações pedagógicas',
      value: 'tab5'
    }
  ]

  return (
    <>
      <TabsPrimitive.Root defaultValue="tab1" className="flex">
        <TabsPrimitive.List className={cx('flex flex-col rounded-t-lg ')}>
          {tabs.map(({ title, value }) => (
            <TabsPrimitive.Trigger
              key={`tab-trigger-${value}`}
              value={value}
              className={cx(
                'group bg-white rounded-tl-xl rounded-bl-xl',
                'radix-state-inactive:bg-gray-700 text-gray-700 radix-state-inactive:text-white',
                'flex-1 px-3 py-2.5',
                'focus:z-10 max-h-16 w-32 shrink-0'
              )}
            >
              <span className={cx('text-sm font-medium ', '')}>{title}</span>
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        {tabs.map(({ value }) => (
          <TabsPrimitive.Content
            key={`tab-content-${value}`}
            value={value}
            className={cx('rounded-tr-lg rounded-br-lg bg-white px-6 py-4 w-full')}
          >
            <span className="text-sm text-gray-700">
              {
                {
                  tab1: <PDF file="/assets/pdfs/1_1a-etapa.pdf" />,
                  tab2: <PDF file="/assets/pdfs/1_2a-etapa.pdf" />,
                  tab3: <PDF file="/assets/pdfs/1_3a-etapa.pdf" />,
                  tab4: <PDF file="/assets/pdfs/1_4a-etapa.pdf" />,
                  tab5: <PDF file="/assets/pdfs/1_ped.pdf" />
                }[value]
              }
            </span>
          </TabsPrimitive.Content>
        ))}
      </TabsPrimitive.Root>
      <DownloadButton
        onClick={() => saveAs('/assets/pdfs/trilha_1.pdf', `De vento em vento faz-se a luz.pdf`)}
      >
        Baixar PDF
      </DownloadButton>
    </>
  )
}

const ContentSecondYear = () => {
  const tabs: Tab[] = [
    {
      title: '1ª etapa',
      value: 'tab1'
    },
    {
      title: '2ª etapa',
      value: 'tab2'
    },
    {
      title: '3ª etapa',
      value: 'tab3'
    },
    {
      title: '4ª etapa',
      value: 'tab4'
    },
    {
      title: 'Orientações pedagógicas',
      value: 'tab5'
    }
  ]

  return (
    <>
      <TabsPrimitive.Root defaultValue="tab1" className="flex">
        <TabsPrimitive.List className={cx('flex flex-col rounded-t-lg ')}>
          {tabs.map(({ title, value }) => (
            <TabsPrimitive.Trigger
              key={`tab-trigger-${value}`}
              value={value}
              className={cx(
                'group bg-white rounded-tl-xl rounded-bl-xl',
                'radix-state-inactive:bg-gray-700 text-gray-700 radix-state-inactive:text-white',
                'flex-1 px-3 py-2.5',
                'focus:z-10 max-h-16 w-32 shrink-0'
              )}
            >
              <span className={cx('text-sm font-medium ', '')}>{title}</span>
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        {tabs.map(({ value }) => (
          <TabsPrimitive.Content
            key={`tab-content-${value}`}
            value={value}
            className={cx('rounded-tr-lg rounded-br-lg bg-white px-6 py-4 w-full')}
          >
            <span className="text-sm text-gray-700">
              {
                {
                  tab1: <PDF file="/assets/pdfs/2_1a-etapa.pdf" />,
                  tab2: <PDF file="/assets/pdfs/2_2a-etapa.pdf" />,
                  tab3: <PDF file="/assets/pdfs/2_3a-etapa.pdf" />,
                  tab4: <PDF file="/assets/pdfs/2_4a-etapa.pdf" />,
                  tab5: <PDF file="/assets/pdfs/2_ped.pdf" />
                }[value]
              }
            </span>
          </TabsPrimitive.Content>
        ))}
      </TabsPrimitive.Root>
      <DownloadButton onClick={() => saveAs('/assets/pdfs/trilha_2.pdf', `O sol é para todos.pdf`)}>
        Baixar PDF
      </DownloadButton>
    </>
  )
}

export const Tabs = (props: Props) => {
  return (
    <TabsPrimitive.Root defaultValue="tab1">
      <TabsPrimitive.List className={cx('flex w-full rounded-t-lg bg-white')}>
        {tabs.map(({ title, value }) => (
          <TabsPrimitive.Trigger
            key={`tab-trigger-${value}`}
            value={value}
            className={cx(
              'group',
              'first:rounded-tl-xl last:rounded-tr-xl',
              'flex-1 px-3 py-2.5',
              'focus:z-10 focus:outline-none',
              {
                'bg-[#006db6]': value === 'tab1',
                'bg-[#009f36]': value === 'tab2'
              }
            )}
          >
            <span className={cx('text-xl text-white font-bold')}>{title}</span>
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {tabs.map(({ value }) => (
        <TabsPrimitive.Content
          key={`tab-content-${value}`}
          value={value}
          className={cx('rounded-b-xl bg-white px-6 py-4', {
            'bg-[#006db6]': value === 'tab1',
            'bg-[#009f36]': value === 'tab2'
          })}
        >
          <span className="text-sm text-gray-700">
            {
              {
                tab1: <ContentFirstYear />,
                tab2: <ContentSecondYear />
              }[value]
            }
          </span>
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
