

```python
# Dependencies
import tweepy
import json
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sn

from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()
```


```python
# Twitter API Keys
consumer_key = "Hd80ubORTZWbHIQQswiiFNiV9"
consumer_secret = "uwlBxQd4FvghnFWF4XKJQX5uqhG7EH0wNFAnxT9Q2UoNcz9220"
access_token = "15795639-9HWzXNxS4M6vt2x6sIHvyoyRsKKwGnYH7p4Re2kna"
access_token_secret = "b1UKOCR9KmJz1no5WnoWkakoBwDK7xSbi9Ay4u0DgDkTy"
```


```python
# Setup Tweepy API Authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())
```


```python
# Target User
target_user = ["BBCWorld", "CBSNews", "CNN", "FoxNews", "NYTimes"]

# Create arrays to capture the elements of tweets
tweet_source = []
tweet_text = []
tweet_time = []
               
# Create arrays to hold the sentiment data
compound_list = []
positive_list = []
negative_list = []
neutral_list = []

# Loop through each of the target news sites               
for t in range(len(target_user)):
      
    # Loop through 5 pages of tweets (total 100 tweets)
    for x in range(0,5):

        # Get all tweets from home feed
        current_user = target_user[t]
        public_tweets = api.user_timeline(target_user[t], page=x)
        
        # Loop through all tweets
        for tweet in public_tweets:

            # Set tweet text as target for sentiment analysis
            target_string = tweet["text"]

            # Run sentiment analysis
            compound = analyzer.polarity_scores(target_string)["compound"]
            pos = analyzer.polarity_scores(target_string)["pos"]
            neg = analyzer.polarity_scores(target_string)["neg"]
            neu = analyzer.polarity_scores(target_string)["neu"]

            # Store Tweet in Array
            tweet_source.append(current_user)
            tweet_text.append(tweet["text"])
            tweet_time.append(tweet["created_at"])

            # Store sentiment analysis in array
            compound_list.append(compound)
            positive_list.append(pos)
            negative_list.append(neg)
            neutral_list.append(neu)

## Test appended lists       
#print(tweet_source)
#print(tweet_text)
#print(tweet_time)
#print(compound_list)
#print(positive_list)
#print(negative_list)
#print(neutral_list)

## Test tweets
print("Tweet Count: %s" % len(tweet_source))
#print(public_tweets)
```

    Tweet Count: 500
    


```python
# Create a DataFrame from the stored lists, and order the columns
news_tweet_df = pd.DataFrame({"Source": tweet_source,
              "Text": tweet_text,
              "Date": tweet_time,
              "Compound": compound_list,
              "Positive": positive_list,
              "Neutral": neutral_list,
              "Negative": negative_list})
news_mood_df = news_tweet_df[["Source", "Date", "Text", "Compound", "Positive", "Neutral", "Negative"]]
```


```python
news_mood_df.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Source</th>
      <th>Date</th>
      <th>Text</th>
      <th>Compound</th>
      <th>Positive</th>
      <th>Neutral</th>
      <th>Negative</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>BBCWorld</td>
      <td>Mon Jan 15 07:30:20 +0000 2018</td>
      <td>RT @BBCSport: 2017 runner-up Venus Williams is...</td>
      <td>0.0000</td>
      <td>0.000</td>
      <td>1.000</td>
      <td>0.000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>BBCWorld</td>
      <td>Mon Jan 15 06:24:58 +0000 2018</td>
      <td>RT @BBCBreaking: Internal ceiling collapses at...</td>
      <td>-0.2960</td>
      <td>0.000</td>
      <td>0.872</td>
      <td>0.128</td>
    </tr>
    <tr>
      <th>2</th>
      <td>BBCWorld</td>
      <td>Mon Jan 15 06:24:54 +0000 2018</td>
      <td>RT @BBCBreaking: Images from central Jakarta a...</td>
      <td>-0.4767</td>
      <td>0.057</td>
      <td>0.777</td>
      <td>0.166</td>
    </tr>
    <tr>
      <th>3</th>
      <td>BBCWorld</td>
      <td>Mon Jan 15 06:21:50 +0000 2018</td>
      <td>Baghdad suicide double suicide attack kills ma...</td>
      <td>-0.9485</td>
      <td>0.000</td>
      <td>0.204</td>
      <td>0.796</td>
    </tr>
    <tr>
      <th>4</th>
      <td>BBCWorld</td>
      <td>Mon Jan 15 06:18:49 +0000 2018</td>
      <td>Jakarta stock exchange ceiling collapses https...</td>
      <td>-0.2960</td>
      <td>0.000</td>
      <td>0.694</td>
      <td>0.306</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Export DataFrame to csv
news_mood_df.to_csv('NewsMood.csv')
```


```python

```
