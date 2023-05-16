# IrvineSweeper

### :trophy: [HackUCI 2023's Best Overall Winner](https://devpost.com/software/irvinesweeper)

## Tech Stack
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Inspiration

Every year, many of us fail to receive on-campus housing, forcing us into one of the most unrealistic housing markets in the country. The solution? For many coming from thousands of miles away, the only option is an Irvine Company apartment. Tenants face rising rental costs, negligent landlords, and predatory policies. Time and time again, young adults are exploited by a single entity with no other option in sight. And yet, Irvine is recognized nationwide as the perfect planned community, with most unaware of the true nature of that perfect appearance.

## What it does

IrvineSweeper illustrates the Irvine Company's chokehold on real estate in the city by asking it's users to engage in a game of classic minesweeper. Users are invited to explore a map of Irvine, clicking on locations while maintaining a healthy starting balance of $10,000. Just like our unknowing college students, users are blindsided as they eventually succumb to ridiculous rent prices and an overwhelming portfolio of residences, retail and office spaces. When the balance inevitably hits $0, it's game over.

## How we built it

At the core, IrvineSweeper operates on top of Google Cloud's "Google Maps Platform". By scraping internal APIs across numerous Irvine Company websites, we retrieve location data on various properties, including residence, retail and office spaces. Using a typescript frontend, we collect coordinate locations of users' clicks throughout the map and determine proximity using a haversine distance formula. If the distance is within a reasonable radius of the center of a property, we deduct a typical rent charge from the users' balance.

## Challenges we ran into
- Interoperability between React and Google Maps API
- Lack of public-facing Irvine Company data
- Lack of public-facing Irvine Municipal data
- Combining, cleaning and reformatting over 11000 lines of data into one consolidated schema, which was used in numerous facets across multiple APIs

## Accomplishments that we're proud of
- Keeping it fun!
- Playing to individual strengths while collaborating as a team
- Maintaining a high standard for quality, even at the smallest details
- Creating a fluid, consistent user interface that inherits the spirit of the project
- Our schema, which required ~6-7 hours of scouring through hundreds of network requests across numerous websites, cleaning dozens of unneeded fields, and restructuring locations into a seamlessly integrate-able structure
- Using small but effective animation to complement our fluid UI.

## What we learned
- Even a trillion-dollar tech company can't deliver a perfect API!
- When working with monstrous amounts of data, decide early on the layout of schema and integrate it into our application immediately.


## What's next for IrvineSweeper
- Integration with CoStar Group services (Apartments.com & Houses.com listings)
- Expand to other cities, pulling back the curtain on more real estate monopolies, and having a blast doing it!
