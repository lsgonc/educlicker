"use client"
import { ReactNode } from "react"
import {InView} from "react-intersection-observer"

interface ScrollAnimationProps {
    children: ReactNode,
    inViewClass: string,
    outViewClass: string,
}

export default function ScrollAnimation({children, inViewClass, outViewClass} : ScrollAnimationProps)
{
    return (
        <InView triggerOnce={true} threshold={0.6}>
            { ({inView, ref, entry}) => (
                <div ref={ref} className={inView ? inViewClass : outViewClass}>
                    {children}
                </div>
            ) }
        </InView>
    )
}
