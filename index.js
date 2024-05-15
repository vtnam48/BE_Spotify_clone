const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const HttpException = require("./utils/HttpException");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoutes = require("./routes/user");
const genreRoutes = require("./routes/genre");
const songRoutes = require("./routes/song");
const albumRoutes = require("./routes/album");
const playlistRoutes = require("./routes/playlist");
const playlistSongRoutes = require("./routes/playlistSong");
const artistSongRoutes = require("./routes/artistSong");
const songGenreRoutes = require("./routes/songGenre");
const artistRoutes = require("./routes/artist");
const historyRoutes = require("./routes/history");
const favoriteRoutes = require("./routes/favorite");
const searchRoutes = require("./routes/search");
const adminRoutes = require("./routes/admin");
//const searchHistoryRoutes = require("./routes/searchHistory");

const setup = require("./setup/index");

dotenv.config();
const app = express();
const server = http.createServer(app);

//setup.run().then(() => {
app.use(cors());
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use('/api/v1/assets', express.static('assets'));


app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", songRoutes);
app.use("/api/v1", albumRoutes);
app.use("/api/v1", playlistRoutes);
app.use("/api/v1", artistRoutes);
app.use("/api/v1", playlistSongRoutes);
app.use("/api/v1", songGenreRoutes);
app.use("/api/v1", artistSongRoutes);
app.use("/api/v1", historyRoutes);
app.use("/api/v1", favoriteRoutes);
app.use("/api/v1", searchRoutes);
app.use("/api/v1", genreRoutes);

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.all("*", (req, res, next) => {
    next(new HttpException(404, "Page not found :("));
});


// app.use((err, req, res, next) => {
//     const {status = 500, message = "Loi rui"} = err;
//     res.status(status).end(message);
// });

/// setup proxy
// app.set('trust proxy', true);
// const proxy = require("node-global-proxy").default;
// proxy.setConfig({
//         http: "http://back-end",
//         https: "http://back-end",
//     }
// )
// proxy.start();

let port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is running in ${port}`);
});

server.on("error", (err) => {
    console.log(err);
});
