require('dotenv').config();
const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000


app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))


const supabaseURL = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey)


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});



app.get('/spotifylyrics', async (req, res) => {
    console.log('Attempting to GET all data')


    const {data, error } = await supabase
        .from('SpotifyLyrics')
        .select()


    if(error) {
        console.log('Error');
        res.send(error);
    } else {
        res.send(data);
        console.log(data.slice(-2));

    }
}
)

app.post('/spotifylyrics', async (req, res) => {
    console.log('Attempting to POST data')
    var ArtistName = req.body.ArtistName;
    var SongTitle = req.body.SongTitle;

    const {data, error } = await supabase
    .from('SpotifyLyrics')
    .insert({'ArtistName': ArtistName, 'SongTitle': SongTitle })
    .select()
    if(error) {
        console.log('Error');
        res.send(error);
    } else {
        res.send(data);
        console.log(data);
    }
})



app.listen(port, () => {
    console.log('APP IS ALIVE')
})