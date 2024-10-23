'use client'

import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaCheckCircle } from 'react-icons/fa'
import { FaRegHourglassHalf } from 'react-icons/fa6'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'

export function TimelineClient() {
  return (
    <VerticalTimeline lineColor="#F1F1F1" className="customTimeline">
      <VerticalTimelineElement
        visible
        contentStyle={{
          // background: '#F1F1F1',
          color: '#000',
        }}
        position="right"
        dateClassName="text-black"
        iconStyle={{ background: 'green', color: '#fff' }}
        icon={<FaCheckCircle size={50} />}
      >
        <div className="flex gap-4 justify-between w-full">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Compra do equipamento</span>
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
              doloremque, maxime cum repellendus assumenda officiis obcaecati
              natus itaque a dicta quod error nostrum, architecto deserunt enim,
              commodi quis mollitia? Non?
            </span>
          </div>
          <div className="flex flex-col">
            <span>Atualizado em</span>
            <span className="text-xl font-bold">19/10/2024</span>
          </div>
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        visible
        contentStyle={{
          // background: '#7ea74c',
          color: '#000',
        }}
        position="right"
        dateClassName="text-black"
        iconStyle={{ background: 'yellow', color: '#4A87E2' }}
        icon={
          <AiOutlineLoading3Quarters
            className="animate-spin"
            style={{
              animationDuration: '7s',
            }}
          />
        }
      >
        <div className="flex gap-4 justify-between w-full">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Compra do equipamento</span>
            <span>Compra Efetuada</span>
          </div>
          <div className="flex flex-col">
            <span>Atualizado em</span>
            <span className="text-xl font-bold">19/10/2024</span>
          </div>
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        visible
        contentStyle={{
          // background: '#7ea74c',
          color: '#000',
        }}
        position="right"
        dateClassName="text-black"
        iconStyle={{ background: '#D9D9D9', color: '#4A87E2' }}
        icon={
          <FaRegHourglassHalf
            className="animate-spin"
            style={{
              animationDuration: '7s',
            }}
          />
        }
      >
        <div className="flex gap-4 justify-between w-full">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Compra do equipamento</span>
            <span>Compra Efetuada</span>
          </div>
          <div className="flex flex-col">
            <span>Atualizado em</span>
            <span className="text-xl font-bold">19/10/2024</span>
          </div>
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        visible
        contentStyle={{
          // background: '#7ea74c',
          color: '#000',
        }}
        position="right"
        dateClassName="text-black"
        iconStyle={{ background: '#D9D9D9', color: '#4A87E2' }}
        icon={
          <FaRegHourglassHalf
            className="animate-spin"
            style={{
              animationDuration: '7s',
            }}
          />
        }
      >
        <div className="flex gap-4 justify-between w-full">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Compra do equipamento</span>
            <span>Compra Efetuada</span>
          </div>
          <div className="flex flex-col">
            <span>Atualizado em</span>
            <span className="text-xl font-bold">19/10/2024</span>
          </div>
        </div>
      </VerticalTimelineElement>
    </VerticalTimeline>
  )
}
