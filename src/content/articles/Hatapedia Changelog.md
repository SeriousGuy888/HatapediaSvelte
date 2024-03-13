---
subtitle: About Hatapedia
date_created: 2023-05-01
date_modified: 2024-03-13
tags:
  - meta
---

# SvelteKit Rewrite of Hatapedia

This rewrite of the entire website in SvelteKit instead of NextJS has been a long time coming. It took a couple of months, but it is pretty epique.

- **2024-03-13**
  - Finished converting the timeline component to SvelteKit. Works the same as it did before.
- **2024-01-01**
  - Added out of order notice to the world map page. It's currently broken and I'm not entirely sure why.
- **2023-12-11** 
  - Made the scrollbar look nicer in light mode.
    - The scrollbar no longer changes width when switching between light and dark mode.
- **2023-12-08**
  - Reimplemented the book and quill viewer from the old website. Not much special about it, but it's nice to have it back.
    - Also it will now display the correct text colours as specified by the book and quill's Minecraft text. (previously it was just using the same CSS colour names)
  - Article link cards (used on the homepage and in the quickswitcher) now use JavaScript soft-navigation (as a progressive enhancement) to work.
    - I also updated them to remove the nested `<a>` tags, since the nested `<a>` tags is invalid HTML and was causing the cards to render incorrectly when JS is disabled (the tags, which are links, were being rendered outside of the card).
    - There is still an `<a>` tag inside the card, but it is only used when JavaScript is disabled (in which case soft-navigation is not possible anyway).
  - Added a fancy new scrollbar for dark mode. Also, the scrollbar is no longer invisible in light mode.
