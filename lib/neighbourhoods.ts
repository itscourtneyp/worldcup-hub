import { Bar, Neighbourhood } from './types'
import { bars } from './bars'

export const NEIGHBOURHOODS: Neighbourhood[] = [
  'Hollywood',
  'Silver Lake',
  'Santa Monica',
  'Downtown',
  'WeHo',
  'Venice',
  'Echo Park',
  'Koreatown',
  'Los Feliz',
  'Mid-City',
  'Highland Park',
  'Valley',
  'Pasadena',
  'Culver City',
  'Atwater Village',
  'Burbank',
  'East LA',
  'El Segundo',
  'Sawtelle',
  'Redondo Beach',
]

export const NEIGHBOURHOOD_COPY: Record<
  Neighbourhood,
  { headline: string; subhead: string; about: string }
> = {
  Hollywood: {
    headline: 'World Cup Bars in Hollywood, LA',
    subhead:
      'Hollywood has the biggest match-day energy in the city. Find bars showing every match across the strip, from El Compadre to La Descarga.',
    about:
      'Hollywood is one of LA\'s most diverse neighbourhoods — and that shows on matchday. From the Latin bars of El Compadre and La Descarga to Big Wangs\' wall-to-wall screens, Hollywood has something for every fan. Expect loud crowds, extended hours, and the kind of atmosphere that spills out onto the pavement.',
  },
  'Silver Lake': {
    headline: 'World Cup Bars in Silver Lake, LA',
    subhead:
      'Indie pubs and proper football — Silver Lake brings a unique crowd to World Cup watching.',
    about:
      'Silver Lake has become home to some of LA\'s most dedicated football pubs. The Red Lion Tavern has anchored the German and American football communities here for decades, and The Greyhound draws the England faithful from across the east side. Expect a knowledgeable crowd and a great atmosphere for any match.',
  },
  'Santa Monica': {
    headline: 'World Cup Bars in Santa Monica, LA',
    subhead:
      'From legendary British pubs to beachside sports bars — Santa Monica has some of LA\'s finest World Cup venues.',
    about:
      'With the Pacific Ocean as backdrop and Ye Olde Kings Head as anchor, Santa Monica is one of the best neighbourhoods in LA to watch the World Cup. Sonny McLean\'s opens at 4am for the earliest European kickoffs. The Fox and Hounds and The Galley round out a neighbourhood that takes its football as seriously as its sunsets.',
  },
  Downtown: {
    headline: 'World Cup Bars Downtown Los Angeles',
    subhead:
      'The most international neighbourhood in LA — Downtown is where multiple fan communities collide on matchday.',
    about:
      'Downtown LA is home to a remarkable mix of nationalities, and that diversity shows during the World Cup. Casey\'s Irish Bar, The Association, and Le Petit Paris cover the European contingent. La Cita Bar is the heartbeat of the Mexican and Colombian communities. Far Bar in Little Tokyo brings Japanese fans together. And Mercado de Paloma turns into a massive outdoor fan zone for Spanish-speaking fans.',
  },
  WeHo: {
    headline: 'World Cup Bars in West Hollywood, LA',
    subhead:
      "WeHo brings its own energy to World Cup season — great screens, great cocktails, great crowds.",
    about:
      "West Hollywood has some of LA's most vibrant sports bar scenes. Barney's Beanery — a Hollywood institution since 1920 — draws a mixed crowd of USA, England, Germany, and Mexico fans. Bossa Nova brings the Brazilian and Latin vibe. WeHo's nightlife infrastructure means these bars stay open late and keep the energy going long after the final whistle.",
  },
  Venice: {
    headline: 'World Cup Bars in Venice, LA',
    subhead:
      'Venice brings boardwalk energy to World Cup watching — relaxed bars with serious football fans.',
    about:
      "Venice is Californian football culture at its best. The Brig draws a mixed crowd of USA, Brazil, and Argentina fans. Public School 213 has proper screens and a knowledgeable crowd. The Other Room is Venice's most passionate Latin bar for World Cup watching. The neighbourhood's relaxed vibe doesn't mean the football isn't taken seriously — it absolutely is.",
  },
  'Echo Park': {
    headline: 'World Cup Bars in Echo Park, LA',
    subhead:
      'Neighbourhood pubs and mixed crowds — Echo Park is authentic World Cup viewing territory.',
    about:
      "Echo Park has a quietly passionate football scene. The Short Stop draws a mixed crowd of USA, England, and Colombia fans in a setting that feels genuinely local rather than tourist-oriented. It's the kind of bar where you'll get into a proper football conversation with the person next to you.",
  },
  Koreatown: {
    headline: 'World Cup Bars in Koreatown, Los Angeles',
    subhead:
      'When South Korea play, all of Koreatown transforms into the loudest fan zone in the city.',
    about:
      "LA's Koreatown is one of the largest Korean communities outside Asia — and when the Taeguk Warriors play, the whole neighbourhood knows about it. The Stadium Club and Bar Avalon are ground zero for Korean fans. Normandie Club covers South Korea and Japan fans with an equally dedicated crowd. The energy here during a Korea match is unlike anything else in LA.",
  },
  'Los Feliz': {
    headline: 'World Cup Bars in Los Feliz, LA',
    subhead:
      'Los Feliz has proper football bars with character — a mix of British pub culture and Latin energy.',
    about:
      "From Busby's East (named after the legendary Manchester United manager) to El Conquistador (the neighbourhood's go-to Latin bar for El Tri and Argentina fans), Los Feliz offers a varied and passionate World Cup viewing experience. Ye Rustic Inn is a classic dive with good screens. It's a neighbourhood that knows its football.",
  },
  'Mid-City': {
    headline: 'World Cup Bars in Mid-City, Los Angeles',
    subhead:
      'Mid-City is LA\'s Latin football heartland — the best bars for Mexico, Argentina, and Brazil fans.',
    about:
      "Mid-City has some of LA's most passionate match-day atmospheres for Latin football fans. Escorpión is the jewel — 22 screens, 200 capacity, an outdoor screen, and Spanish commentary that makes it feel like you're watching from Buenos Aires or São Paulo. El Cholo is a classic Mexican restaurant that transforms into a proper fan zone for El Tri matches. Café Brasil brings the Portuguese-language energy.",
  },
  'Highland Park': {
    headline: 'World Cup Bars in Highland Park, LA',
    subhead:
      'The artsy northeast neighbourhood has a surprisingly dedicated World Cup viewing scene.',
    about:
      "Highland Park has seen an explosion of new bars and restaurants in recent years, and the football culture has grown with it. Highland Park Bowl is the neighbourhood's most distinctive venue — a renovated 1927 bowling alley with great screens and a crowd that mixes Brazil, Portugal, and Argentina fans in a genuinely unique setting.",
  },
  Valley: {
    headline: 'World Cup Bars in the San Fernando Valley',
    subhead:
      'The Valley has proper sports bars built for World Cup — big screens, cold beer, serious football fans.',
    about:
      "The San Fernando Valley tends to fly under the radar for football watching, but it has solid options across the board. Mercado Buenos Aires in Studio City is the heartbeat of the Argentine community out here. Tony's Darts Away in Burbank is the Valley's best British pub. El Rancho Grande rounds out the Valley's Latin football scene. Don't underestimate the Valley.",
  },
  Pasadena: {
    headline: 'World Cup Bars in Pasadena, LA',
    subhead:
      'Pasadena is Rose Bowl country — and Lucky Baldwins is the beating heart of the English football community out here.',
    about:
      "With the Rose Bowl just up the road, Pasadena has a special connection to the World Cup in 2026. Lucky Baldwins has been Pasadena's definitive English pub for 30 years — it opens at 7am for early kickoffs and fills up fast for any England, Germany, or USA match. The closest proper football pub to the Rose Bowl venue.",
  },
  'Culver City': {
    headline: 'World Cup Bars in Culver City, LA',
    subhead:
      "Culver City has a quietly serious football scene — Joxer Daly's is one of LA's best Irish pubs for match days.",
    about:
      "Culver City punches above its weight for football watching. Joxer Daly's has been showing Premier League and international football since before it was fashionable in LA — the regulars here know their game and they'll be loud for every England match. A neighbourhood that rewards knowing where to look.",
  },
  'Atwater Village': {
    headline: 'World Cup Bars in Atwater Village, LA',
    subhead:
      'Home of Goal Sports Cafe — the most dedicated football pub on the east side.',
    about:
      "Atwater Village is where the serious supporter groups base themselves on the east side of LA. Goal Sports Cafe is the anchor — eight screens, no dead angles, and a crowd that actually knows the offside rule. It opens at 6am for the earliest kickoffs and hosts LAFC and LA Galaxy supporter groups. The most committed football pub in this part of the city.",
  },
  Burbank: {
    headline: 'World Cup Bars in Burbank, LA',
    subhead:
      'The Valley-adjacent Burbank has solid sports bars for World Cup — including The Blue Room.',
    about:
      "Burbank is the quiet achiever of LA football watching. The Blue Room is a laid-back dive bar with four good screens and a local crowd that takes its football seriously without the tourist energy you get on the Westside. Good value, good drinks, and a neighbourhood feel that's increasingly rare in LA.",
  },
  'East LA': {
    headline: 'World Cup Bars in East Los Angeles',
    subhead:
      'East LA is the true heartland of Mexican football in LA — the loudest, most passionate match days in the city.',
    about:
      "For El Tri support, nowhere in LA touches East LA. The neighbourhood has the largest Mexican-American community in the city, and when Mexico play, the bars overflow onto the streets. La Taqueria on Cesar Chavez is the hub — outdoor screen, proper Mexican food, Spanish commentary, and a crowd that lives and dies with every tackle. East LA is where the World Cup feels most real.",
  },
  'El Segundo': {
    headline: 'World Cup Bars in El Segundo, LA',
    subhead:
      'A small beach city with a dedicated German football community at Das Bootshaus — the only proper German bar on the Westside.',
    about:
      "El Segundo is a sleeper pick for World Cup watching. Das Bootshaus is the only proper German bar on the Westside — pulling in the German-American community from Culver City to Manhattan Beach when Die Mannschaft play. German commentary, proper German beer, and a tight-knit community that makes every match feel like an event. Small venue, big atmosphere.",
  },
  Sawtelle: {
    headline: 'World Cup Bars in Sawtelle (Little Osaka), Los Angeles',
    subhead:
      'Sawtelle Japantown is the heartbeat of Japanese football culture in LA — where the Samurai Blue have their most passionate supporters.',
    about:
      "Sawtelle Blvd — known as Little Osaka — is LA's most authentically Japanese neighbourhood. When Japan play at the World Cup, the izakayas and bars along Sawtelle fill with Japanese expats and Japanese-Americans who've followed the Samurai Blue for years. Yakitoriya is the anchor: yakitori skewers, cold Sapporo, Japanese commentary, and a crowd that knows every player's name. This is where the real Japanese football community gathers.",
  },
  'Redondo Beach': {
    headline: 'World Cup Bars in Redondo Beach, Los Angeles',
    subhead:
      'South Bay football on the waterfront — Naja\'s Place is one of LA\'s most legendary bars for World Cup watching.',
    about:
      "Redondo Beach is the South Bay's sleeper hit for World Cup 2026. Naja's Place on the Redondo Beach Pier is a genuine institution — 90+ beers on tap, a waterfront setting, and a loyal crowd that has opened its doors for every World Cup since 1982. England fans, USA supporters, and football purists from Manhattan Beach to Torrance make the pilgrimage here. If you want proper atmosphere without the Hollywood crowds, Redondo Beach delivers.",
  },
}

export function getBarsByNeighbourhood(neighbourhood: Neighbourhood): Bar[] {
  return bars.filter((b) => b.neighbourhood === neighbourhood)
}

export function neighbourhoodToSlug(neighbourhood: Neighbourhood): string {
  return neighbourhood.toLowerCase().replace(/\s+/g, '-')
}

export function slugToNeighbourhood(slug: string): Neighbourhood | undefined {
  return NEIGHBOURHOODS.find(
    (n) => n.toLowerCase().replace(/\s+/g, '-') === slug
  )
}
