---
uuid: 565bbb81-a759-4645-ae02-712bebda559a
title: Example Client
evaluators:
  - Lisa Liskovoi
  - Ned Zimmerman
commissioner: Example Client
targetLevel: AA
targetWcagVersion: "2.2"
date: 2024-03-07T14:07
specialRequirements: Please also list accessibility problems that are not conformance failures.
scope:
  - title: Homepage
    url: https://example.com
    description: The homepage of Example Company.
  - title: Blog post
    url: https://example.com/blog/example-post
    description: An example of a blog post
outOfScope:
  - title: RSS Feed
    url: https://example.com/feed
about: TODO.
methodology: TODO.
interpretation: TODO.
tools:
  - name: Mozilla Firefox
    version: "123"
  - name: Google Chrome
    version: "122"
  - name: Apple Safari
    version: "17.4"
  - name: Apple Safari (iOS)
    version: "17.4"
  - name: JAWS
    version: ""
  - name: VoiceOver
    version: ""
technologies:
  - HTML
  - CSS
  - JavaScript
  - WAI-ARIA
  - SVG
partiallySupported:
  - 1.2.1
  - 1.2.3
notSupported:
  - 1.4.1
notApplicable:
  - 1.2.3
issuesUrl: https://github.com/inclusive-design/idrc-wcag-reporter
issues:
  - title: Main menu does not work with keyboard
    sc: 2.1.1
    severity: High
    sample: Blog post
    screenshots: null
    body: |-
      ##### Problem

      The main menu does not work with just a keyboard. The links are marked up like this:

      ```html
      <div class="link 202034rsfd oiarjgeoi" onclick="woo()">About us</div>
      ```

      ##### Solution

      Use `<a>` tags for the links, and use the `href` attribute for the location to link to, like this:

      ```html
      <a href="/about-us">About us</a>
      ```

      The `<a>`-tag works with keyboard out of the box, does not rely on JavaScript and makes it easier for search engines to understand what is going on.
  - title: Focus style missing
    sc: 2.4.7
    severity: High
    sample: all
    screenshots: null
    body: |-
      ##### Problem

      Focus styles have been removed through the website's stylesheets:

      ```css
      * {
        outline: none
      }
      ```

      This causes problems for people who use the website without a mouse, as they will not be able to see where they are.

      ##### Solution

      Remove the `outline: none` rule, and/or add a specific style that applies on `:focus`. Make sure that it has sufficient contrast, too.

      ##### Read more

      - [Indicating focus to improve accessibility](https://hiddedevries.nl/en/blog/2019-06-06-indicating-focus-to-improve-accessibility)
  - title: Focus style missing
    sc: 2.4.7
    severity: High
    sample: all
    screenshots: null
    body: |-
      ##### Problem

      Focus styles have been removed through the website's stylesheets:

      ```css
      * {
        outline: none
      }
      ```

      This causes problems for people who use the website without a mouse, as they will not be able to see where they are.

      ##### Solution

      Remove the `outline: none` rule, and/or add a specific style that applies on `:focus`. Make sure that it has sufficient contrast, too.

      ##### Read more

      - [Indicating focus to improve accessibility](https://hiddedevries.nl/en/blog/2019-06-06-indicating-focus-to-improve-accessibility)
supported:
  - 1.1.1
---
This website is partly accessible. Some severe issues were found and described in this report.
