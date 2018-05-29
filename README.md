# Drover Front-end Challenge

## Notes

### Conventions and code style

I used my own style and conventions when writing the code (tabs over spaces, no semicolons, etc.).
Having said that, I'm very aware of the importance of maintaining consistency across a project.

### Tools

I've never used create-react-app before, I usually just start with a clean slate. However, I've come to appreciate its straightforwardness and ease of setting up. I guess in more advanced use cases it might get in your way, but that's what the eject is there for ;)

### Development

As one of the points of the challenge was to approximate the live website as close as possible, I took the liberty of inspecting the live source code and taking a lot of clues from it. A cool side-effect of that was getting to know a few really neat stuff. `styled-components` for example, seems like a really cool way to solve the CSS scoping problem. I also utilised a lot of the same UI components as the live website, not only to maintain the same look and behaviour, but also for practical and time reasons:

- react-slick
- react-onclickoutside
- rc-slider
- react-js-pagination

I usually develop this types of things myself, since I like to have full control, and because usually the designers I've worked with never start with existing components as a basis for their designs, so there ends up being a lot of mismatch between the available solutions and the desired outcome.

I've also scraped the fonts from the live website, as I was looking around and it looks like it's a paid font. I hope you don't mind :P

Oh, and even though it wasn't asked, I ended up adding Redux in the end, just so you know I can work with it ;)

### Tests

Unfortunately this is one of my weak points. Tests were never a priority (or even a thing) at my past jobs so I never really got into it. I hope to cross that fault from my list soon by learning from people who actually care about this. As it stands, I've done the minimum by writing snapshot tests for the two main components of the app (SearchForm and VehicleCard).

### API

Just wanted to leave a quick note of appreciation for the API endpoint used in this challenge, it was really pleasant to use, doing all the heavy lifting (e.g. aggregations)!

That is all, thank you!