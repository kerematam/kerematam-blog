import React from "react"
import CodeBlock from "../../../src/utils/CodeBlock"

const highlightedLines = []

const code = `import { useEffect } from "react"
import { Subject } from "rxjs"

export const createEvent = () => {
  const subject = new Subject()

  const useListener = callback => {
    useEffect(() => {
      const subscription = subject.subscribe(callback)
      return () => subscription.unsubscribe()
    }, [callback])
  }

  const useDispatcher = () => {
    return payload => subject.next(payload)
  }

  return { useListener, useDispatcher }
}

export const createComponentAction = () => {
  const context = createContext()
  const useDispatcher = payload =>
    useContext(context).useDispatcher(payload)
  const useListener = fn =>
    useContext(context).useListener(fn)
  const EventProvider = ({ children }) => {
    const createActionRef = useRef(createEvent())

    return (
      <context.Provider value={createActionRef.current}>
        {children}
      </context.Provider>
    )
  }

  const withAction = Component => props =>
    (
      <EventProvider>
        <Component {...props} />
      </EventProvider>
    )

  return {
    useDispatcher,
    useListener,
    EventProvider,
    withAction,
  }
}`

export default function CodeBlock0() {
  return (
    <CodeBlock
      highlightedLines={highlightedLines}
      code={code}
    />
  )
}
