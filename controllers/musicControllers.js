const {
  playlist,
  search,
  lookup
} = require("../helpers/itunes");

module.exports = {
  playlistMusic: (req, res) => {
    let query = req.params.term;

    playlist(query)
      .then((result) => {
        let data = result.data.results.filter(i => i.kind == "song");
        res.status(200).json({
          message: "Playlist Music Successfull",
          data: data,
          resultCount: data.length
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "Failed To Playlist Music",
          error: err,
        });
      });
  },
  searchMusic: (req, res) => {
    let query = req.params.term;

    search(query)
      .then((result) => {
        let data = result.data.results.filter(i => i.kind == "song");
        res.status(200).json({
          message: "Search Music Successfull",
          data: data,
          resultCount: data.length
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "Failed To Search Music",
          error: err,
        });
      });
  },
  lookupMusic: (req, res) => {
    lookup(req.params.id)
      .then(result => {
        res.send(result.data);
        let data = result.data;
        res.status(200).json({
          message: "Lookup Music Successfull",
          data: data
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "Failed To Lookup Music",
          error: err,
        });
      });
  }
};
