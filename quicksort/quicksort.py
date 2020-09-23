
# Python program for implementation of Quicksort Sort
 
# This function takes last element as pivot, places
# the pivot element at its correct position in sorted
# array, and places all smaller (smaller than pivot)
# to left of pivot and all greater elements to right
# of pivot
import csv
import sys
import operator
import time
sys.setrecursionlimit(5000000)
 
def partition(arr, low, high):
    i = (low-1)         # index of smaller element
    pivot = arr[high]     # pivot
 
    for j in range(low, high):
 
        # If current element is smaller than or
        # equal to pivot
        if arr[j] <= pivot:
 
            # increment index of smaller element
            i = i+1
            arr[i], arr[j] = arr[j], arr[i]
 
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return (i+1)
 
# The main function that implements QuickSort
# arr[] --> Array to be sorted,
# low  --> Starting index,
# high  --> Ending index
 
# Function to do Quick sort
 
 
def quickSort(arr, low, high):
    if len(arr) == 1:
        return arr
    if low < high:
 
        # pi is partitioning index, arr[p] is now
        # at right place
        pi = partition(arr, low, high)
 
        # Separately sort elements before
        # partition and after partition
        quickSort(arr, low, pi-1)
        quickSort(arr, pi+1, high)
 
 
# Driver code to test above
start_time = time.time()
path = 'C:/Users/razzb/Desktop/quicksort/Dateset.csv'
file_CSV = open(path,'r')   
data_CSV = csv.reader(file_CSV)
arr= list(data_CSV)
arr2= list(data_CSV)
n = len(arr)
quickSort(arr, 0, n-1)
print( time.time() - start_time )
 
# This code is contributed by Mohit Kumra
#This code in improved by https://github.com/anushkrishnav