---
title: Example Client
evaluator: Lisa Liskovoi
commissioner: Example Client
targetLevel: AAA
targetWcagVersion: "2.2"
date: 2024-03-07T18:07:28.281Z
specialRequirements: Please also list accessibility problems that are not conformance failures.
scope:
  - All pages on example.com
out_of_scope:
  - The RSS feed (https://foo.com/rss)
  - Other page 2
  - Some other page
baseline:
  - Microsoft Edge (last 3 versions)
  - Mozilla Firefox (last 3 versions)
  - Google Chrome (last 3 versions)
  - Apple Safari (last 3 versions)
  - Apple Safari on iOS
  - JAWS
  - VoiceOver
technologies:
  - HTML
  - CSS
  - JavaScript
  - WAI-ARIA
  - SVG
samples:
  - title: Homepage
    id: homepage
    url: https://example.com
    description: The homepage of Example Company.
  - title: Blog post
    id: blog-post
    url: https://example.com/blog/example-post
    description: An example of a blog post
issues: https://github.com/inclusive-design/idrc-wcag-reporter/
---
This website is partly accessible. Some severe issues were found and described in this report.
