import csv
import time
# Python program for recursive binary search.  
# Returns index position of n in list1 if present, otherwise -1  
def Sequential_Search(dlist, item):

    pos = 0
    found = False
    
    while pos < len(dlist) and not found:
        if dlist[pos] == item:
            found = True
        else:
            pos = pos + 1
    
    return pos



start_time = time.time()
path = 'C:/Users/razzb/Desktop/quicksort/output1.csv'
import pandas as pd
df = pd.read_csv(path)
saved_column = df.Age #you can also use df['column_name']
arr = list(saved_column)
file_CSV = open(path,'r')   
data_CSV = csv.reader(file_CSV)
arr2= list(data_CSV)

n = '21-30'
result = Sequential_Search(arr, n)  
      
if result != -1:  
    print("Element is present at index", str(result))  
    print(arr2[result + 1])
    elapsed_time = time.time() - start_time
    print("Elapsed time is: ")
    print(elapsed_time)
else:  
    print("Element is not present in list1")  
