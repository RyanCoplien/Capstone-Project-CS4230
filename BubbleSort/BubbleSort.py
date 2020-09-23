import csv
import sys
import operator
import time
sys.setrecursionlimit(5000000)

def BubbleSort(arr): 
    n = len(arr) 
  
    for i in range(n-1): 

        for j in range(0, n-i-1): 
          
            # Swap if the element found is greater 
            # than the next element 
            if arr[j] > arr[j+1] : 
                arr[j], arr[j+1] = arr[j+1], arr[j] 
            n = time.time() - start_time
            print( n )


 #Driver code to test above
start_time = time.time()
path = 'C:/Dataset.csv'
file_CSV = open(path,'r')   
data_CSV = csv.reader(file_CSV)
arr= list(data_CSV)
arr2= list(data_CSV)
n = len(arr)
BubbleSort(arr)
print( time.time() - start_time )
