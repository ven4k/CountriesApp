export type strObj = { [key: string]: string }
export interface ApiData {
  name: {
    common: string,
    official: string,
  },
  cca2: string,
  cca3?: string,
  region?: string,
  languages: strObj,
  population?: number,
  timezones?: string[],
  continents?: string,
  flags: {
    png: string,
    svg: string
  },
  translations: {
    rus: {
      common: string
    }
  }
}

export type initStateType = {
  countries: ApiData[],
  favorites: ApiData[],
  currentCountry: ApiData,
  loading: boolean,
  error: string | undefined | null
}