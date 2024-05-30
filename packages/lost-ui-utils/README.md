# Lost UI Utils
Lost UI Utils is a collection of utility functions for Utility first components based on Vue 3 composition API.

## Motivation
In the course of my work, I have created several repetitive utility tools that I thought were worthy of being easily reusable in a separate package.

## Install
```bash
#npm
npm install @lostui/utils

#pnpm
pnpm add @lostui/utils
```
## UI Utils
### Composables

- [x] useDataTable
- [x] useFetchMore
- [x] useLazyLoadingState
- [x] usePagination
- [x] [useScrollToPromise](#useScrollToPromise)
- [x] useShowPassword
- [x] useSort
- [x] useValidation

### Components

- [x] FetchMoreObserver

### Utils

- [x] SortBy Intl.collator sorting
- [x] nextFrame
- [x] scrollTo
- [x] delay
- [x] animationEnd

## Composables

### useScrollToPromise <a id="useScrollToPromise"></a>
ScrollToPromise to help with complex scrolls. 

```js
  import { useScrollToPromise } from '@lostui/utils'

  const scrollTo = useScrollToPromise()
  
  async function goTo() {
    await scrollTo('#item-1')
    await scrollTo('#item-2')
  }
```
Example: [Playground](https://github.com/Sokamoka/lost-ui/blob/main/playgrounds/vite/src/pages/scroll-to-promise.vue)

## Components

### FetchMoreObserver
```js
import { FetchMoreObserver } from '@lostui/utils/components';
```
```html
<FetchMoreObserver
  :options="{ rootMargin: '200px' }"
  @intersect="fetchMore"
>
  <button @click="more">More</button>
</FetchMoreObserver>
```
