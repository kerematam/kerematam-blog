---
title: Handling Large State on URL
date: 2023-07-23
image: "./mj-4.png"
imageAlt: Cozy image that i've created with MJ.
---

<figure style="margin: 0; margin-bottom: 32px;">
  <img src="./mj-4.png" alt="A cozy image from Midjourney" title="A cozy image from Midjourney" >
    <figcaption>
      <i style="display: flex; justify-content: flex-end; font-size: 12px; color: var(--theme-ui-colors-muted);">
        A cozy image from Midjourney.
      </i>
    </figcaption>
</figure>

Storing a lot of state in a URL might seem handy, but keep in mind there's a 2000 character cap. Now, you could try trimming down the state you're storing to sidestep this limit. But trust me, it's not as easy as it sounds, at least to me. I've been down that road recently, and it wasn't a walk in the park. So, I'd suggest you think about other options (one is mentioned below), it might save you some headache!

Instead, store the state on the server, generate a unique id for each state, and when the user navigates to that URL, retrieve the state from the server. This method will keep your URLs short and clean.

### Still wanna reduce the state?

Here how you may do it.

Use base64 encoding instead of only relying on `JSON.stringfy`.

```js
const encodeState = state => {
  const jsonString = JSON.stringify(state)
  return Buffer.from(jsonString).toString("base64")
}

const decodeState = state => {
  // We can't trust if URL state is valid as it can be modified by a user.
  try {
    const decodedString = Buffer.from(
      state,
      "base64"
    ).toString()
    return JSON.parse(decodedString)
  } catch (e) {
    // fallback state
    return {}
  }
}
```

Say, for instance, you have this kind of state defining expanded items in the UI::

```json
{
  "expandAll": true,
  "59b4149b-e81f-48a8-ae06-766ab5666729": false,
  "4bf91619-f1f6-49ec-aa75-1544d2d91d6c": false,
  "78d7479d-4dd2-420d-bb30-d60638ab53b5": true,
  "d6804f9d-7bfd-4207-bf6b-c0ab5548f0c0": true
}
```

Define harcoded initial state, and only store the difference. Eg. in below example, we know that rest of items that are not listed are `true`. I dont need to track them on my state.

```json
{
  "expandAll": true,
  "59b4149b-e81f-48a8-ae06-766ab5666729": false,
  "4bf91619-f1f6-49ec-aa75-1544d2d91d6c": false
}
```

> **_CAVEAT:_**
> If you set a property to `undefined`, `JSON.stringfy` will clean it. You may use `null` for similar purporses., if you wanna keep it.

Define state with rules. Eg. instead of listing ids of all expanded items, define how would item shown in certain states:

```js
const isExpanded = state[id] ?? defaultStateThatOverridesExpandAll ?? expandAll
```

Still not enough? Use indexes instead of ids and hope no data changes on the server.🤞🤦 If you choose to take this horrible approach, it's better to add a timestamp and avoid using the URL state after a certain timeout (like 30 seconds, etc.).

```json
{
  "0": false,
  "1": false,
  "expandAll": true,
  "expire": 1690102973529
}
```
Good luck!