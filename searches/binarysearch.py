import csv
import time
# Python program for recursive binary search.  
# Returns index position of n in list1 if present, otherwise -1  
def binsearch(orderedlist,target):
  candidate = 0
  for i in range(len(orderedlist)):
    if orderedlist[i] < target:
      candidate = candidate
    else:
      if i+1 < len(orderedlist):
        if orderedlist[i] < orderedlist[i+1]:
          #it is an ordered list so if i+1 is not bigger than i, it must be equal
          candidate = candidate
        else:
          candidate = i
          break # can you use break?
  if orderedlist[candidate] == target:
    return candidate
  else:
    return None


start_time = time.time()
path = 'C:/Users/razzb/Desktop/quicksort/output.csv'
import pandas as pd
df = pd.read_csv(path)
saved_column = df.Age #you can also use df['column_name']
arr = list(saved_column)
file_CSV = open(path,'r')   
data_CSV = csv.reader(file_CSV)
arr2= list(data_CSV)

n = '21-30'
result = binsearch(arr, n)  
      
if result != -1:  
    print("Element is present at index", str(result))  
    print(arr2[result + 1])
    elapsed_time = time.time() - start_time
    print("Elapsed time is: ")
    print(elapsed_time)
else:  
    print("Element is not present in list1")  
