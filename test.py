def some_func(x, y):
    return x + y


try:
    some_func(12)
except TypeError as e:
    print(e)