import csv
import sys
import operator
import time
import numpy
sys.setrecursionlimit(5000000)

def BubbleSort(arr, n): 
 
    # Traverse through all array elements 
    for i in range(n-1): 
    # range(n) also work but outer loop will repeat one time more than needed. 
  
        # Last i elements are already in place 
        for j in range(0, n-i-1): 
  
            # traverse the array from 0 to n-i-1 
            # Swap if the element found is greater 
            # than the next element 
            if arr[j] > arr[j+1] : 
                arr[j], arr[j+1] = arr[j+1], arr[j] 
            return arr



 #Driver code to test above
start_time = time.time()
path = 'C://Users//Bailey Watkins//source//repos//CS4230-Team-Backrowbois//BubbleSort//DateSet - Copy.csv'
file_CSV = open(path,'r')   
data_CSV = csv.reader(file_CSV)
arr= list(data_CSV)
arr2= list(data_CSV)
n = len(arr)
sorted = BubbleSort(arr, n)
print("Time equals: ")
print( time.time() - start_time )
print()
print(sorted)

