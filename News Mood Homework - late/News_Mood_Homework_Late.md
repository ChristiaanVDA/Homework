

```python
# Dependencies
import tweepy
import json
import numpy as np
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
tweet_tweets_ago = []
               
# Create arrays to hold the sentiment data
compound_list = []
positive_list = []
negative_list = []
neutral_list = []

# Loop through each of the target news sites               
for t in range(len(target_user)):
    tweet_count = 0
      
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
            
            # Track "tweets ago" by numbering the most recent tweet as 1, and increasing by one for each subsequent
            #    older tweet per source, then append it to the list
            tweet_count = tweet_count + 1
            tweet_tweets_ago.append(tweet_count)
            
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
              "Tweets Ago": tweet_tweets_ago,               
              "Compound": compound_list,
              "Positive": positive_list,
              "Neutral": neutral_list,
              "Negative": negative_list})
news_mood_df = news_tweet_df[["Source", "Date", "Tweets Ago", "Text", "Compound", "Positive", "Neutral", "Negative"]]
```


```python
news_mood_df.head(5)
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
      <th>Tweets Ago</th>
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
      <td>Mon Jan 15 10:55:50 +0000 2018</td>
      <td>1</td>
      <td>Australian Open 2018: Rafael Nadal beats Victo...</td>
      <td>0.0000</td>
      <td>0.000</td>
      <td>1.000</td>
      <td>0.000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>BBCWorld</td>
      <td>Mon Jan 15 10:52:35 +0000 2018</td>
      <td>2</td>
      <td>Singapore recruits swanbots to test water qual...</td>
      <td>0.0000</td>
      <td>0.000</td>
      <td>1.000</td>
      <td>0.000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>BBCWorld</td>
      <td>Mon Jan 15 10:36:42 +0000 2018</td>
      <td>3</td>
      <td>Car hurls into upper floor of California build...</td>
      <td>0.0000</td>
      <td>0.000</td>
      <td>1.000</td>
      <td>0.000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>BBCWorld</td>
      <td>Mon Jan 15 10:20:32 +0000 2018</td>
      <td>4</td>
      <td>Netanyahu and Modi praise 'new era' in India -...</td>
      <td>0.5574</td>
      <td>0.265</td>
      <td>0.735</td>
      <td>0.000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>BBCWorld</td>
      <td>Mon Jan 15 10:03:49 +0000 2018</td>
      <td>5</td>
      <td>Twelve hurt in Russia knife fight at Perm scho...</td>
      <td>-0.7184</td>
      <td>0.000</td>
      <td>0.571</td>
      <td>0.429</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Export DataFrame to csv
news_mood_df.to_csv('NewsMood.csv')
```


```python
# Gather data for BBC plots
bbc_only = news_mood_df.loc[news_mood_df["Source"] == "BBCWorld",:]
bbc_x = bbc_only["Tweets Ago"]
bbc_y = bbc_only["Compound"]

# Plot the BBC data
bbc_plot = plt.scatter (bbc_x, bbc_y, marker = "o", s = 64, c="lightskyblue", alpha = 0.7, edgecolors = "black",\
                        label = "BBC World")
```


```python
# Gather data for CBS plots
cbs_only = news_mood_df.loc[news_mood_df["Source"] == "CBSNews",:]
cbs_x = cbs_only["Tweets Ago"]
cbs_y = cbs_only["Compound"]

# Plot the CBS data
cbs_plot = plt.scatter (cbs_x, cbs_y, marker = "o", s = 64, c="royalblue", alpha = 0.7, edgecolors = "black",\
                        label = "CBS News")
```


```python
# Gather data for CNN plots
cnn_only = news_mood_df.loc[news_mood_df["Source"] == "CNN",:]
cnn_x = cnn_only["Tweets Ago"]
cnn_y = cnn_only["Compound"]

# Plot the CNN data
cnn_plot = plt.scatter (cnn_x, cnn_y, marker = "o", s = 64, c="blueviolet", alpha = 0.7, edgecolors = "black",\
                        label = "CNN")
```


```python
# Gather data for FoxNews plots
fox_only = news_mood_df.loc[news_mood_df["Source"] == "FoxNews",:]
fox_x = fox_only["Tweets Ago"]
fox_y = fox_only["Compound"]

# Plot the FoxNews data
fox_plot = plt.scatter (fox_x, fox_y, marker = "o", s = 64, c="orangered", alpha = 0.7, edgecolors = "black",\
                        label = "FoxNews")
```


```python
# Gather data for New York Times plots
nytimes_only = news_mood_df.loc[news_mood_df["Source"] == "NYTimes",:]
nytimes_x = nytimes_only["Tweets Ago"]
nytimes_y = nytimes_only["Compound"]

# Plot the New York Times data
nytimes_plot = plt.scatter (nytimes_x, nytimes_y, marker = "o", s = 64, c="gold", alpha = 0.7, edgecolors = "black",\
                            label = "New York Times")
```


```python
# Reverse the x-axis, and add the labels, title, and legend
plt.xlim(100,0)
plt.xlabel("Tweets Ago")
plt.ylabel("Tweet Polarity")
plt.title("Sentiment Analysis of Media Tweets (01/15/2018)")
plt.legend(handles=[bbc_plot, cbs_plot, cnn_plot, fox_plot, nytimes_plot],loc="upper right", bbox_to_anchor=(1.25, 1),\
           title="Media Sources")
```




    <matplotlib.legend.Legend at 0x22c2d3398d0>




```python
plt.show()
```


![png](output_13_0.png)



```python
# Group the DataFrame data by media source
grouped_media_df = news_mood_df.groupby(['Source'])
compound_sentiment = grouped_media_df["Compound"].mean()
compound_sentiment.head()
```




    Source
    BBCWorld   -0.174206
    CBSNews    -0.150930
    CNN         0.055431
    FoxNews    -0.038221
    NYTimes    -0.024495
    Name: Compound, dtype: float64




```python
compound_sentiment_df = pd.DataFrame(compound_sentiment)
compound_sentiment_df = compound_sentiment_df.rename_axis("Source")
compound_sentiment_df.reset_index(inplace=True)
compound_sentiment_df.head()
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
      <th>Compound</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>BBCWorld</td>
      <td>-0.174206</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CBSNews</td>
      <td>-0.150930</td>
    </tr>
    <tr>
      <th>2</th>
      <td>CNN</td>
      <td>0.055431</td>
    </tr>
    <tr>
      <th>3</th>
      <td>FoxNews</td>
      <td>-0.038221</td>
    </tr>
    <tr>
      <th>4</th>
      <td>NYTimes</td>
      <td>-0.024495</td>
    </tr>
  </tbody>
</table>
</div>




```python
print(compound_sentiment_df["Source"])
```

    0    BBCWorld
    1     CBSNews
    2         CNN
    3     FoxNews
    4     NYTimes
    Name: Source, dtype: object
    


```python
#x_axis = compound_sentiment_df["Source"] #(len(target_user))
#y_axis = compound_sentiment_df["Compound"]
#plt.bar(x_axis, y_axis, color='r', alpha=0.7, align="edge")
```
