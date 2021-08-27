# Commenti

Embedded comments

Features:

- Reddit-style "infinitely nested" comment trees
- Optional Markdown support
- Internationalization support
- Free, open-source & self-hosted, which means it is fully customizable

![Screenshot](https://github.com/sprkweb/commenti/blob/master/screenshot.png?raw=true)

## Getting Started

First, it is important to clarify that this project is in development and is not ready for production usage.

1. Install [Commenti Server](https://github.com/sprkweb/commenti_server)
2. Download a corresponding release of the UI script from [here](https://github.com/sprkweb/commenti/releases)
3. Add the comments to your page (see [demo.html](https://github.com/sprkweb/commenti/blob/master/public/demo.html) for a full example):

    ```html
    <!-- Here we load default styles for comments -->
    <link rel='stylesheet' href='/commenti.css'>
    <!-- If you want to customize styles, you can overwrite some of them here -->
    <!-- or write completely new styles using default ones as a reference -->

    <script defer type="module">
        import Commenti from '/Commenti.js';

        new Commenti({
            // Choose an empty container for comments here
            target: document.getElementById('comments'),
            props: {
                // URI of your Commenti Server
                server_uri: 'http://mycommentiserver.com:8012/graphql',
                // Unique ID of the current page
                // It can be any string, e.g. canonical URL
                page_id: '123'
            }
        });
    </script>
    ```

4. Add the unique page ID at your Commenti Administration Page, for example, <http://mycommentiserver.com:8012/admin/comments/page/add/>
