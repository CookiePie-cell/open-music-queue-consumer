class Listener {
  constructor(playlistSongsService, mailSender) {
    this._playlistSongsService = playlistSongsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const playlist = await this._playlistSongsService.getSongsFromPlaylist(playlistId);
      const result = await this._mailSender.sendMail(targetEmail, JSON.stringify({ playlist }));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
