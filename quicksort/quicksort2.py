import csv
import sys
import operator
import pandas as pd
import time
# Driver code to test above
starttime = time.time()
path = 'C:/Users/razzb/Desktop/quicksort/Dateset.csv'
file_CSV = open(path,'r')   
data = pd.read_csv(file_CSV)
test = data.sort_values("Age", ascending=True, inplace=False, kind='quicksort', na_position='last')
print(test)
print("elapsed time is:")
print(time.time()-starttime)