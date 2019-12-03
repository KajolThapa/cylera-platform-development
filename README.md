# Pre- Requirements

1. Install Python 2.7 
2. Install Pip
3. Install Flask:           pip install -U Flask
4. Install Flask-RESTful:   pip install flask-restful

# Setup
    - Open a shell and navigate to root of project
    - Run `npm install`

# To start the python server
    - npm run start-backend

# To start react app with python server
 - Run `npm start`
 - Test with the endpoint 
    - http://localhost:3000/bandwidths/{device_uuid}/?{end_time}&{window_time}&{num_windows}
    - e.g. http://localhost:3000/bandwidths/cf4844bc-a107-4e0a-84e1-fa04d76d388c?end_time=1524835753&window_time=10&num_windows=20

*Parameters:*

    device_uuid (required)
    end_time (epoch timestamp of the last time we want to return, default now)
    window_time (window in seconds, default 60 seconds)
    num_windows (number of windows i.e., data points, to return, default 10)
    
    For example,
    device_uuid = "abc", end_time = 1546300800, window_time = 60, num_windows = 10
    would return 10 data points (timestamp, value) where each value would be the sum of bytes in that 60 second window, with the last window ending on 1546300800 (Jan 1st 2019 GMT).