- **2023-12-06**
  - The new and improved quickswitcher (Ctrl + K) will now use soft navigation (ie: no page reload), making it much faster to use, and it will close itself after you press enter.
  - Images will now be grouped together into a gallery if they are placed next to each other in the article, meaning images will take up less vertical space in articles. The image viewer functionality from [[#2023-08-18]] has not yet been reimplemented because I hate writing remark plugins; I don't know how to make a div that has children because there is no documentation for that.
- **2023-12-05**
  - Successfully reimplemented the infoboxes feature using dynamic components in Svelte. This was one of the major obstacles preventing me from migrating the site to SvelteKit for a while. It took a couple of weeks to figure out, but I have finally made a breakthrough today.
- **2023-12-03**
  - Articles will now once again display their date of creation and last modification.
- **2023-11-18**
  - Now using global theme colours with Tailwind. I'm not really sure how to use any of this stuff. It might make colours easier and more consistent in the future. I'm not sure. I'm just trying something new I guess.
- **2023-11-17**
  - Fixed the wikilink plugin to work with the new SvelteKit version of the site.
  - Added styles for <ruby>ruby text<rt>ruby text</rt></ruby>.
  - Added a banner on the homepage. Only displays in dark theme for now.
  - Added a half working reimplementation of the old Hata map viewer. It's not quite done.
- **2023-11-14**
  - Allow using the arrow keys to navigate results in the quickswitcher.
  - Added some animations to the quickswitcher.
  - Style tweaks.
  - Added an error page for when users go to a page that doesn't exist.
  - Inlinks (backlinks) are now once again displayed at the bottom of articles.
  - Added a table of contents.
    - Fixed bug where table of contents doesn't update when you click links to navigate between different articles.
- **2023-11-13**
  - Added a quickswitcher <kbd>Ctrl</kbd><kbd>K</kbd> that allows you to quickly search through and navigate between articles. An improvement over the original website!
  - Article links will now properly turn red if a page doesn't exist.
  - Callouts now render as they used to.
- **2023-11-12**
  - Improved tag listing page's styling.
  - Fixed the tag listing page's title not updating when clicking a tag to list a different tag.
  - Fixed theme transition animation.
  - You can now search for articles by aliases instead of just their main title.
- **2023-11-11**
  - Added a nice looking front page.
  - More recently updated articles are now higher up in the listing on the homepage.
  - The front page now contains a search bar.
    - Majorly improved the searchbar compared to the one on the old website. It now uses fuzzy search and will display results as you type. (I installed FuseJS and it was very epic. I didn't have to write much additional code to make it work.)
    - This search bar does all the searching client side, so I'm not sure whether it would make any sense to implement full-text search. Maybe on the server side? I'm not sure.
  - Articles will now list their tags at the top.
  - Added a page that lists all articles with a certain tag.
- **2023-11-10**
  - Added infrastructure for rendering articles from markdown files.
  - Added infrastructure for converting article file names to URL friendly slugs.
    - Article slugs will properly remove diacritics (eg: `café` -> `cafe`).
  - Added a light/dark theme toggle with transitions.
  - Added infrastructure for filtering articles by tags, something that was not possible on the old website.
- **2023-11-09**
  - Started this project. Created the skeleton SvelteKit project. Added Tailwind and Lucide, as well as a very basic general layout for the website.

Note that all the changelog entries below this point are not for the new version of this website which you are presumably reading right now. They are for the old version of the website, which was written in NextJS.

Some features from the old website have not yet been reimplemented in the new website — not yet anyway.

# 2023-09-10

## Added Ctrl+K to Search

You can now press <kbd>Ctrl</kbd><kbd>K</kbd> to bring up a search pallette that allows you to search for articles by their title.

# 2023-08-18

## Added Inline Image Viewer

You can now click on images in articles to view them in a larger size without leaving the page. The previewer also displays the alt text as a description of the image below the image itself.

You can still view the original by clicking the `View Original` link.

![[Remy Portrait.png|A portrait of RemyHemy, the Glorious Leader of the Remy Republic and former captain of the Flagrant Fowls bobble league team.]]

# 2023-07-19

## Added Backlinks

Articles on HATApedia are extensively hyperlinked together. Now, you will find a section at the bottom of each article with links to articles that have links to it. This allows for easier navigation between related topics.

# 2023-07-05

## Added Timeline Component

I've replaced the timeline page I've been working on with a timeline component that can go in any article.

```infobox-timeline
title: Example Timeline
events:
- title: So beas an exemplar event
  description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  image: "[[epic hata logo.png]]"
  colour: "#900"
  date:
    start: 2023-01-15
    end: 2023-06-01
- title: So zel beas an exemplar event
  date:
    start: 2023-06-02
    end: 2023-08-12
- title: So event beas in an else lane
  lane: 20
  date:
    start: 2023-02-10
    end: 2023-07-01
- title: Shu vyu
  lane: 30
  image: "[[remy struck by missile while jasper aims his bow, wearing toby's drip.png]]"
  color: "#900"
  date:
    start: 2023-01-10
    end: 2023-02-02
```

# 2023-07-04

## Improved Nation Infoboxes

Nation infoboxes are no longer tied to articles. I've managed to write some code to allow myself to use them anywhere in the articles. I can even use them here!

```infobox-nation
name: "Hatapedia"
banner: "[[epic hata logo.png]]"
facts:
  example fact: Example Fact
  author: Billzo
```

## Character Infoboxes

Infoboxes for humans and [[The Voices|voices]] alike:

```infobox-character
name: Doctor Zomboss
image: "[[Zomboss Eliminated.png]]"
facts:
  status: Dead
```

# 2023-06-30

## Added callouts

> [!cite] Look
> it's a callout and i can easily add it to any article now

# 2023-06-03

## Added weather page

You can now see live weather updates from HATA at `/weather`! (Currently only displays Forgsville, Remy Republic).
- Supports switching between viewing temperatures as Celsius & Kelvin
- Allows user to click the download button & export the weather card as an image

# 2023-05-29

## Added button to toggle table of contents on mobile

There is now a floating button in the bottom right that you can tap while browsing the site on a small-screened device, which allows you to access the table of contents (which was previously hidden on mobile).

# 2023-04-28

## Improved World Map Viewer

The map is no longer blurry up close! You can see each individual block as an individual pixel.

Spy on Tobytopia in high resolution!

> The Python script used for generating the map now puts the entire original map image (10001x10001) onto a larger image whose dimensions are multiples of 256 (10240x10240) before slicing the tiles, allowing for no loss of detail. This is better than the previous method, which involved downscaling to (8192x8192). It also allows for a 1:1 correspondence between Minecraft world coordinates and coordinates on the map.

## Image Grouping

Images can now be grouped together in articles and be displayed in horizontal rows instead of each image being massive and taking up the entire width of the reading area.

> This took forever to make work right 😩. I hate writing Remark plugins.