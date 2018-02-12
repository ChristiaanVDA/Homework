

```python
import pandas as pd
```


```python
# Define paths for csvs
csv_path_1 = "hawaii_measurements.csv"
csv_path_2 = "hawaii_stations.csv"
```


```python
# Read csvs
measurements_df = pd.read_csv(csv_path_1)
stations_df = pd.read_csv(csv_path_2)
```


```python
# Preview 1st dataframe
measurements_df.head(3)
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
      <th>station</th>
      <th>date</th>
      <th>prcp</th>
      <th>tobs</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>USC00519397</td>
      <td>2010-01-01</td>
      <td>0.08</td>
      <td>65</td>
    </tr>
    <tr>
      <th>1</th>
      <td>USC00519397</td>
      <td>2010-01-02</td>
      <td>0.00</td>
      <td>63</td>
    </tr>
    <tr>
      <th>2</th>
      <td>USC00519397</td>
      <td>2010-01-03</td>
      <td>0.00</td>
      <td>74</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Preview 2nd dataframe
stations_df.head(3)
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
      <th>station</th>
      <th>name</th>
      <th>latitude</th>
      <th>longitude</th>
      <th>elevation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>USC00519397</td>
      <td>WAIKIKI 717.2, HI US</td>
      <td>21.2716</td>
      <td>-157.8168</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>USC00513117</td>
      <td>KANEOHE 838.1, HI US</td>
      <td>21.4234</td>
      <td>-157.8015</td>
      <td>14.6</td>
    </tr>
    <tr>
      <th>2</th>
      <td>USC00514830</td>
      <td>KUALOA RANCH HEADQUARTERS 886.9, HI US</td>
      <td>21.5213</td>
      <td>-157.8374</td>
      <td>7.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Look for missing values in 1st
measurements_df.count()
```




    station    19550
    date       19550
    prcp       18103
    tobs       19550
    dtype: int64




```python
# Look for missing values in 2nd
stations_df.count()
```




    station      9
    name         9
    latitude     9
    longitude    9
    elevation    9
    dtype: int64




```python
# Replace n/a values in 1st dataframe with zero
clean_measures_df = measurements_df.fillna(0)
# clean_measures_df = measurements_df

# Combine the station and date columns to create a unqique id
clean_measures_df["record_id"] = clean_measures_df["station"] + clean_measures_df["date"].map(str)

# Rename any unclear column names
clean_measurements_df = clean_measures_df.rename(columns={"prcp":"precip"})

clean_measurements_df.count()
```




    station      19550
    date         19550
    precip       19550
    tobs         19550
    record_id    19550
    dtype: int64




```python
# Preview 1st dataframe after change
clean_measurements_df.head(3)
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
      <th>station</th>
      <th>date</th>
      <th>precip</th>
      <th>tobs</th>
      <th>record_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>USC00519397</td>
      <td>2010-01-01</td>
      <td>0.08</td>
      <td>65</td>
      <td>USC005193972010-01-01</td>
    </tr>
    <tr>
      <th>1</th>
      <td>USC00519397</td>
      <td>2010-01-02</td>
      <td>0.00</td>
      <td>63</td>
      <td>USC005193972010-01-02</td>
    </tr>
    <tr>
      <th>2</th>
      <td>USC00519397</td>
      <td>2010-01-03</td>
      <td>0.00</td>
      <td>74</td>
      <td>USC005193972010-01-03</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Rename station_df to reflect it was cleaned even though no changes were made
clean_stations_df = stations_df
```


```python
# Export the newly cleaned csv files
clean_measurements_df.to_csv("clean_hawaii_measurements.csv",index=False, header=True)
clean_stations_df.to_csv("clean_hawaii_stations.csv",index=False, header=True)
```
