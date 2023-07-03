import React from "react"
import CodeBlock from "../../../src/utils/CodeBlock"

const highlightedLines = [4, 5, 6, 10, 26, 27]

const code = `export const createEvent = () => {
  const subject = new Subject()

  const useListener = (callback, operator) => {
    const operatedSubject = useMemo(() => {
      return subject.pipe(operator)
    }, [])

    useEffect(() => {
      const subscription =
        operatedSubject.subscribe(callback)
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
  const useListener = (fn, operator) =>
    useContext(context).useListener(fn, operator)
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

export default function CodeBlock1() {
  return (
    <CodeBlock
      highlightedLines={highlightedLines}
      code={code}
    />
  )
}
