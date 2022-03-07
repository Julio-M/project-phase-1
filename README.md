# NAME-TO-BE-DETERMINED

## Introduction

A web application showcasing information and news about crypocurrency assets

1. Languages used: Javascript
2. Markup language: HTML5
3. Style sheet language: CSS
4. Libraries: Bootsrap, chart.js
5. API: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`

## Start Up the Server

Run `json-server --watch db.json` to start the server.

> **Note**: For users of the [Live Server VSCode extension][live-server], if the
> page is reloading when you initiate a fetch request, you'll need to set up
> some additional configuration for Live Server to play nicely with
> `json-server`. Follow the steps in [this gist][live-server settings] (you'll
> only need to do this once), then come back to this lesson.

[live-server]: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
[live-server settings]: https://gist.github.com/ihollander/cc5f36c6447d15dea6a16f68d82aacf7
[fetch docs]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options
