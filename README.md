# Super Price Navi

## Folders

- `td`: Type Definitions.
- `util`: Utility methods.
- `constants`: Different constant values used by the app.

- `api`: Implementation of each CRUD part of an API.
- `pages/api`: Since the APIs follow the REST model, this is just the entry point, calling each request handler (from the `api` folder) depending on the http method.
- `model`: Performs data validation and abstracts the access to the database.
- `model/XXX/validation`: Actual validation methods related to the `XXX` model.

- `components`: Pure visual components.
- `pages`: Next pages putting together visual components and giving the dynamic behavior.
