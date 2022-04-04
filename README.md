# 2015 Street Tree Census - Tree Data Visualizer
React Native Expo app that uses NY Open data for visualization

## Description
- Pie Chart graph showing percentage of tree types in NY
- Pie Chart graph showing tree health status in NY
- Searchable list of trees

## How to run locally
1. Set up the machine for react native development [RN Docs](https://reactnative.dev/docs/environment-setup)
2. Clone this repository
3. In the root of this repo, execute `yarn install`
4. Create NY Open data API Key [NY Open Data settings](https://data.cityofnewyork.us/profile/edit/developer_settings)
5. In `.env` configuration file set `API_KEY` with NY Open data API Key
6. Run `yarn ios` or `yarn android`

## TODO
- Fix Typescript errors and warnings
- Add unit tests and snapshot tests
- Extract components from screens into separate files
- Add more filters and sorting to the tree list
- Add linting
- Add more visualizations