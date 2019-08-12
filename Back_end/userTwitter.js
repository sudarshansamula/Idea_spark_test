var Twitter = require('twitter');
require('dotenv').config();
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@cluster0-bpg14.mongodb.net/test?retryWrites=true&w=majority`;
/*client.get('search/tweets', {q: 'Sudarshan'}, function(error, tweets, response) {
  console.log("error**",error)
  console.log("response**",response.body)
   /*tweets.statuses.forEach(function(tweet) {
   	console.log("tweet: " + tweet.text)
   });*/
//});*/
const getTweetsByHashtag = async (req,res,next) => {
  let  hash_tags=req.body.hash_tags ;
  if(req.body.hash_tags === undefined || req.body.hash_tags === ''){
    hash_tags='#ios #android';
  }
  let hashed_tweets=[]
  client.get('search/tweets',{q:hash_tags}, function(error, tweets, response) {
    if(error){
      res.json(error)
    }else{

      tweets.statuses.forEach(function(tweet) {
        hashed_tweets.push(tweet.text);
        console.log("tweet: " + tweet.text)
      });
      res.json(hashed_tweets)
    }
  });
};

const loginTwitter =  async (req,res,next) => {
  const user_name =req.body.user_name //
  const validurl=`https://api.twitter.com/1.1/users/lookup.json?screen_name=${user_name}`;
  client.get(validurl, function(error, data, response) {
    if(error){
      res.json(error)
    }else{
      getTweets(user_name,req,res)
    }
  });
};
async function insertIntoDatabase(dataObj,req,res){
  MongoClient.connect(uri,{ useNewUrlParser: true },function(err, client_mongo) {
    var db = client_mongo.db(process.env.DB_NAME);
    var collection=db.collection(process.env.COLLECTION_NAME);
    collection.insertOne(dataObj,function(err,result){
      client_mongo.close();
    });
  });
};

async function getTweets(user_name,req,res){
  const reqDate=new Date().toISOString().split('T')[0];
  const reqUrl=`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${user_name}&until=${reqDate}`
  client.get(reqUrl, async  function(error, data, response) {
    let dataObj={
      user_data:[]
    };
    data.forEach(function(tweet) {
      let temObj={}
      if(tweet.entities.urls.length > 0){
        tweet.entities.urls.forEach(function(urls){
          temObj["URL"]=urls.url
         // dataObj.url.push(urls.url)
        });
      }else{
        temObj["URL"] = "No url found"
      }
      temObj["TEXT"]=tweet.text
      //dataObj.text.push(tweet.text);
      dataObj.user_data.push(temObj)
    });
    if(dataObj.user_data.length === 0){
      return res.json({ success: false, data: "No user matches for specified terms."});
    }
    await insertIntoDatabase(dataObj,req,res)
    res.json({ success: true, data: dataObj});
  });
};
module.exports= {
  loginTwitter,
  getTweetsByHashtag
}
//twitter_collection
//idea_spark


//const client_mongo = new MongoClient(uri, { useNewUrlParser: true });

