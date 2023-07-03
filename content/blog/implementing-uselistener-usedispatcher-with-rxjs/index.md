---
title: Imperative React Patterns II - Implementing useListener & useDispatcher with RxJS
date: 2023-07-02
image: "./mj-2.png"
imageAlt: Cozy image that I've taken from MJ.
---

As RxJS provides rich tooling for event-driven implementations, I've decided to give it a try by implementing the previous example of action handling hooks (`useListener` and `useDispatcher`):

```jsx
export const createEvent = () => {
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
}
```

Since we have access to [RxJS operators](https://rxjs.dev/guide/operators) (such as `throttleTime`, `debounceTime` or `take` etc.), we can do lot more with our actions:

```jsx
import { debounceTime } from "rxjs"

const AComponentNestedDeepInDomTree = () => {
  useListener(action => {
    console.log("action ", action)
  }, debounceTime(3000))

  return <div>nested</div>
}
```
