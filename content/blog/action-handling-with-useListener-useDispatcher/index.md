---
title: Imperative React Patterns I - Action Handling with useListener & useDispatcher
date: 2023-07-01
image: "./mj-1.png"
imageAlt: Cozy image that i've created with MJ.
---

<figure style="margin: 0; margin-bottom: 32px;">
  <img src="./mj-1.png" alt="A cozy image from Midjourney" title="A cozy image from Midjourney" >
    <figcaption>
      <i style="display: flex; justify-content: flex-end; font-size: 12px; color: var(--theme-ui-colors-muted);">A cozy image from Midjourney.</i>
    </figcaption>
</figure>

React is known for its powerful tools to manage state and facilitate communication between components. However, sometimes, you might find yourself needing a more dynamic, event-driven approach that isn't well-supported out of the box. In these cases, you can leverage some of the flexible aspects of React to create a custom solution.

```jsx
const { useDisaptcher, useListener } = createAction()

const action = { name: "my_action", payload: {} }

const SourceComponent = () => {
  const { dispatch } = useDisaptcher()
  const handleClick = () => {
    dispatch(action)
  }

  return (
    <button onClick={handleClick}>Source Button </button>
  )
}

const TargetComponent = () => {
  useListener(action => {
    if (action.name === "my_action") {
      // some imperative event here
      notifyUser()
    }
  })
  return <div></div>
}
```

In this blog post, we're going to delve into a custom event system for React applications using hooks and context API, aimed at providing an event-driven architecture to your React application. We will introduce a function called `createAction` that generates an event system where you can add and remove listeners. Then, we'll discuss how to utilize this system within React components with the hooks useListener and useDispatcher.

Following this, we will explore the createComponentEvent function, which extends our event system by using React's context API, allowing us to propagate our event system to a whole tree of React components. This not only facilitates dispatching and listening to events within a single component but also provides an efficient way to manage complex cross-component communication.

Whether you're looking for a way to augment the communication capabilities within your React application or merely want to explore a new architectural approach, this blog post aims to provide a detailed and clear introduction to creating and managing a custom event system in React. So, without further ado, let's dive right in!

```jsx
export const createAction = () => {
  const listeners = new Set()
  const subscribe = listener => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const useListener = fn => {
    const listener = useRef({})
    useEffect(() => {
      listener.current.fn = fn
    }, [fn])

    useEffect(() => {
      const unsubscribe = subscribe(listener.current)
      return unsubscribe
    }, [])
  }

  const useDispatcher = () => {
    const caller = payload => {
      listeners.forEach(l => l.fn(payload))
    }
    return caller
  }

  return { useDispatcher, useListener }
}
```

Now lets define it by per component context, which will make it only avaliable within component's scope.

```jsx
export const createComponentAction = () => {
  const context = createContext()
  const useDispatcher = payload =>
    useContext(context).useDispatcher(payload)
  const useListener = fn =>
    useContext(context).useListener(fn)
  const EventProvider = ({ children }) => {
    const createActionRef = useRef(createAction())

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

so when you need to use, wrap the roof component with `withAction` HOC.

_([Try it on Sandbox](https://codesandbox.io/s/uselistener-usedispatch-kfqtdf))_

### When to Use

It's actually best to avoid using this approach as much as possible. Extensive usage might make your code more complex and difficult to manage, which contradicts the intended purpose. Therefore, only use it when you see an opportunity to simplify things.

#### To Avoid Lifting State Up to Context

Sometimes, a component can manage its own state quite effectively in one place. However, there may be instances when you need to update part of a component's state by event from a component, far far away. In this case, you can elevate the component’s state to a higher-level component (a common practice known as "lifting state up") or to a Context. But be warned: lifting state up is not without its costs. This practice can disperse your state management, and updating state within a Context can lead to performance issues if existing code does not have proper coverage with `useMemo`, `useCallback`, and `memo`. Therefore, this would be the appropriate time to evaluate the trade-offs between elevating the state to a Context and the current approach that is mentioned in this blog post.

Be cautious, though! If you find yourself using this approach excessively, it may be a sign that you should consider refactor your code and lifting your state.
