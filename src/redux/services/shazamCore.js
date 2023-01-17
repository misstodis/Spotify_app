import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ======================USING API==================================

export const shazamCoreApi = createApi({
  // name reducer path as shazamCoreAPI
  reducetPath: 'shazamCoreAPI',
  // fetch information about trending world music from API
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '3b4be32c57msh00ee1159a1db663p1199bbjsnda7ab8fd36fd');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopChart: builder.query({ query: () => 'v1/charts/world' }),
    getSongByGenre: builder.query({ query: (genre) => `v1/charts/genre-world?genre_code=${genre}` }),
    getSongDetails: builder.query({ query: (songid) => `v1/tracks/details?track_id=${songid}` }),
    getSongRelated: builder.query({ query: (songid) => `v1/tracks/related?track_id=${songid}` }),
    getArtistDetails: builder.query({ query: (artistid) => `v2/artists/details?artist_id=${artistid}` }),
    getSongByCountry: builder.query({ query: (country) => `v1/charts/country?country_code=${country}` }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
  }),
});

// =================================================FAKE API=======================================
// export const shazamCoreApi = createApi({
//   // name reducer path as shazamCoreAPI
//   reducetPath: 'shazamCoreAPI',
//   // fetch information about trending world music from API
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:3333',
//   }),
//   endpoints: (builder) => ({
//     getTopChart: builder.query({ query: () => '/charts_world' }),
//     getSongByGenre: builder.query({ query: (genre) => `/charts_world` }),
//     getSongDetails: builder.query({ query: (songid) => `v1/tracks/details?track_id=${songid}` }),
//     getSongRelated: builder.query({ query: (songid) => `v1/tracks/related?track_id=${songid}` }),
//     getArtistDetails: builder.query({ query: (artistid) => `v2/artists/details?artist_id=${artistid}` }),
//     getSongByCountry: builder.query({ query: (country) => `/charts_country` }),
//     getSongsBySearch: builder.query({
//       query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
//     }),
//   }),
// });

// after u create the endpoints up there , the funtion of redux will auto create a function to get the fetch from API
// this will be use +  endpoints names + Query
//console.log(shazamCoreApi)
export const {
  useGetTopChartQuery,
  useGetSongByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
