

```python
# import modules
import pandas as pd
import json
```


```python
# set paths for files
json_path1 = "purchase_data.json"
json_path2 = "purchase_data2.json"
```


```python
# Read the first dataframe
pymoli_1 = pd.read_json(json_path1)
```


```python
# Read the second dataframe
pymoli_2 = pd.read_json(json_path2)
```


```python
# Concatenate the two tables and re-index them
pymoli_full = pd.concat([pymoli_1,pymoli_2],ignore_index = True)
```


```python
# Rename the "SN" column to that of "Player"
pymoli = pymoli_full.rename(columns={'SN':'Player'})
```


```python
# Look for any incomplete rows (none found)
pymoli.count()
```




    Age          858
    Gender       858
    Item ID      858
    Item Name    858
    Price        858
    Player       858
    dtype: int64




```python
pymoli.head()
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
      <th>Age</th>
      <th>Gender</th>
      <th>Item ID</th>
      <th>Item Name</th>
      <th>Price</th>
      <th>Player</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>38</td>
      <td>Male</td>
      <td>165</td>
      <td>Bone Crushing Silver Skewer</td>
      <td>3.37</td>
      <td>Aelalis34</td>
    </tr>
    <tr>
      <th>1</th>
      <td>21</td>
      <td>Male</td>
      <td>119</td>
      <td>Stormbringer, Dark Blade of Ending Misery</td>
      <td>2.32</td>
      <td>Eolo46</td>
    </tr>
    <tr>
      <th>2</th>
      <td>34</td>
      <td>Male</td>
      <td>174</td>
      <td>Primitive Blade</td>
      <td>2.46</td>
      <td>Assastnya25</td>
    </tr>
    <tr>
      <th>3</th>
      <td>21</td>
      <td>Male</td>
      <td>92</td>
      <td>Final Critic</td>
      <td>1.36</td>
      <td>Pheusrical25</td>
    </tr>
    <tr>
      <th>4</th>
      <td>23</td>
      <td>Male</td>
      <td>63</td>
      <td>Stormfury Mace</td>
      <td>1.27</td>
      <td>Aela59</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Get the player count
total_players = pymoli["Player"].nunique()
total_players_table = pd.DataFrame({"Total Number of Players":[total_players]})
total_players_table
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
      <th>Total Number of Players</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>612</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Purchasing Analysis: Get the data
total_items = pymoli["Item Name"].nunique()
average_price = pymoli["Price"].mean()
total_purchases = len(pymoli)
total_revenue = pymoli["Price"].sum()
```


```python
# Purchasing Analysis: Create a summary dataframe
summary_table = pd.DataFrame({"Number of Unique Items":[total_items],
                             "Average Purchase Price":[average_price],
                             "Total Number of Purchases":[total_purchases],
                             "Total Revenue":[total_revenue]})
```


```python
# Purchasing Analysis: Format the dataframe by formatting numbers and rearranging columns
summary_table["Average Purchase Price"] = summary_table["Average Purchase Price"].map("${:.2f}".format)
summary_table["Total Revenue"] = summary_table["Total Revenue"].map("${:.2f}".format)
summary_tablef = summary_table[["Number of Unique Items","Average Purchase Price","Total Number of Purchases", "Total Revenue"]]
summary_tablef.head()
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
      <th>Number of Unique Items</th>
      <th>Average Purchase Price</th>
      <th>Total Number of Purchases</th>
      <th>Total Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>180</td>
      <td>$2.93</td>
      <td>858</td>
      <td>$2514.43</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Gender Demographics: Create a new dataframe only including Player and Gender, remove duplicate player rows, then drop players
gender_table = pymoli[["Player","Gender"]]
gender_table.duplicated()
gender_unique = gender_table.drop_duplicates("Player")
gender_unique = gender_unique.drop(["Player"],axis=1)
```


```python
# Gender Demographics: Get the gender counts of the unique players and the percentage of each compared to total unique  players
gender_counts = gender_unique["Gender"].value_counts()
gender_counts_df = pd.DataFrame(gender_counts)
gender_counts_df = gender_counts_df.rename(columns={"Gender":"Total Count"})
gender_counts_df.index.names = ['Gender']
gender_counts_df['Percentage of Players'] = gender_counts_df['Total Count']/total_players
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
      <th>Total Count</th>
      <th>Percentage of Players</th>
    </tr>
    <tr>
      <th>Gender</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>495</td>
      <td>0.808824</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>108</td>
      <td>0.176471</td>
    </tr>
    <tr>
      <th>Other / Non-Disclosed</th>
      <td>9</td>
      <td>0.014706</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Gender Demographics: Rearrange the columns and format the percentage column as a percentage
gender_counts_df['Percentage of Players'] = gender_counts_df['Percentage of Players'].map("{:.2%}".format)
gender_counts_format = gender_counts_df[['Percentage of Players','Total Count']]
gender_counts_format
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
      <th>Percentage of Players</th>
      <th>Total Count</th>
    </tr>
    <tr>
      <th>Gender</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>80.88%</td>
      <td>495</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>17.65%</td>
      <td>108</td>
    </tr>
    <tr>
      <th>Other / Non-Disclosed</th>
      <td>1.47%</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Purchasing Analysis (gender)

```


```python

```


```python
# Age Demographics

```
