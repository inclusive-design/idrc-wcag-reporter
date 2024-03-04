---
layout: report
tags: reports
title: The Example Company
evaluator: V. van Gogh
commissioner: The Example Company
targetLevel: AA
targetWcagVersion: "2.1"
date: 2024-03-04T19:50:32.352Z
specialRequirements: Please also list accessibility problems that are not conformance failures.
samples:
  - title: Homepage
    id: homepage
    url: https://example.com
    description: The homepage of Example Company.
  - title: Blog post
    id: blog-post
    url: https://example.com/blog/example-post
    description: An example of a blog post
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
scope:
  - All pages on example.com
issues: https://github.com/inclusive-design/idrc-wcag-reporter/

out_of_scope:
  - The RSS feed (https://foo.com/rss)
  - Other page 2
  - Some other page
---
This website is partly accessible. Some severe issues were found and described in this report.
