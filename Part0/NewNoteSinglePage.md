:::mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The event handler prevents the default form submit (no reload).<br/>The JS code adds the new note to the local list and rerenders it.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP status code 201 Created
    deactivate server

    Note left of browser: The browser stays on the same page and no further HTTP requests are needed.
  :::  