# Portfolio Data Schema

The data core is configured as a flat set of primitive JavaScript arrays inside `script.js`.

## Standard Schema Properties
- `id` (String): Unique element identifier slug.
- `title` (String): Resource descriptive name.
- `category` (String): Options include `"project"`, `"achievement"`, or `"assessment"`.
- `year` (Integer): Target values `1`, `2`, `3`, or `4`.
- `term` (Integer): Target values `1`, `2`, or `3`.
- `link` (String | null): URL path reference to repository or site (or `null`).
- `image` (String | null): System assets path link to image directory (or `null`).
- `description` (String): Informational summary or reflection log.
- `featured` (Boolean): Visually registers item on the homepage featured lists if set to `true`.
- `tags` (Array): Text arrays storing key development parameters for filter parsing.