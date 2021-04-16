import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'

FlowRouter.route('/', {
  action () {
    render((
      <MemoLayout1>
        <MemoAside />
      </MemoLayout1>
    ), document.getElementById('react-root-1'))
  }
})

FlowRouter.route('/about', {
  action () {
    render((
      <MemoLayout1>
        <MemoAside />
      </MemoLayout1>
    ), document.getElementById('react-root-1'))
  }
})

const MemoLayout1 = React.memo(Layout1)
const MemoAside = React.memo(Aside)

const DeepComp = () => {
  const [data, setData] = useState(Date.now())
  useEffect(() => {
    setInterval(() => {
      setData(Date.now())
    }, 1000)
  }, [])
  return (
    <div>this is deep {data}</div>
  )
}

const MemoDeepComp = React.memo(DeepComp)


const NestedComp = () => {
  console.log('render NestedComp')
  return (
    <div>
      this is NestedComp
      <MemoDeepComp />
    </div>
  )
}
const MemoNestedComp = React.memo(NestedComp)

const MemoSuperDeep = React.memo(() => {
  const [route, setRoute] = useState({})

  useEffect(() => {
    Tracker.autorun(() => {
      FlowRouter.watchPathChange()
      const { path, queryParams, params } = FlowRouter.current()
      setRoute({ path, queryParams, params })
    })
  }, [])
  console.log('render MemoSuperDeep')
  return <div>route state {route?.path}</div>
})

function Layout1 ({ children }) {
  console.log('render Layout1')
  return (
    <div>
      {children}
    </div>
  )
}

function Aside () {
  console.log('render Aside')
  const [state, setState] = useState(Date.now())
  return (
    <div>
      <h3>aside {state}</h3>
      <button onClick={() => setState(Date.now())}>setState</button>
      <ul>
        <li><a href='/'>home</a></li>
        <li><a href='/about'>about</a></li>
      </ul>
      <MemoNestedComp />
      <MemoSuperDeep />
      {/* <NestedComp /> */}
    </div>
  )
}
