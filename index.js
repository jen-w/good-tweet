const PriorityQueue = require('priorityqueuejs');
const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const jsonString = data.replace(/window.YTD.tweet.part0 = /g, '');
const tweets = JSON.parse(jsonString);

const queue = new PriorityQueue((a, b) => {
    a = a.tweet;
    b = b.tweet;
    const aClout = Number(a.favorite_count) + Number(a.retweet_count);
    const bClout = Number(b.favorite_count) + Number(b.retweet_count);

    return aClout - bClout;
});

tweets.forEach(tw => queue.enq(tw));

let i = 0;
while (i < 50) {
    const winner = queue.deq();
    //console.log(tweet);
    console.log((i+1) + ". " + winner.tweet.full_text);

    i++;
}