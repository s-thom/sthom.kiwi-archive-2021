# My website

I've written a new one again. It won't be the last.

## Highlights

- This is a Next.js site, but client-side Javascript is disabled ([Example](https://github.com/s-thom/sthom.kiwi/blob/728b162219fee82ed63456aaab297b828ab03908/pages/index.tsx#L131)).
- Blog data comes from Notion, and is rendered by [react-notion-x](https://github.com/NotionX/react-notion-x).
- Scripted bits of the site are actually web components, due to the above. ([Link](https://github.com/s-thom/sthom.kiwi/tree/main/web-components)).
  - The web components are bundled separately to the rest of the application.
- The background on the home page uses three.js
  - Previous versions used [react-three-fiber](https://github.com/pmndrs/react-three-fiber), but I eventually found I didn't need it. It's a really cool project, though.

## License

Code in this repository is made available under an `Apache 2.0` license. If this code has been useful to you in your projects, it'd be cool if you let me know as well.
