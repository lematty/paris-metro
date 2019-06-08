
![Screenshot](src/assets/Screenshot.png?raw=true "Paris Metro")


# ParisTransport

This project is to have a collection of all transportation lines and stations in Paris.

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

You will need 2 API keys to run the application, Google maps and Mapbox. Place your API keys in the `environments/environments.ts` as shown below:

```
export const environment = {
  GOOGLE_MAPS_API_KEY: 'XXX',
  MAPBOX_API_KEY: 'XXX'
};
```

## Scripts

Run `npm run {network}:{type}` to build geojson.
ex. For metro lines run `npm run metro:lines`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Docker Postgres Database

To start the database container, just simply run the following commands:
```
cd csvdatabase/
docker-compose up
```

If you need to make changes to the CSVs that created this database, you can recreate the files:
```
cd csvdatabase/
./createdb.bash
docker-compose down -v
docker-compose up
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
