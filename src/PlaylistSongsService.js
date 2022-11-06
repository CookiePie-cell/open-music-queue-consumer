const { Pool } = require('pg');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsFromPlaylist(id) {
    const queryPlaylist = {
      text: `SELECT playlists.id, playlists.name
      FROM playlists WHERE playlists.id = $1`,
      values: [id],
    };

    const querySongs = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
      INNER JOIN playlist_songs ON playlist_songs.song_id = songs.id
      WHERE playlist_songs.playlist_id = $1`,
      values: [id],
    };

    const playlistResult = await this._pool.query(queryPlaylist);
    const songsResult = await this._pool.query(querySongs);

    return {
      ...playlistResult.rows[0],
      songs: songsResult.rows,
    };
  }
}

module.exports = PlaylistSongsService;
