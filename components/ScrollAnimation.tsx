"use client"
import { ReactNode } from "react"
import {InView} from "react-intersection-observer"

interface ScrollAnimationProps {
    children: ReactNode,
    inViewClass: string,
    outViewClass: boolean,
    threshold: number,
    triggerOnce: boolean
}

export default function ScrollAnimation({children, inViewClass, outViewClass, threshold, triggerOnce} : ScrollAnimationProps)
{
    return (
        <InView triggerOnce={triggerOnce} threshold={threshold}>
            { ({inView, ref, entry}) => (
                <div ref={ref} className={inView ? inViewClass : outViewClass}>
                    {children}
                </div>
            ) }
        </InView>
    )
}
